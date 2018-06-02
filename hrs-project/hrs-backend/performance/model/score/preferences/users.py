""" ranking preferences departments """
from bson import ObjectId
class Users(object):
    """ ranking preferences Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, pid, userid):
        """ add ranking preferences users """
        pid = ObjectId(pid)
        return self.mongo.db.ranking_preferences.update(
            {
                "_id":pid
            },
            {
                '$push':
                {
                    'users':
                    {
                        'userid':userid
                    }
                }
            })

    def delete(self, pid, userid):
        """ delete ranking preferences users """
        pid = ObjectId(pid)
        return self.mongo.db.ranking_preferences.update(
            {
                '_id':pid
            },
            {
                '$pull':
                {
                    'users':
                    {
                        'userid':userid
                    }
                }
            })

    def clear(self, pid):
        """ clear users """
        pid = ObjectId(pid)
        return self.mongo.db.ranking_preferences.update(
            {
                '_id':pid
            },
            {
                '$set':
                {
                    'users':[]
                }
            })
