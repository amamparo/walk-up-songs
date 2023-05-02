FROM public.ecr.aws/lambda/nodejs:18

WORKDIR ${LAMBDA_TASK_ROOT}

RUN npm i
RUN npm run build
COPY dist ${LAMBDA_TASK_ROOT}

CMD ["index.handler"]
