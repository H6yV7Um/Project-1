""" Calendar Service Class"""
import libs
from attendance.model.calendar import Calendar as calendar_model

class Calendar(object):
    """ Calendar Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.calendar_model = calendar_model(self.mongo)

    def add(self, date, vacation, title, remark, attendance_time, closing_time):
        """ add date """
        date = libs.str_to_utc(date, "%Y-%m-%d")
        return self.calendar_model.add(date, vacation, title,
                                       remark, attendance_time, closing_time), 0, ""

    def update(self, _id, date, vacation, title, remark, attendance_time, closing_time):
        """ update cycle """
        date = libs.str_to_utc(date, "%Y-%m-%d")
        return self.calendar_model.update(_id, date, vacation,
                                          title, remark, attendance_time, closing_time), 0, ""

    def remove(self, _id):
        """ remove date """
        return self.calendar_model.remove(_id), 0, ""

    def list(self, start_time, end_time):
        """ list all of cycle """
        result = []
        start_time = libs.str_to_utc(start_time, "%Y-%m-%d")
        end_time = libs.str_to_utc(end_time, "%Y-%m-%d")
        cursor = self.calendar_model.list(start_time, end_time)
        for cycle in cursor:
            result.append(cycle)
        return result, 0, ""
