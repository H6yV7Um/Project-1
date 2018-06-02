""" Salary Setting Model Class"""
import datetime
from bson import ObjectId

class SalarySetting(object):
    """ Salary Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def find(self):
        """ list all """
        return self.mongo.db.salary_setting.find_one({})

    def update(self, cycle):
        """ Update Salary setting solution """
        self.mongo.db.salary_setting.update(
            {},
            {
                "$set":
                {
                    'cycle':cycle
                }
            })
        return self.mongo.db.salary_setting.find_one({})
