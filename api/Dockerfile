FROM public.ecr.aws/lambda/nodejs:18

COPY . .
RUN npm i
RUN esbuild src/index.js --bundle --minify --platform=node --target=es2020 --outfile=${LAMBDA_TASK_ROOT}/index.mjs
RUN touch ${LAMBDA_TASK_ROOT}/package.json

CMD ["index.handler"]
