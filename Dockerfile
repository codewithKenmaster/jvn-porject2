# ---------- Stage 1: Build React App ----------
FROM node:24 AS client-build

WORKDIR /app/client

# Install client dependencies
COPY client/package*.json ./
RUN npm install

# Copy client source code
COPY client ./ 

# Build React app
RUN npm run build

# ---------- Stage 2: Setup Server ----------
FROM node:24-alpine

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server code
COPY server ./server

# Copy React production build
COPY --from=client-build /app/client/build ./client/build

# Expose server port
EXPOSE 4008

# Start server
CMD ["node", "server/server.js"]