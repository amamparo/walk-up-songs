import { App, Stack } from "aws-cdk-lib";
import Web from "./web";
import API from "./api";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

const hostedZoneName = process.env.HOSTED_ZONE as string;

class MyStack extends Stack {
  constructor(scope: App) {
    super(scope, process.env.STACK_NAME, {
      env: {
        region: process.env.CDK_DEFAULT_REGION,
        account: process.env.CDK_DEFAULT_ACCOUNT
      }
    });

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", { domainName: hostedZoneName });

    const certificate = new Certificate(this, "Certificate", {
      domainName: "aaronmamparo.com",
      validation: CertificateValidation.fromDns(hostedZone),
      subjectAlternativeNames: ["*.aaronmamparo.com"]
    });

    new API(this, certificate);
    new Web(this, hostedZone, certificate);
  }
}

new MyStack(new App());
