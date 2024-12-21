from pymongo import MongoClient
from src.ports.adaptors.DbAdaptorI import DbAdaptorI

class DbAdaptor(DbAdaptorI):
    def __init__(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
    
    def save_result(self, data):
        self.db.results.insert_one(data)
