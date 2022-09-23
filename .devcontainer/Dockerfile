FROM ubuntu:22.04

RUN apt update
RUN apt install -y git curl
RUN apt install -y vim htop make jq

RUN curl -Ls https://deb.nodesource.com/setup_18.x | bash
RUN apt update && apt install -y nodejs
RUN npm i -g npm

RUN useradd -m user
USER user

ENV NPM_CONFIG_DIR="/home/user/.npm-global"
RUN mkdir -p "${NPM_CONFIG_DIR}"
RUN mkdir -p "${NPM_CONFIG_DIR}/bin"
RUN mkdir -p "${NPM_CONFIG_DIR}/lib"
ENV PATH="/home/user/.npm-global/bin:${PATH}"

EXPOSE 8080

CMD [ "sleep", "infinity" ]
