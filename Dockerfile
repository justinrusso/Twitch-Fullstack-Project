FROM node:12 AS backend-build-stage

ENV NODE_ENV=development

WORKDIR /builder
COPY ./backend ./backend
COPY ./types ./types

WORKDIR /builder/backend
RUN npm install
RUN npm run build

FROM node:12 AS frontend-build-stage

ENV NODE_ENV=development

WORKDIR /builder
COPY ./frontend ./frontend
COPY ./types ./types

WORKDIR /builder/frontend
RUN npm install
RUN npm run build

FROM node:12

ENV NODE_ENV=production

EXPOSE 5000

WORKDIR /var/www

# Copy build backend files to container
COPY --from=backend-build-stage builder/backend/bin ./bin
COPY --from=backend-build-stage builder/backend/dist ./dist
COPY --from=backend-build-stage ["builder/backend/ormconfig.js", "builder/backend/package.json", "builder/backend/package-lock.json", "./"]

# Copy built frontend files to container
COPY --from=frontend-build-stage builder/frontend/build ./static

# Install production-only dependencies for backend
RUN npm install --production

CMD npm run start