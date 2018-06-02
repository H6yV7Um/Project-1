""" Field Model Class"""
import datetime
from bson import ObjectId

class Field(object):
    """ Field Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def add_group(self, name):
        """ Add field group """
        index = self._get_max_group_index() + 1
        group_model = {
            '_id':ObjectId(),
            'name':name,
            'require':False,
            'fields':[],
            'index': index
        }
        self.mongo.db.userfield.insert_one(group_model)
        return group_model

    def update_group(self, _id, name):
        """ update  """
        return self.mongo.db.userfield.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'name':name
                }
            })

    def remove_group(self, _id):
        """ remove """
        model = self.mongo.db.userfield.find_one(
            {
                "_id": ObjectId(_id)
            })
        group_list = self.mongo.db.userfield.find({}).sort('index', -1)
        for group in group_list:
            if group['index'] > model['index']:
                group['index'] -= 1
                self.mongo.db.userfield.update(
                    {
                        "_id": group['_id']
                    },
                    {
                        "$set":
                        {
                            'index':group['index']
                        }
                    })

        return self.mongo.db.userfield.remove(
            {
                "_id": ObjectId(_id)
            })

    def sort_group(self, _id, old_index, new_index):
        """ resort group """
        group_list = self.mongo.db.userfield.find({}).sort('index', -1)
        groups = []
        old_index = int(old_index)
        new_index = int(new_index)
        if old_index > new_index:
            for group in group_list:
                if group['index'] >= new_index and group['index'] < old_index:
                    group['index'] += 1
                    groups.append(group)
                    continue
                elif group['index'] == old_index:
                    group['index'] = new_index
                    groups.append(group)
        elif new_index > old_index:
            for group in group_list:
                if group['index'] <= new_index and group['index'] > old_index:
                    group['index'] -= 1
                    groups.append(group)
                    continue
                elif group['index'] == old_index:
                    group['index'] = new_index
                    groups.append(group)
        for group in groups:
            self.mongo.db.userfield.update(
                {
                    "_id": group['_id']
                },
                {
                    "$set":
                    {
                        'index':group['index']
                    }
                })

    def _get_max_group_index(self):
        """ get max group index """
        cursor = self.mongo.db.userfield.find({}).sort('index', -1)
        model = []
        for group in cursor:
            model = group
            break
        if not model:
            return 0
        else:
            return model['index']

    def list_group(self):
        """ list group """
        return self.mongo.db.userfield.find().sort('index', 1)

    def add_field_input(self, groupid, name, namespace, require, modify, check, fill, regex, warning, unique, remark):
        """ add field of input """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'regex':regex,
                        'warning':warning,
                        'unique':bool(int(unique)),
                        'remark':remark,
                        'kernel':0,
                        'type':'input',
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def add_field_select(self, groupid, name, namespace, require, modify, check, fill, remark, options):
        """ add field of select """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'remark':remark,
                        'kernel':0,
                        'type':'select',
                        'options':options,
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def add_field_file(self, groupid, name, namespace, require, modify, check, fill, filetype, size, maximum, remark):
        """ add field of input """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'filetype':filetype,
                        'size':size,
                        'remark':remark,
                        'maximum':bool(int(maximum)),
                        'kernel':0,
                        'type':'file',
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def add_field_date(self, groupid, name, namespace, require, modify, check, fill, remark):
        """ add field of input """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'remark':remark,
                        'kernel':0,
                        'type':'date',
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def add_field_department(self, groupid, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly):
        """ add field of input """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'remark':remark,
                        'multiple':bool(int(multiple)),
                        'treeCheckStrictly':bool(int(treeCheckStrictly)),
                        'kernel':0,
                        'type':'department',
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def add_field_member(self, groupid, name, namespace, require, modify, check, fill, remark, multiple):
        """ add field of input """
        _id = ObjectId()
        self.mongo.db.userfield.update(
            {
                "_id":ObjectId(groupid)
            },
            {
                '$push':
                {
                    'fields':
                    {
                        '_id':_id,
                        'name':name,
                        'namespace':namespace,
                        'require':bool(int(require)),
                        'modify':bool(int(modify)),
                        'check':bool(int(check)),
                        'fill':bool(int(fill)),
                        'remark':remark,
                        'multiple':bool(int(multiple)),
                        'kernel':0,
                        'type':'member',
                        'index':self._get_max_field_index(groupid)+1
                    }
                }
            })
        return _id

    def update_field_input(self, fieldid, name, namespace, require, modify, check, fill, regex, warning, unique, remark):
        """ add field of input """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.unique':bool(int(unique)),
                    'fields.$.regex':regex,
                    'fields.$.warning':warning,
                    'fields.$.remark':remark
                }
            })

    def update_field_select(self, fieldid, name, namespace, require, modify, check, fill, remark, options):
        """ add field of select """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.remark':remark,
                    'fields.$.options':options
                }
            })

    def update_field_file(self, fieldid, name, namespace, require, modify,
                          check, fill, filetype, size, maximum, remark):
        """ add field of input """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.filetype':filetype,
                    'fields.$.size':size,
                    'fields.$.maximum':int(maximum),
                    'fields.$.remark':remark,
                }
            })

    def update_field_date(self, fieldid, name, namespace, require, modify, check, fill, remark):
        """ add field of input """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.remark':remark,
                }
            })

    def update_field_department(self, fieldid, name, namespace, require,
                                modify, check, fill, remark, multiple, treeCheckStrictly):
        """ add field of input """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.remark':remark,
                    'fields.$.multiple':int(multiple),
                    'fields.$.treeCheckStrictly':bool(int(treeCheckStrictly))
                }
            })

    def update_field_member(self, fieldid, name, namespace, require,
                            modify, check, fill, remark, multiple):
        """ add field of input """
        return self.mongo.db.userfield.update(
            {
                "fields._id":ObjectId(fieldid)
            },
            {
                '$set':
                {
                    'fields.$.name':name,
                    'fields.$.namespace':namespace,
                    'fields.$.require':bool(int(require)),
                    'fields.$.modify':bool(int(modify)),
                    'fields.$.check':bool(int(check)),
                    'fields.$.fill':bool(int(fill)),
                    'fields.$.remark':remark,
                    'fields.$.multiple':bool(int(multiple))
                }
            })

    def remove_field(self, fieldid):
        """ remove field """
        _id = ObjectId(fieldid)
        model = self.mongo.db.userfield.find_one({'fields._id':  _id})
        index = 0
        for field in model['fields']:
            if field['_id'] == _id:
                index = field['index']
                break
        for field in model['fields']:
            if field['index'] > index:
                field['index'] -= 1
                self.mongo.db.userfield.update(
                    {
                        "fields._id":field['_id']
                    },
                    {
                        '$set':
                        {
                            'fields.$.index':field['index']
                        }
                    })

        return self.mongo.db.userfield.update(
            {'fields._id':  _id},
            {
                '$pull':
                {
                    'fields':
                    {
                        '_id':_id
                    }
                }
            })

    def sort_field(self, _id, old_index, new_index):
        """ resort  """
        old_index = int(old_index)
        new_index = int(new_index)
        group = self.mongo.db.userfield.find_one({"fields._id":ObjectId(_id)})
        if old_index > new_index:
            for field in group['fields']:
                if field['index'] >= new_index and field['index'] < old_index:
                    field['index'] += 1
                    continue
                elif field['index'] == old_index:
                    field['index'] = new_index
        elif new_index > old_index:
            for field in group['fields']:
                if field['index'] <= new_index and field['index'] > old_index:
                    field['index'] -= 1
                    continue
                elif field['index'] == old_index:
                    field['index'] = new_index
        for field in group['fields']:
            self.mongo.db.userfield.update(
                {
                    "fields._id": field['_id']
                },
                {
                    '$set':
                    {
                        'fields.$.index': field['index']
                    }
                })

    def _get_max_field_index(self, groupid):
        """ get max field index """
        group = self.mongo.db.userfield.find_one({"_id":ObjectId(groupid)})
        if not group:
            return 0
        else:
            if not group['fields']:
                return 0
            else:
                index = 0
                for field in group['fields']:
                    if field['index'] > index:
                        index = field['index']
                return index

    def find(self, _id):
        """ find one custom field """
        _id = ObjectId(_id)
        model = self.mongo.db.userfield.find_one({"fields._id":_id})
        for field in model['fields']:
            if field['_id']==_id:
                return field
