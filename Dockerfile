# Stage 1: Build the Next.js app
FROM debian:latest AS app
WORKDIR /app
RUN apt-get update && apt-get upgrade -y && apt-get install -y nodejs npm
COPY ./app .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 2: Build the Go server
FROM archlinux:latest AS server
WORKDIR /core-backend
RUN pacman -Syu --noconfirm go git gcc glibc
COPY ./core-backend .
RUN go mod download
RUN go get -u github.com/confluentinc/confluent-kafka-go/kafka
EXPOSE 8080
CMD ["go", "run", "main.go"]

# Stage 3: MongoDB setup
FROM debian:latest AS mongodb
RUN apt-get update && apt-get upgrade -y && apt-get install -y gnupg curl

# Import MongoDB GPG key and add MongoDB repository
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
--dearmor
RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb-org

# Create MongoDB data directory
RUN mkdir -p /data/db

# VOLUME /data/db makes /data/db a mount point in the container for data storage.
# In combination with docker-compose.yml, the data from MongoDB will be persisted in a directory (./data) on your host machine,
# which ensures that the data survives container restarts and removals.
VOLUME /data/db
EXPOSE 27017

# Run MongoDB
CMD ["mongod", "--bind_ip_all", "--dbpath", "/data/db"]

# consumer server
FROM python:3.10-slim
WORKDIR /app
COPY consumer-server/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY consumer-server/ /app/
CMD ["python", "main.py"]
