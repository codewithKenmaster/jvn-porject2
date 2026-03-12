# ---------- Stage 1: Build React App ----------
FROM node:20 AS client-build

WORKDIR /app/client

# Copy package.json first to leverage Docker cache
COPY client/package*.json ./
RUN npm install

# Copy all React app files
COPY client ./

# Build React app
RUN npm run build

# ---------- Stage 2: Setup Server ----------
FROM node:20-alpine

WORKDIR /app

# Copy server package.json and install deps
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code
COPY server ./server

# Copy React build from stage 1
COPY --from=client-build /app/client/build ./client/build

EXPOSE 4008

CMD ["node", "server/server.js"]