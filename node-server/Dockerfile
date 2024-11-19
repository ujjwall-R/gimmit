FROM archlinux:latest
WORKDIR /app
RUN pacman -Sy --noconfirm nodejs npm
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
