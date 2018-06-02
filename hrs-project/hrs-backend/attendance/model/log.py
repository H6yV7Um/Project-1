""" Log Model Class """
import datetime
from bson import ObjectId

class Log(object):
    """ Log Model Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, member_id, verify_time, machine_id):
        """ add log """
        data = {
            "_id":ObjectId(),
            "member_id":member_id,
            "verify_time":verify_time,
            "machine_id":machine_id
        }
        self.mongo.db.attendance_log.insert_one(data)
        return data

    def remove(self, _id):
        """ remove one file """
        _id = ObjectId(_id)
        return self.mongo.db.attendance_log.remove({"_id":_id})
