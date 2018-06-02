""" Machine Model Class """
import datetime
from bson import ObjectId

class Machine(object):
    """ Machine Model Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, serial_number, ip_address, location):
        """ add machine """
        data = {
            "_id":ObjectId(),
            "serial_number":serial_number,
            "ip_address":ip_address,
            "location":location,
            "updatetime":datetime.datetime.now()
        }
        self.mongo.db.machine.insert_one(data)
        return data
    def remove(self, _id):
        """ remove one file """
        _id = ObjectId(_id)
        return self.mongo.db.machine.remove({"_id":_id})

    def find(self, _id):
        """ find one file """
        _id = ObjectId(_id)
        return self.mongo.db.machine.find_one({"_id":_id})

    def update(self, _id, serial_number, ip_address, location):
        """ update machine information """
        _id = ObjectId(_id)
        self.mongo.db.machine.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    "serial_number":serial_number,
                    "ip_address":ip_address,
                    "location":location
                }
            })
        return self.mongo.db.machine.find_one({"_id": ObjectId(_id)})

    def update_time(self, _id, updatetime):
        """ update time """
        _id = ObjectId(_id)
        self.mongo.db.machine.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    "updatetime":updatetime
                }
            })
        return self.mongo.db.machine.find_one({"_id": ObjectId(_id)})

    def list_machines(self):
        """ list all of machines """
        return self.mongo.db.machine.find({})
