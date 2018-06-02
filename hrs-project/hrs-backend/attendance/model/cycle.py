""" Cycle Model Class """
from bson import ObjectId

class Cycle(object):
    """ Cycle Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, start_time, end_time, lunch_start_time, lunch_end_time,
            overtime_start_time):
        """ add cycle """
        data = {
            "_id":ObjectId(),
            "start_time":start_time,
            "end_time":end_time,
            "lunch_start_time":lunch_start_time,
            "lunch_end_time":lunch_end_time,
            "overtime_start_time":overtime_start_time
        }
        self.mongo.db.attendance_cycle.insert_one(data)
        return data

    def update(self, _id, start_time, end_time, lunch_start_time, lunch_end_time,
               overtime_start_time):
        """ update cycle """
        data = {
            "start_time":start_time,
            "end_time":end_time,
            "lunch_start_time":lunch_start_time,
            "lunch_end_time":lunch_end_time,
            "overtime_start_time":overtime_start_time
        }
        self.mongo.db.attendance_cycle.update({"_id":ObjectId(_id)}, {"$set":data})
        return self.mongo.db.attendance_cycle.find_one({"_id":ObjectId(_id)})

    def remove(self, _id):
        """ remove one cycle """
        _id = ObjectId(_id)
        return self.mongo.db.attendance_cycle.remove({"_id":_id})

    def list(self):
        """ list all of cycle """
        return self.mongo.db.attendance_cycle.find({})
