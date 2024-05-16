FROM node:22.0.0-alpine
RUN apk add bash nano

#create workdir
ARG APP_DIR=/usr/src/app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

#install dependencies
COPY package*.json $APP_DIR/
RUN npm install

#copy source
COPY src $APP_DIR/src
COPY test $APP_DIR/test
COPY .eslintrc.js $APP_DIR/.eslintrc.js
COPY .prettierrc $APP_DIR/.prettierrc
COPY nest-cli.json $APP_DIR/nest-cli.json
COPY tsconfig.build.json $APP_DIR/tsconfig.build.json
COPY tsconfig.json $APP_DIR/tsconfig.json

#run build
RUN npm i -g @nestjs/cli
RUN nest build

CMD [ "node", "dist/main" ]
