""" Cycle Service Class"""
from attendance.model.cycle import Cycle as cycle_model

class Cycle(object):
    """ Cycle Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.cycle_model = cycle_model(self.mongo)

    def add(self, start_time, end_time, lunch_start_time, lunch_end_time,
            overtime_start_time):
        """ add cycle """
        return self.cycle_model.add(start_time, end_time, lunch_start_time, lunch_end_time,
                                    overtime_start_time), 0, ""

    def update(self, _id, start_time, end_time, lunch_start_time, lunch_end_time,
               overtime_start_time):
        """ update cycle """
        return self.cycle_model.update(_id, start_time, end_time, lunch_start_time,
                                       lunch_end_time, overtime_start_time), 0, ""

    def remove(self, _id):
        """ remove cycle """
        return self.cycle_model.remove(_id), 0, ""

    def list(self):
        """ list all of cycle """
        result = []
        cursor = self.cycle_model.list()
        for cycle in cursor:
            result.append(cycle)
        return result, 0, ""
