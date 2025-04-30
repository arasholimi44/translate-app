# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy the whole monorepo to preserve workspace relationships
COPY . .

# Set the workspace root (you must have a root package.json with workspaces defined!)
RUN npm install --workspaces --legacy-peer-deps

# Build frontend if needed
WORKDIR /app/frontend/apps
# RUN npm run build  # Optional if already prebuilt

# Copy the built Next.js app into a lighter image if needed (optional multi-stage)
# For now, just start it directly
EXPOSE 3000
CMD ["npm", "start"]