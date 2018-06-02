""" Insurance Service Class"""
from remuneration.model.insurance import Insurance as insurance_model


class Insurance(object):
    """ Taxes Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.insurance_model = insurance_model(self.mongo)

    def add(self, name, pension, medical, serious_illness,
            unemployment, occupational_injury, birth):
        """ list all insurance """
        if not name:
            return {}, 1, 'Title cannot be empty'
        data = self.insurance_model.add(name, pension, medical, serious_illness,
                                        unemployment, occupational_injury, birth)
        return data, 0, ''

    def update(self, _id, name, pension, medical, serious_illness,
               unemployment, occupational_injury, birth):
        """ list all tree """
        data = self.insurance_model.update(_id, name, pension, medical, serious_illness,
                                           unemployment, occupational_injury, birth)
        return data, 0, ''

    def remove(self, _id):
        """ list all tree """
        self.insurance_model.remove(_id)
        return {}, 0, ''

    def list_all(self):
        """ list all """
        data = self.insurance_model.list_all()
        return data, 0, ''
