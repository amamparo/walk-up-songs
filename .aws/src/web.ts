import { CfnOutput, Resource, Stack } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Certificate, CertificateValidation, ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import { ARecord, HostedZone, IHostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

const domainName = 'walkups.aaronmamparo.com';

export default class Web extends Resource {
  constructor(scope: Stack, hostedZone: IHostedZone, certificate: ICertificate) {
    super(scope, "Web");

    const bucket = new Bucket(this, "Bucket", {
      bucketName: domainName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const originAccessIdentity = new OriginAccessIdentity(this, "OAI");
    bucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
        compress: true,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: "index.html",
      domainNames: [domainName],
      certificate
    });

    new ARecord(this, "AliasRecord", {
      zone: hostedZone,
      recordName: domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
    });

    new CfnOutput(this, "DistributionId", {
      exportName: "DistributionId",
      value: distribution.distributionId
    });
  }
}
