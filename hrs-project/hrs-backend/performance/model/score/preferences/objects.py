""" ranking preferences objects """
from bson import ObjectId
class Objects(object):
    """ ranking preferences Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, pid, ids):
        """ add ranking preferences """
        return self.mongo.db.score_preferences.update(
            {
                "_id":ObjectId(pid)
            },
            {
                '$push':
                {
                    'objects':ids
                }
            })

    def delete(self, pid, _id):
        """ delete score preferences options """
        pid = ObjectId(pid)
        return self.mongo.db.score_preferences.update(
            {
                '_id':pid
            },
            {
                '$pull':
                {
                    'objects':_id
                }
            })

    def clear(self, pid):
        """ clear departments """
        pid = ObjectId(pid)
        return self.mongo.db.score_preferences.update(
            {
                '_id':pid
            },
            {
                '$set':
                {
                    'objects':[]
                }
            })
        