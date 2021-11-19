# ALPHA BUILD
FROM node:lts as alpha
WORKDIR /app
COPY ./alpha/package.json .
RUN npm install
COPY ./alpha .
RUN npm run build

# BETA BUILD
FROM node:lts as beta
WORKDIR /app
COPY ./beta/package.json .
RUN npm install
COPY ./beta .
RUN npm run build

# NODE ROUTER RUN
FROM node:lts as router
EXPOSE 5000
WORKDIR /app
COPY ./router/package.json .
RUN npm install

# Prepare for artifacts
RUN mkdir dist

# ALPHA
# Copy alpha artifacts to node server
COPY --from=alpha /app/dist /app/dist
# Rename index.html to alpha.html
RUN mv /app/dist/index.html /app/dist/alpha.html

# BETA
# Copy beta artifacts to node server
COPY --from=beta /app/dist /app/dist
# Rename index.html to beta.html
RUN mv /app/dist/index.html /app/dist/beta.html

COPY ./router ./
CMD ["npm", "run", "start"]
