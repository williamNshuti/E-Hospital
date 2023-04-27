FROM node:18

WORKDIR /usr/src/e-hospital-ui

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 1082

CMD [ "yarn", "run", "start" ]
