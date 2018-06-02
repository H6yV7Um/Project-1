from table.model.data import Data as data_model
class Data(object):
    def __init__(self, mongo):
        self.mongo = mongo
        self.data_model = data_model(self.mongo)
    def get(self):
        data = self.data_model.get()
        return data, 0, ''
