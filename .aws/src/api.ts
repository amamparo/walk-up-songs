import { Duration, Resource, Stack } from 'aws-cdk-lib'
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import * as path from 'path'
import { IDomainName, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ApiGatewayDomain } from 'aws-cdk-lib/aws-route53-targets'
import env from './env'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import { ManagedPolicy, PolicyDocument, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'

export default class API extends Resource {
	constructor(scope: Stack, hostedZone: IHostedZone, certificate: ICertificate, bucket: Bucket) {
		super(scope, 'API')
		const lambdaFunction = new DockerImageFunction(
			this, 'Function', {
				code: DockerImageCode.fromImageAsset(
					path.join(process.cwd(), '..', 'api'),
					{
						platform: Platform.LINUX_AMD64
					}
				),
				timeout: Duration.minutes(15),
				memorySize: 256,
				environment: {
					BUCKET: bucket.bucketName
				},
				role: new Role(this, 'Role', {
					assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
					managedPolicies: [
						ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
						ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
					],
					inlinePolicies: {
						's3': new PolicyDocument({
							statements: [
								new PolicyStatement({
									actions: [
										's3:*'
									],
									resources: [
										bucket.bucketArn,
										`${bucket.bucketArn}*`
									]
								})
							]
						})
					}
				})
			}
		)

		const apiDomain = `${env.apiSubdomain}.${env.domain}`

		const api = new LambdaRestApi(
			this, 'Api', {
				handler: lambdaFunction,
				defaultCorsPreflightOptions: {
					allowOrigins: [`https://${env.webSubdomain}.${env.domain}`]
				},
				domainName: {
					domainName: apiDomain,
					certificate
				}
			}
		)

		new ARecord(this, 'ARecord', {
			zone: hostedZone,
			recordName: apiDomain,
			target: RecordTarget.fromAlias(new ApiGatewayDomain(api.domainName as IDomainName)),
			ttl: Duration.seconds(30)
		})
	}
}
