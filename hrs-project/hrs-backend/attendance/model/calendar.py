""" Calendar Model Class """
from bson import ObjectId

class Calendar(object):
    """ Calendar Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, date, vacation, title, remark, attendance_time, closing_time):
        """ add cycle """
        data = {
            "_id": ObjectId(),
            "date": date,
            "vacation": bool(int(vacation)),
            "title": title,
            "remark": remark,
            "attendance_time": attendance_time,
            "closing_time": closing_time
        }
        self.mongo.db.attendance_calendar.insert_one(data)
        return data

    def update(self, _id, date, vacation, title, remark, attendance_time, closing_time):
        """ update cycle """
        data = {
            "date": date,
            "vacation": bool(int(vacation)),
            "title": title,
            "remark": remark,
            "attendance_time": attendance_time,
            "closing_time": closing_time
        }
        self.mongo.db.attendance_calendar.update({"_id":ObjectId(_id)}, {"$set":data})
        return self.mongo.db.attendance_calendar.find_one({"_id":ObjectId(_id)})

    def remove(self, _id):
        """ remove one cycle """
        _id = ObjectId(_id)
        return self.mongo.db.attendance_calendar.remove({"_id":_id})

    def list(self, start_time, end_time):
        """ list all of vacation """
        return self.mongo.db.attendance_calendar.find(
            {
                "date":
                {
                    "$gte": start_time, "$lt":end_time
                }
            })
