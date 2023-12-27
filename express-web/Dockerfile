FROM node:18.19
RUN mkdir -p ./app
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3001
CMD [ "npm", "run", "start:prod:container" ]
