import foobar from "./src/app.mjs";

const handler = (event) => {
  return foobar();
};

export { handler };
