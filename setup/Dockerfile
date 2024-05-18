FROM node:12-alpine

RUN apk add --no-cache python2 g++ make git
EXPOSE 8080/tcp
WORKDIR /app
COPY . .
cmd ["git",  "clone", "https://github.com/mepurionus/my-minecraft-server-status-page.git", "."]
RUN yarn
RUN tsc
CMD ["npm", "run", "app"]