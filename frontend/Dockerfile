# Use Node
FROM node:20-alpine

WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Run dev server on 0.0.0.0 so other containers can access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
