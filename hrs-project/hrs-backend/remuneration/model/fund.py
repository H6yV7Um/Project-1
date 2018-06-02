""" Fund Model Class"""
import datetime
from bson import ObjectId

class Fund(object):
    """ Fund Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def list_all(self):
        """ list all """
        return self.mongo.db.fund.find({})

    def add(self, name, company_rate, personal_rate, lower, higher):
        """ Add Fund solution """
        fund_model = {
            '_id':ObjectId(),
            'name':name,
            'company_rate':company_rate,
            'personal_rate':personal_rate,
            'lower': lower,
            'higher': higher
        }
        self.mongo.db.fund.insert_one(fund_model)
        return fund_model

    def update(self, _id, name, company_rate, personal_rate, lower, higher):
        """ Update Fund solution """
        self.mongo.db.fund.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'name':name,
                    'company_rate':company_rate,
                    'personal_rate': personal_rate,
                    'lower': lower,
                    'higher': higher
                }
            })
        return self.mongo.db.fund.find_one({"_id": ObjectId(_id)})

    def remove(self, _id):
        """ remove """
        return self.mongo.db.fund.remove(
            {
                "_id": ObjectId(_id)
            })
