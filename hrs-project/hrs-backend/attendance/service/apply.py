""" Apply Service Class"""
from attendance.model.apply import Apply as apply_model

class Apply(object):
    """ Cycle Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.apply_model = apply_model(self.mongo)

    def add_leave(self, start_time, end_time, _type, user_id, remark, file):
        """ add apply """
        return self.apply_model.add_leave(start_time, end_time, _type, user_id, remark, file), 0, ""
    
    def add_remedy(self, _time, user_id, remark, file):
        return self.apply_model.add_remedy(_time, user_id, remark, file), 0, ""
    
    def add_overtime(self, start_time, end_time, user_id, remark, file):
        return self.apply_model.add_overtime(start_time, end_time, user_id, remark, file), 0, ""
