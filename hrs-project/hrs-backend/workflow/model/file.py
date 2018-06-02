""" File Model Class """
import datetime
from bson import ObjectId

class File(object):
    """ File Model Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, filename, filetype, path):
        """ add file """
        data = {
            "_id":ObjectId(),
            "filename":filename,
            "filetype":filetype,
            "path":path,
            "creationtime":datetime.datetime.now()
        }
        self.mongo.db.file.insert_one(data)
        return data
    def remove(self, _id):
        """ remove one file """
        _id = ObjectId(_id)
        return self.mongo.db.file.remove({"_id":_id})

    def find(self, _id):
        """ find one file """
        _id = ObjectId(_id)
        return self.mongo.db.file.find_one({"_id":_id})
