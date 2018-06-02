""" Apply Model Class """
import datetime
from bson import ObjectId

class Apply(object):
    """ Apply Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def add_leave(self, start_time, end_time, _type, user_id, remark, file):
        """ add leave apply """
        data = {
            "_id":ObjectId(),
            "start_time":start_time,
            "end_time":end_time,
            "type": "leave",
            "leave_type":_type,
            "timestamp":datetime.datetime.now(),
            "user_id": user_id,
            "remark":remark,
            "file":file
        }
        self.mongo.db.attendance_apply.insert_one(data)
        return data

    def add_remedy(self, _time, user_id, remark, file):
        """ add cycle """
        data = {
            "_id":ObjectId(),
            "time":_time,
            "type": "remedy",
            "timestamp":datetime.datetime.now(),
            "user_id": user_id,
            "remark":remark,
            "file":file
        }
        self.mongo.db.attendance_apply.insert_one(data)
        return data

    def add_overtime(self, start_time, end_time, user_id, remark, file):
        """ add cycle """
        data = {
            "_id":ObjectId(),
            "start_time":start_time,
            "end_time":end_time,
            "type": "overtime",
            "timestamp":datetime.datetime.now(),
            "user_id": user_id,
            "remark":remark
        }
        self.mongo.db.attendance_apply.insert_one(data)
        return data
