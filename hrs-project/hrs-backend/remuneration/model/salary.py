""" Salary Model Class"""
import datetime
from bson import ObjectId

class Salary(object):
    """ Salary Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def list_all(self):
        """ list all """
        return self.mongo.db.salary.find({})

    def add(self, name, salaries, subsidy):
        """ Add Salary solution """
        for salary in salaries:
            salary['_id'] = ObjectId()
        for sidy in subsidy:
            sidy['_id'] = ObjectId()

        salary_model = {
            '_id':ObjectId(),
            'name':name,
            'salaries':salaries,
            'subsidy': subsidy
        }
        self.mongo.db.salary.insert_one(salary_model)
        return salary_model

    def update(self, _id, name, salaries, subsidy):
        """ Update Insurance solution """
        for salary in salaries:
            salary['_id'] = ObjectId(salary['_id']['$oid'])
        for sidy in subsidy:
            sidy['_id'] = ObjectId(sidy['_id']['$oid'])
        self.mongo.db.salary.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'name':name,
                    'salaries':salaries,
                    'subsidy': subsidy
                }
            })
        return self.mongo.db.salary.find_one({"_id": ObjectId(_id)})

    def remove(self, _id):
        """ remove """
        return self.mongo.db.salary.remove(
            {
                "_id": ObjectId(_id)
            })
