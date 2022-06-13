FROM node:12-alpine

RUN apk add --no-cache python2 g++ make
EXPOSE 8080/tcp
WORKDIR /app
COPY . .
RUN yarn
CMD ["npm", "run", "app"]