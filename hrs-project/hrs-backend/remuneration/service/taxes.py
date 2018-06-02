""" Taxes Service Class"""
from remuneration.model.taxes import Taxes as taxes_model


class Taxes(object):
    """ Taxes Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.taxes_model = taxes_model(self.mongo)

    def add(self, name, threshold, levels):
        """ list all departments """
        if not name:
            return {}, 1, 'Title cannot be empty'
        data = self.taxes_model.add(name, threshold, levels)
        return data, 0, ''

    def update(self, _id, name, threshold, levels):
        """ list all tree """
        data = self.taxes_model.update(_id, name, threshold, levels)
        return data, 0, ''

    def remove(self, _id):
        """ list all tree """
        self.taxes_model.remove(_id)
        return {}, 0, ''

    def list_all(self):
        """ list all """
        data = self.taxes_model.list_all()
        return data, 0, ''
