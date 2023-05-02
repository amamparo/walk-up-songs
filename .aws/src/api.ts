import { CfnOutput, Duration, Resource, Stack } from "aws-cdk-lib";
import { DockerImageCode, DockerImageFunction } from "aws-cdk-lib/aws-lambda";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import * as path from "path";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export default class API extends Resource {
  constructor(scope: Stack) {
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

    const api = new LambdaRestApi(
      this, "WalkupsApi", {
        handler: lambdaFunction,
        defaultCorsPreflightOptions: {
          allowOrigins: ["*"]
        }
      }
    );

    new CfnOutput(this, "ApiUrl", {
      exportName: "ApiUrl",
      value: api.url
    });
  }
}
