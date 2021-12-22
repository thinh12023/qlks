FROM node:14-alpine

WORKDIR /app

RUN npm install -g pm2

RUN chown -R node:node /app

USER node

COPY --chown=node:node ["package.json", "package-lock.json*", "./"]

RUN npm install --silent

COPY --chown=node:node . .

# log rotate must be run after we switch user
RUN pm2 install pm2-logrotate

CMD ["pm2-runtime", "ecosystem.config.js"]
