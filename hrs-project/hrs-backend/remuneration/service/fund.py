""" Fund Service Class"""
from remuneration.model.fund import Fund as fund_model


class Fund(object):
    """ Fund Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.fund_model = fund_model(self.mongo)

    def add(self, name, company_rate, personal_rate, lower, higher):
        """ list all fund """
        if not name:
            return {}, 1, 'Title cannot be empty'
        data = self.fund_model.add(name, company_rate, personal_rate, lower, higher)
        return data, 0, ''

    def update(self, _id, name, company_rate, personal_rate, lower, higher):
        """ list all tree """
        data = self.fund_model.update(_id, name, company_rate, personal_rate, lower, higher)
        return data, 0, ''

    def remove(self, _id):
        """ list all tree """
        self.fund_model.remove(_id)
        return {}, 0, ''

    def list_all(self):
        """ list all """
        data = self.fund_model.list_all()
        return data, 0, ''
