""" Salary Service Class"""
from remuneration.model.salary_setting import SalarySetting as salary_setting_model


class SalarySetting(object):
    """ Salary Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.salary_setting_model = salary_setting_model(self.mongo)

    def update(self, cycle):
        """ update """
        data = self.salary_setting_model.update(cycle)
        return data, 0, ''

    def find(self):
        """ list all """
        data = self.salary_setting_model.find()
        return data, 0, ''
