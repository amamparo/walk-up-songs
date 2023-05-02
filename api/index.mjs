import foobar from "./src/app";

const handler = (event) => {
  return foobar();
};

export { handler };
