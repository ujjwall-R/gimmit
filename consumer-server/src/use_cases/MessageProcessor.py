from src.entity.data_structures import CommitInfo, QueueMessage, RepositoryAnalytics, CommitCommiterAnalytics
import json

class MessageProcessor:
    def __init__(self, db_adaptor):
        self.db_adaptor = db_adaptor

    def process_message(self, message_data):
        message = QueueMessage(key=message_data['key'],value=message_data['value'])
        
        analytics_result = self.run_analytics(message)
        self.db_adaptor.save_result(analytics_result)


    def run_analytics(self, message : QueueMessage):
        commit_info = CommitInfo(**(json.loads(message.value)))
        commit_commiter_analytics = CommitCommiterAnalytics({},[],[])
        result_analytics = RepositoryAnalytics(repository_id=commit_info.repository_id,commits=[],flagged_commits=[],commit_commiter_analytics=commit_commiter_analytics)
        return result_analytics
