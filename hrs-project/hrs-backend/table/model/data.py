import datetime
from bson import ObjectId
class Data(object):
    def __init__(self, mongo):
        self.mongo = mongo
    def get(self):
        return self.mongo.db.newdata.find({})