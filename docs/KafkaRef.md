To test by sending a message to a Kafka topic using the provided `docker-compose` setup, follow these steps:

### 1. **Ensure Kafka and Zookeeper are Running**

- Start the Docker container using:
  ```bash
  docker-compose up
  ```
- Verify that the Kafka broker is running and accessible by checking logs:
  ```bash
  docker logs kafka1
  ```

### 2. **Create a Kafka Topic**

Use the Kafka CLI or a Kafka client library. For CLI:

- Execute a shell inside the Kafka container:
  ```bash
  docker exec -it kafka1 bash
  ```
- Create a topic named `test-topic`:
  ```bash
  kafka-topics --create --topic test-topic --bootstrap-server kafka1:19092 --partitions 1 --replication-factor 1
  ```
- Confirm topic creation:
  ```bash
  kafka-topics --list --bootstrap-server kafka1:19092
  ```

### 3. **Produce a Message**

Send a test message to the topic:

```bash
kafka-console-producer --topic test-topic --bootstrap-server kafka1:19092
```

After running the command, type a message (e.g., `Hello Kafka`) and press Enter to send.

### 4. **Consume a Message**

To verify the message was received, run a consumer:

```bash
kafka-console-consumer --topic test-topic --bootstrap-server kafka1:19092 --from-beginning
```

You should see the message `Hello Kafka` displayed.

### 5. **Test from Outside Docker**

If you want to test from your local machine, ensure the ports (e.g., `9092`) are accessible.

Install a Kafka client locally (e.g., `kafka-python`, `confluent-kafka`):

- Example using Python:

  ```python
  from kafka import KafkaProducer, KafkaConsumer

  # Producer
  producer = KafkaProducer(bootstrap_servers='127.0.0.1:9092')
  producer.send('test-topic', b'Hello Kafka from Python!')

  # Consumer
  consumer = KafkaConsumer('test-topic', bootstrap_servers='127.0.0.1:9092', auto_offset_reset='earliest')
  for message in consumer:
      print(f"Received: {message.value.decode('utf-8')}")
  ```

### 6. **Debugging**

- Ensure the advertised listener is correctly set (`EXTERNAL://${DOCKER_HOST_IP:-127.0.0.1}:9092`).
- Check connectivity using tools like `telnet` or `nc`:
  ```bash
  nc -vz 127.0.0.1 9092
  ```
