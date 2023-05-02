FROM public.ecr.aws/lambda/nodejs:18

COPY . .
RUN npm i
RUN npm run build
RUN cp -rf dist ${LAMBDA_TASK_ROOT}

WORKDIR ${LAMBDA_TASK_ROOT}

CMD ["index.handler"]
