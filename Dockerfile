# Build environment
FROM node:14
WORKDIR /app

# Install app dependencies
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# Bundle app source
COPY . ./
RUN yarn build

# Clear the cache
RUN yarn cache clean

EXPOSE 3000
CMD ["yarn", "start"]
