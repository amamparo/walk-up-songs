FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /build
COPY . .
RUN npm i
RUN npx esbuild src/index.js --bundle --minify --platform=node --target=es2020 --outfile=${LAMBDA_TASK_ROOT}/index.js
RUN touch ${LAMBDA_TASK_ROOT}/package.json

CMD ["index.handler"]
