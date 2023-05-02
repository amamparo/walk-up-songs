FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

COPY . ${LAMBDA_TASK_ROOT}
RUN npm i
RUN npm run build

WORKDIR ${LAMBDA_TASK_ROOT}/dist

CMD ["index.handler"]
