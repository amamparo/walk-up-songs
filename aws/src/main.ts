import {App, Environment, Stack} from 'aws-cdk-lib';
import Web from "./web";


class MyStack extends Stack {
    constructor(scope: App) {
        super(scope, process.env.STACK_NAME, {
            env: {
                region: process.env.CDK_DEFAULT_REGION,
                account: process.env.CDK_DEFAULT_ACCOUNT
            }
        });
        new Web(this)
    }
}

new MyStack(new App());
