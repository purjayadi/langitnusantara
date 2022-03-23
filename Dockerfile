FROM node:lts-slim
WORKDIR /home/travel
COPY package.json .
RUN yarn install
RUN yarn add global sequelize-cli
CMD yarn dev