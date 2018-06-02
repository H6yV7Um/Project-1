""" Department Model Class """
from bson import ObjectId

class Department(object):
    """ Department Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def add(self, did, name, parentid):
        """ Add one department """
        if parentid:
            parentid = ObjectId(parentid)
        else:
            parentid = ''
        data = {
            "_id": ObjectId(),
            "did": did,
            'name': name,
            'parentid': parentid,
            'active': True,
            'managers': []
        }
        self.mongo.db.department.insert_one(data)
        return data

    def update(self, _id, name, parentid, managers):
        """ Update one department """
        if not managers:
            managers = []
        self.mongo.db.department.update(
            {
                "_id":ObjectId(_id)
            },
            {
                '$set':
                {

                    'name':name,
                    'parentid':ObjectId(parentid),
                    'managers':managers
                }
            })
        return self.mongo.db.department.find(
            {
                "_id":ObjectId(_id)
            })
    def remove(self, _id):
        """ remove department """
        return self.mongo.db.department.remove({"_id":ObjectId(_id)})

    def exists(self, did):
        """ Confirm department is exist """
        return self.mongo.db.department.count({"did":did})

    def update_managers(self, did, managers):
        """ Update the department managers """
        self.mongo.db.department.update(
            {
                "did":did
            },
            {
                '$set' :
                {
                    'managers':managers
                }
            })

    def clear_manager(self, did):
        """ Remove all manager in the department """
        self.mongo.db.department.update(
            {
                "did":did
            },
            {
                '$set' :
                {
                    'managers':[]
                }
            })

    def find_did(self, did):
        """ find department by did """
        return self.mongo.db.department.find_one({'did':did})

    def find_id(self, _id):
        """ find department by id """
        return self.mongo.db.department.find_one({'_id':ObjectId(_id)})

    def list_parentid(self, parentid):
        """ Listing groups by parent id """
        return self.mongo.db.department.find({'parentid':parentid})

    def list_all(self):
        """ Listing all groups """
        return self.mongo.db.department.find({})

    def list_tree(self):
        """ Listing tree """
        root_cursor = self.mongo.db.department.find({'parentid':''})
        root = []
        for department in root_cursor:
            department['children'] = self._list_tree(department['_id'])
            department['members'] = self._list_user_departmentid(department['_id'])
            root.append(department)
        return root

    def _list_tree(self, parentid):
        root_cursor = self.mongo.db.department.find({'parentid':ObjectId(parentid)})
        root = []
        for department in root_cursor:
            department['children'] = self._list_tree(department['_id'])
            department['members'] = self._list_user_departmentid(department['_id'])
            root.append(department)
        return root

    def _list_user_departmentid(self, departmentid):
        """ Listing users by group id array """
        return self.mongo.db.user.find(
            {
                "department.value":str(departmentid)
            },
            {
                "loginrecord":0
            })

    def list_ids(self, dids):
        """ Listing groups by department id array """
        return self.mongo.db.department.find(
            {
                "did":
                {
                    "$in":dids
                }
            })
