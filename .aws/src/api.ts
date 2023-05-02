import { Duration, Resource, Stack } from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as path from "path";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { ARecord, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGateway } from 'aws-cdk-lib/aws-route53-targets';

export default class API extends Resource {
  constructor(scope: Stack, hostedZone: IHostedZone, certificate: ICertificate) {
    super(scope, "API");

    const lambdaFunction = new DockerImageFunction(
      this, "Function", {
        code: DockerImageCode.fromImageAsset(
          path.join(process.cwd(), "..", "api"),
          {
            platform: Platform.LINUX_AMD64
          }
        ),
        timeout: Duration.minutes(15),
        memorySize: 1024
      }
    );

    const domainName = "walkups-api.aaronmamparo.com"

    const api = new LambdaRestApi(
      this, "WalkupsApi", {
        handler: lambdaFunction,
        defaultCorsPreflightOptions: {
          allowOrigins: ["*"]
        },
        domainName: {
          domainName,
          certificate
        }
      }
    );

    new ARecord(this, "AliasRecord", {
      zone: hostedZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new ApiGateway(api))
    });
  }
}
