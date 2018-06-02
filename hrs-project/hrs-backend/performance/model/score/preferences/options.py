""" score preferences options """
from bson import ObjectId
class Options(object):
    """ score preferences Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, pid, name, upper, lower):
        """ add score preferences """
        return self.mongo.db.score_preferences.update(
            {"_id":ObjectId(pid)},
            {
                '$push':
                {
                    'options':
                    {
                        '_id':ObjectId(),
                        'name':name,
                        'upper':upper,
                        'lower':lower,
                    }
                }
            })

    def update(self, oid, name, upper, lower):
        """ update score preferences basic information """
        oid = ObjectId(oid)
        return self.mongo.db.score_preferences.update(
            {
                "options._id":ObjectId(oid)
            },
            {
                "$set":
                {
                    'options.$.name':name,
                    'options.$.upper':upper,
                    'options.$.lower':lower
                }
            })

    def delete(self, oid):
        """ delete score preferences options """
        oid = ObjectId(oid)
        return self.mongo.db.score_preferences.update(
            {
                'options._id':oid
            },
            {
                '$pull':
                {
                    'options':
                    {
                        '_id':oid
                    }
                }
            })
