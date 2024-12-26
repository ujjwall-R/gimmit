from src.entity.data_structures import CommitInfo, QueueMessage, RepositoryAnalytics, CommitCommiterAnalytics
import json
from src.ports.adaptors.DbAdaptorI import DbAdaptorI

class MessageProcessor:
    def __init__(self, db_adaptor):
        self.db_adaptor : DbAdaptorI = db_adaptor

    def is_flagged_commit(self,commit_info):
        return False

    def process_message(self, message_data):
        message = QueueMessage(key=message_data['key'],value=message_data['value'])
        
        analytics_result = self.run_analytics(message)
        self.db_adaptor.save_result(analytics_result)


    def run_analytics(self, message : QueueMessage):
        commit_info = CommitInfo(**(json.loads(message.value)))
        old_analytics : RepositoryAnalytics = self.db_adaptor.fetch_RepositoryAnalytics(commit_info.repository_id)
        old_analytics.commit_commiter_analytics = CommitCommiterAnalytics(**old_analytics.commit_commiter_analytics)

        result_analytics = old_analytics
        result_analytics.commits.append(commit_info)
        if self.is_flagged_commit(commit_info):
            result_analytics.flagged_commits.append(commit_info)
        if commit_info.author_name not in result_analytics.commit_commiter_analytics.committer_vs_commit_count:
            result_analytics.commit_commiter_analytics.committer_vs_commit_count[commit_info.author_name] = 0
            result_analytics.commit_commiter_analytics.committerRankingByBestPractices.append(commit_info.author_name)
            result_analytics.commit_commiter_analytics.committerRankingByCount.append(commit_info.author_name)
        result_analytics.commit_commiter_analytics.committer_vs_commit_count[commit_info.author_name] += 1
        
        return result_analytics
