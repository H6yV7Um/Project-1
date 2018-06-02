""" Module """
from bson import ObjectId
class Module(object):
    """ Module Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, name, namespace, version, permission):
        """ add module """
        return self.mongo.db.module.insert_one(
            {
                'name':name,
                'namespace':namespace,
                'version':version,
                'permission':permission
            })

    def update(self, mid, name, namespace, version, permission):
        """ update module """
        mid = ObjectId(mid)
        return self.mongo.db.module.update(
            {
                "_id":mid
            },
            {
                "$set":
                {
                    'name':name,
                    'namespace':namespace,
                    'version':version,
                    'permission':permission
                }
            })

    def delete(self, mid):
        """ delete root menu """
        mid = ObjectId(mid)
        return self.mongo.db.module.remove(
            {
                "_id": mid
            })

    def list(self):
        """ list all """
        return self.mongo.db.module.find({})

    def exists_namespace(self, namespace):
        """ confirm namespace is exists  """
        return self.mongo.db.module.count({"namespace":namespace})

    def exists_id(self, mid):
        """ confirm namespace is exists  """
        mid = ObjectId(mid)
        return self.mongo.db.module.count({"_id":mid})

    def find(self, mid):
        """ find module """
        mid = ObjectId(mid)
        return self.mongo.db.module.find_one({"_id":mid})

    def list_permission(self, permission):
        """ list all """
        condition = {}
        if permission == '0':
            condition = {"permission": permission}
        elif permission == '1':
            condition = {"$or": [
                {"permission": permission},
                {"permission": "0"}
                ]}
        return self.mongo.db.module.find(condition)
