""" Salary Service Class"""
from remuneration.model.salary import Salary as salary_model


class Salary(object):
    """ Salary Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.salary_model = salary_model(self.mongo)

    def add(self, name, salaries, subsidy):
        """ list all departments """
        if not name:
            return {}, 1, 'Title cannot be empty'
        data = self.salary_model.add(name, salaries, subsidy)
        return data, 0, ''

    def update(self, _id, name, salaries, subsidy):
        """ list all tree """
        data = self.salary_model.update(_id, name, salaries, subsidy)
        return data, 0, ''

    def remove(self, _id):
        """ list all tree """
        self.salary_model.remove(_id)
        return {}, 0, ''

    def list_all(self):
        """ list all """
        data = self.salary_model.list_all()
        return data, 0, ''
