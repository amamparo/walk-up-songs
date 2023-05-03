import { App, Stack } from "aws-cdk-lib";
import Web from "./web";
import API from "./api";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import env from "./env";

class MyStack extends Stack {
  constructor(scope: App) {
    super(scope, env.stackName, {
      env: {
        region: env.region,
        account: env.account
      }
    });

    const hostedZone = HostedZone.fromLookup(this, "HostedZone", { domainName: env.domain });

    const certificate = new Certificate(this, "Certificate", {
      domainName: env.domain,
      validation: CertificateValidation.fromDns(hostedZone),
      subjectAlternativeNames: [`*.${env.domain}`]
    });

    new API(this, hostedZone, certificate);
    new Web(this, hostedZone, certificate);
  }
}

new MyStack(new App());
