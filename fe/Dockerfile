# FROM node:lts as alpha
# RUN mkdir dist/alpha
# COPY ./alpha/package.json .
# RUN npm install
# COPY ./alpha .
# RUN npm run build
# RUN mv dist dist/alpha
# RUN rm -r src

# FROM node:lts as beta
# RUN mkdir dist/beta
# COPY --from=beta ./beta/package.json .
# RUN npm install
# COPY ./beta .
# RUN npm run build
# RUN mv dist dist/beta
# RUN rm -r src

FROM node:lts as alpha
WORKDIR /app
COPY ./alpha/package.json .
RUN npm install
COPY ./alpha .
RUN npm run build

FROM node:lts as beta
WORKDIR /app
COPY ./beta/package.json .
RUN npm install
COPY ./beta .
RUN npm run build

FROM node:lts as router
EXPOSE 5000
WORKDIR /app
RUN mkdir dist
COPY ./router/package.json .
RUN npm install
COPY --from=alpha app/dist app/dist/alpha
COPY --from=beta app/dist app/dist/beta
COPY ./router ./
CMD ["npm", "run", "start"]