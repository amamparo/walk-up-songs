import serverless from "serverless-http";
import app from "./app";

const handler = async (event, context) => serverless(app)(event, context);

export { handler };
