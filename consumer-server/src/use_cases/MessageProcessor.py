from src.entity.data_structures import CommitInfo, QueueMessage

class MessageProcessor:
    def __init__(self, db_adaptor):
        self.db_adaptor = db_adaptor

    def process_message(self, message_data):
        message = QueueMessage(key=message_data['key'],value=message_data['value'])
        # CommitInfo(
        #     repository_id=message_data['value']["repository_id"],
        #     author_name=message_data['value']["author_name"],
        #     author_email=message_data['value']["author_email"],
        #     message=message_data['value']["message"],
        #     timestamp=message_data['value']["message"])
        
        analytics_result = self.run_analytics(message)
        self.db_adaptor.save_result(analytics_result)

    def run_analytics(self, message):
        return {"key": message.key, "value_length": len(message.value)}
