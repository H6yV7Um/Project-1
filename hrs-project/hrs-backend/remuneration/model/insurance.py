""" Insurance Model Class"""
import datetime
from bson import ObjectId

class Insurance(object):
    """ Insurance Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def list_all(self):
        """ list all """
        return self.mongo.db.insurance.find({})

    def add(self, name, pension, medical, serious_illness,
            unemployment, occupational_injury, birth):
        """ Add Insurance solution """
        taxes_model = {
            '_id':ObjectId(),
            'name':name,
            'pension':pension,
            'medical': medical,
            'serious_illness': serious_illness,
            'unemployment': unemployment,
            'occupational_injury': occupational_injury,
            'birth': birth
        }
        self.mongo.db.insurance.insert_one(taxes_model)
        return taxes_model

    def update(self, _id, name, pension, medical, serious_illness,
               unemployment, occupational_injury, birth):
        """ Update Insurance solution """
        self.mongo.db.insurance.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'name':name,
                    'pension':pension,
                    'medical': medical,
                    'serious_illness': serious_illness,
                    'unemployment': unemployment,
                    'occupational_injury': occupational_injury,
                    'birth': birth
                }
            })
        return self.mongo.db.insurance.find_one({"_id": ObjectId(_id)})

    def remove(self, _id):
        """ remove """
        return self.mongo.db.insurance.remove(
            {
                "_id": ObjectId(_id)
            })
