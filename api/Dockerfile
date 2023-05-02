FROM public.ecr.aws/lambda/nodejs:18

RUN npm i
RUN npm run build
COPY dist ${LAMBDA_TASK_ROOT}/dist

CMD ["index.handler"]
