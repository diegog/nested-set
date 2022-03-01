FROM node:17-alpine

WORKDIR /code

COPY package.json /code

COPY package-lock.json /code

RUN npm install

USER node

COPY . /code

EXPOSE 3001

ENTRYPOINT ["npm", "run", "dev"]
