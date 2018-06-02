""" Machine Service Class"""
from attendance.model.rule import Rule as rule_model

class Rule(object):
    """ Rule Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.rule_model = rule_model(self.mongo)

    def update_late(self, fee, free_times, remark):
        """ update late rule """
        data = self.rule_model.update_late(fee, free_times, remark)
        return data, 0, ''

    def update_absenteeism(self, fee, free_hours, remark):
        """ update absenteeism rule """
        data = self.rule_model.update_absenteeism(fee, free_hours, remark)
        return data, 0, ''

    def update_overtime(self, weekday_fee, weekend_fee,
                        weekday_minimum_pay_hours, weekend_minimum_pay_hours,
                        weekday_multiple_payment, weekend_multiple_payment, remark):
        """ update overtime rule """
        data = self.rule_model.update_overtime(weekday_fee, weekend_fee,
                                               weekday_minimum_pay_hours, weekend_minimum_pay_hours,
                                               weekday_multiple_payment, weekend_multiple_payment,
                                               remark)
        return data, 0, ''

    def update_days_off(self, fee, remark):
        """ update days off rule """
        data = self.rule_model.update_days_off(fee, remark)
        return data, 0, ''

    def update_business_trip(self, fee, remark):
        """ update business trip rule """
        data = self.rule_model.update_business_trip(fee, remark)
        return data, 0, ''

    def update_annual_vacation(self, days, clear_date, remark):
        """ update annual vacation rule """
        data = self.rule_model.update_annual_vacation(days, clear_date, remark)
        return data, 0, ''

    def add_leave(self, name, fee, deduct_subsidy, deduct_type, remark):
        """ add leave rule  """
        data = self.rule_model.add_leave(name, fee, deduct_subsidy, deduct_type, remark)
        return data, 0, ''

    def remove(self, _id):
        """ remove rule """
        self.rule_model.remove(_id)
        return {}, 0, ''

    def find(self, _id):
        """ find rule """
        data = self.rule_model.find(_id)
        return data, 0, ''

    def list(self):
        """ list rules """
        data = self.rule_model.list()
        return data, 0, ''

    def list_others(self):
        """ list others rules """
        data = self.rule_model.list_others()
        return data, 0, ''

    def update_leave(self, _id, name, fee, deduct_subsidy, deduct_type, remark):
        """ update leave rule """
        data = self.rule_model.update_leave(_id, name, fee, deduct_subsidy, deduct_type, remark)
        return data, 0, ''
