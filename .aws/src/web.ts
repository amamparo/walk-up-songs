import { CfnOutput, Resource, Stack } from 'aws-cdk-lib'
import { BlockPublicAccess, Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3'
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import env from './env'

export default class Web extends Resource {
	bucket: Bucket

	constructor(scope: Stack, hostedZone: IHostedZone, certificate: ICertificate) {
		super(scope, 'Web')

		const webDomain = `${env.webSubdomain}.${env.domain}`
		this.bucket = new Bucket(this, 'Bucket', {
			bucketName: webDomain,
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			cors: [
				{
					allowedHeaders: ['*'],
					allowedOrigins: [
						`https://${webDomain}`,
						'http://localhost:5173'
					],
					exposedHeaders: [],
					allowedMethods: [
						HttpMethods.PUT
					]
				}
			]
		})

		const originAccessIdentity = new OriginAccessIdentity(this, 'OAI')
		this.bucket.grantRead(originAccessIdentity)

		const distribution = new Distribution(this, 'Distribution', {
			defaultBehavior: {
				origin: new S3Origin(this.bucket, { originAccessIdentity }),
				compress: true,
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
			},
			defaultRootObject: 'index.html',
			domainNames: [webDomain],
			certificate
		})

		new ARecord(this, 'AliasRecord', {
			zone: hostedZone,
			recordName: webDomain,
			target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
		})

		new CfnOutput(this, 'DistributionId', {
			exportName: `${env.stackName}-distribution-id`,
			value: distribution.distributionId
		})
	}
}
