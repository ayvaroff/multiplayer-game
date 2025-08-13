FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn --immutable

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["npx", "http-server", "-p", "3000", "dist"]
