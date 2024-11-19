FROM archlinux:latest
WORKDIR /app
RUN pacman -Sy --noconfirm nodejs npm
COPY package.json package-lock.json ./
RUN npm install
COPY . .
