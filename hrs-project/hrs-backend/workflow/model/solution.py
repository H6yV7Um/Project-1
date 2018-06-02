""" Solution Model Class"""
import datetime
from bson import ObjectId

class Solution(object):
    """ Solution Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def list_all(self):
        """ list all """
        return self.mongo.db.workflow_solution.find({})

    def add(self, name, copyto, remark, type, fields, flow):
        """ Add workflow solution """
        workflow_model = {
            '_id':ObjectId(),
            'name':name,
            'copyto':copyto,
            'remark': remark,
            'type':type,
            'fields':fields,
            'flow': flow
        }
        self.mongo.db.workflow_solution.insert_one(workflow_model)
        return workflow_model

    def update(self, _id, name, copyto, remark, fields, flow):
        """ Update workflow solution """
        self.mongo.db.workflow_solution.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                    {
                        'name':name,
                        'copyto':copyto,
                        'remark': remark,
                        'fields':fields,
                        'flow':flow
                    }
            })
        return self.mongo.db.workflow_solution.find_one({"_id": ObjectId(_id)})

    def remove(self, _id):
        """ remove """
        return self.mongo.db.workflow_solution.remove(
            {
                "_id": ObjectId(_id)
            })

    def find(self, _id):
        """ find """
        return self.mongo.db.workflow_solution.find_one({"_id": ObjectId(_id)})
