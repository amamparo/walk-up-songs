import { CfnOutput, Resource, Stack } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

const hostedZoneName = process.env.HOSTED_ZONE as string;
const subdomain = process.env.SUBDOMAIN as string;
const domainName = `${subdomain}.${hostedZoneName}`;

export default class Web extends Resource {
  constructor(scope: Stack) {
    super(scope, "Web");

    const bucket = new Bucket(this, "Bucket", {
      bucketName: domainName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL
    });

    const originAccessIdentity = new OriginAccessIdentity(this, "OAI");
    bucket.grantRead(originAccessIdentity);

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", { domainName: hostedZoneName });

    const certificate = new Certificate(this, "Certificate", {
      domainName,
      validation: CertificateValidation.fromDns(hostedZone),
      subjectAlternativeNames: [`*.${domainName}`]
    });

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
