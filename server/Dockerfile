FROM node:20-alpine3.17
WORKDIR /app
ARG PORT=3000
COPY . .
RUN npm install
EXPOSE $PORT
CMD ["npm", "run", "serve"]