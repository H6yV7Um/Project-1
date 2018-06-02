""" Taxes Model Class"""
import datetime
from bson import ObjectId

class Taxes(object):
    """ Taxes Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def list_all(self):
        """ list all """
        return self.mongo.db.taxes.find({})

    def add(self, name, threshold, levels):
        """ Add Taxes solution """
        taxes_model = {
            '_id':ObjectId(),
            'name':name,
            'threshold':threshold,
            'levels': levels
        }
        self.mongo.db.taxes.insert_one(taxes_model)
        return taxes_model

    def update(self, _id, name, threshold, levels):
        """ Update Taxes solution """
        self.mongo.db.taxes.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'name':name,
                    'threshold':threshold,
                    'levels': levels
                }
            })
        return self.mongo.db.taxes.find_one({"_id": ObjectId(_id)})

    def remove(self, _id):
        """ remove """
        return self.mongo.db.taxes.remove(
            {
                "_id": ObjectId(_id)
            })
