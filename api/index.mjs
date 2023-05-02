import foobar from "./lib/app";

const handler = (event) => {
  return foobar();
};

export { handler };
