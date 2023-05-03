import * as dotenv from "dotenv";

dotenv.config();

export default {
  region: process.env.CDK_DEFAULT_REGION as string,
  account: process.env.CDK_DEFAULT_ACCOUNT as string,
  stackName: process.env.STACK_NAME as string,
  domain: process.env.DOMAIN as string,
  apiSubdomain: process.env.API_SUBDOMAIN as string,
  webSubdomain: process.env.WEB_SUBDOMAIN as string,
}
