FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .

ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_BASE_DOMAIN
ARG VITE_BASE_DOMAIN_CLOUDINARY
ARG VITE_IS_PRODUCTION=true

ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ENV VITE_BASE_DOMAIN=${VITE_BASE_DOMAIN}
ENV VITE_BASE_DOMAIN_CLOUDINARY=${VITE_BASE_DOMAIN_CLOUDINARY}
ENV VITE_IS_PRODUCTION=${VITE_IS_PRODUCTION}

RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
