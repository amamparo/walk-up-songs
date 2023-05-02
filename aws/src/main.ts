import {App, Environment, Stack} from 'aws-cdk-lib';
import WebStack from "./web";

const env: Environment = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT
}

class MyStack extends Stack {
    constructor(scope: App) {
        super(scope, process.env.STACK_NAME, {env});
        new WebStack(this, env)
    }
}

new MyStack(new App());
