import {App, Stack} from 'aws-cdk-lib';
import WebStack from "./web";


class MyStack extends Stack {
    constructor(scope: App) {
        super(scope, process.env.STACK_NAME, {
            env: {
                region: process.env.CDK_DEFAULT_REGION,
                account: process.env.CDK_DEFAULT_ACCOUNT
            }
        });
        new WebStack(this)
    }
}

new MyStack(new App());
