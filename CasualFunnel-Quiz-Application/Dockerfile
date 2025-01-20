FROM node:alpine AS development


WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]