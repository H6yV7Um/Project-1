""" Menus """
from bson import ObjectId
class Menu(object):
    """ Menus Class"""
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, moduleid, name, icon):
        """ add ranking preferences """
        moduleid = ObjectId(moduleid)
        _id = ObjectId()
        self.mongo.db.menu.insert_one(
            {
                '_id':_id,
                'moduleid':moduleid,
                'name':name,
                'icon':icon,
                'sub':[]
            })
        return _id

    def update(self, mid, name, icon):
        """ update ranking preferences basic information """
        mid = ObjectId(mid)
        return self.mongo.db.menu.update(
            {
                "_id":mid
            },
            {
                "$set":
                {
                    'name':name,
                    'icon':icon
                }
            })

    def delete(self, mid):
        """ delete root menu """
        mid = ObjectId(mid)
        return self.mongo.db.menu.remove(
            {
                "_id": mid
            })

    def add_sub(self, parentid, name, url, icon, permission):
        """ add sub menu """
        _id = ObjectId()
        self.mongo.db.menu.update(
            {"_id":ObjectId(parentid)},
            {
                '$push':
                {
                    'sub':
                    {
                        '_id':_id,
                        'name':name,
                        'url':url,
                        'icon':icon,
                        'permission':permission
                    }
                }
            })
        return _id

    def update_sub(self, sid, name, url, icon, permission):
        """ update sub menu """
        sid = ObjectId(sid)
        return self.mongo.db.menu.update(
            {
                "sub._id":sid
            },
            {
                "$set":
                {
                    'sub.$.name':name,
                    'sub.$.url':url,
                    'sub.$.icon':icon,
                    'sub.$.permission':permission
                }
            })

    def delete_sub(self, sid):
        """ delete sub menu """
        sid = ObjectId(sid)
        return self.mongo.db.menu.update(
            {
                'sub._id':sid
            },
            {
                '$pull':
                {
                    'sub':
                    {
                        '_id':sid
                    }
                }
            })

    def list(self, moduleid):
        """ list menus by module id """
        moduleid = ObjectId(moduleid)
        return self.mongo.db.menu.find(
            {
                'moduleid':moduleid
            })

    def list_all(self):
        """ list all of menu """
        return self.mongo.db.menu.find({})

    def find_sub(self, _id):
        """ find sub menu """
        _id = ObjectId(_id)
        return self.mongo.db.menu.find_one(
            {
                "sub._id":_id
            }
            ,
            {
                "name":1,
                "icon":1,
                "moduleid":1,
                "sub":
                {
                    '$elemMatch':{'_id':_id}
                }
            }
        )

    def list_sub_ids(self, ids):
        """ list sub menus by id array """
        ids_obj = []
        for _id in ids:
            ids_obj.append(ObjectId(_id))
        return self.mongo.db.menu.find(
            {
                "sub._id":
                {
                    "$in":ids_obj
                }
            }
        )
