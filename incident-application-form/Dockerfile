
# Build container

FROM node:lts-alpine

ADD . .
RUN npm install
RUN npm run build

CMD npm start
