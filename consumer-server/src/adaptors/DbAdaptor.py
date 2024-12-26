from pymongo import MongoClient
from src.ports.adaptors.DbAdaptorI import DbAdaptorI
from dataclasses import asdict
from src.entity.data_structures import RepositoryAnalytics, CommitCommiterAnalytics

class DbAdaptor(DbAdaptorI):
    def __init__(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def fetch_RepositoryAnalytics(self, repository_id : str)->RepositoryAnalytics:
        db_result = (self.db.results.find_one({'repository_id':repository_id}))
        if not db_result:
            return RepositoryAnalytics(repository_id=repository_id)
        db_result.pop('_id')
        respository_analytics = RepositoryAnalytics(**db_result)
        return respository_analytics
    
    def save_result(self, data):

        """
        Saves or updates a document identified by the repository_id field.

        Parameters:
        - data (dict): The document to save. Must include the repository_id field.
        """
        data = asdict(data)
        if 'repository_id' not in data:
            raise ValueError("The 'repository_id' field is required in the data.")

        self.db.results.update_one(
            {'repository_id': data['repository_id']},  # Query to find the document
            {'$set': data},  # Fields to update or set
            upsert=True  # Insert a new document if no match is found
        )
