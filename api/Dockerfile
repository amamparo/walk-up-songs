FROM public.ecr.aws/lambda/nodejs:18

# install all the missing dependencies aws-lambda-ric needs
RUN yum -y update \
&& yum -y groupinstall "Development Tools" \
&& yum install -y tar gzip wget openssl-devel

# amzn2-core/2/x86_64 repo installs cmake version 2.8.12.2,  3.9 or higher is required
RUN wget https://github.com/Kitware/CMake/releases/download/v3.22.3/cmake-3.22.3.tar.gz
RUN tar -zxvf cmake-3.22.3.tar.gz
WORKDIR cmake-3.22.3
RUN ./bootstrap
RUN make
RUN make install

WORKDIR ${LAMBDA_TASK_ROOT}
COPY . ${LAMBDA_TASK_ROOT}
RUN npm ci

CMD ["index.handler"]
