""" User Model Class"""
import re
import datetime
import hashlib
from bson import ObjectId

class User(object):
    """ User Model Class """
    def __init__(self, mongo):
        self.mongo = mongo

    def _get_member_id(self):
        """ generate member id """
        result = self.mongo.db.member_id.find_and_modify({}, {"$inc": {"id": 1}}, upsert=True)
        member_id = result['id']+1
        zero = ""
        i = 0
        while i < (5-len(str(member_id))):
            i += 1
            zero += "0"
        return str(datetime.datetime.now().year) + zero + str(member_id)

    def add(self, custom_field, status, insurance, taxes, fund, salary, salaries):
        """ Add one user """
        for item in salaries:
            item['salary_id'] = ObjectId(item['salary_id']['$oid'])

        insurance_data = {"insurance": ""}
        fund_data = {"fund": ""}
        if insurance:
            insurance_data = {"insurance": ObjectId(insurance)}
        if fund:
            fund_data = {"fund": ObjectId(fund)}
        data = {
            "_id": ObjectId(),
            "member_id": self._get_member_id(),
            "user_id": '',
            'login_record':[],
            'permission':[],
            'group':0,
            'status':status,
            'insurance': insurance_data,
            'taxes': ObjectId(taxes),
            'fund': fund_data,
            'salary': ObjectId(salary),
            'salaries':salaries
        }
        data = dict(data.items() + custom_field.items())
        self.mongo.db.user.insert_one(data)
        return data

    def completed(self, _id, status, custom_field):
        """ completed user information """
        status = {"status": status}
        data = dict(status.items() + custom_field.items())
        self.mongo.db.user.update({"_id":ObjectId(_id)}, {"$set": data})

    def update(self, _id, custom_field, insurance, taxes, fund, salary, salaries):
        """ update user information """
        for item in salaries:
            item['salary_id'] = ObjectId(item['salary_id']['$oid'])

        insurance_data = {"insurance": ""}
        fund_data = {"fund": ""}
        if insurance:
            insurance_data = {"insurance": ObjectId(insurance)}
        if fund:
            fund_data = {"fund": ObjectId(fund)}

        taxes_data = {"taxes": ObjectId(taxes)}

        salary_data = {"salary": ObjectId(salary)}
        salaries_data = {"salaries": salaries}
        data = dict(custom_field.items() +
                    salaries_data.items() +
                    insurance_data.items() +
                    taxes_data.items() +
                    fund_data.items() +
                    salary_data.items())
        self.mongo.db.user.update({"_id":ObjectId(_id)}, {"$set": data})

    def exists_user_id(self, user_id):
        """ Confirm the user is exist """
        return self.mongo.db.user.count(
            {
                "user_id":user_id
            }
        )
    def exists_id(self, _id):
        """ Confirm the user is exist """
        return self.mongo.db.user.count(
            {
                "_id":ObjectId(_id)
            }
        )

    def exists_mobilephone(self, mobilephone):
        """ Confirm the mobilephone is exist """
        return self.mongo.db.user.count(
            {
                "mobilephone":mobilephone
            }
        )

    def exists_email(self, email):
        """ Confirm the email is exist """
        return self.mongo.db.user.count(
            {
                "email":email
            }
        )

    def exists_custom_field(self, field, value):
        """ Confirm the custom field is exist """
        return self.mongo.db.user.count(
            {
                field: value
            }
        )

    def find_user_id(self, user_id):
        """ Find one user by dingding id """
        return self.mongo.db.user.find_one(
            {
                "user_id":user_id
            }
            ,
            {
                "login_record":0
            })

    def find_id(self, _id):
        """ Find one user by id """
        return self.mongo.db.user.find_one(
            {
                "_id": ObjectId(_id)
            }
            ,
            {
                "login_record":0
            })

    def list_user(self, condition, fields, limit, pagination):
        """ list users """
        pagination = pagination - 1
        return self.mongo.db.user.find(condition, fields).limit(limit).skip(pagination*limit)

    def count_user(self, condition):
        """ count users """
        return self.mongo.db.user.count(condition)

    def list_ids(self, _ids):
        """ Listing users by ids array """
        return self.mongo.db.user.find(
            {
                "_id":
                {
                    "$in":_ids
                }
            },
            {
                "login_record":0
            })

    def list_department_ids(self, department_ids):
        """ Listing users by group id array """
        return self.mongo.db.user.find(
            {
                "department_id": department_ids
            },
            {
                "login_record":0
            })

    def list_all(self):
        """ List all users """
        return self.mongo.db.user.find(
            {
            },
            {
                "login_record":0
            })

    def list_name(self, keywords):
        """ list names by keywords """
        return self.mongo.db.user.find(
            {
                "name":re.compile(keywords)
            },
            {
                "name":1
            })

    def find_user_token(self, token):
        """ Find one user by token """
        now = datetime.datetime.utcnow()
        return self.mongo.db.user.find_one(
            {
                "login_record.token":token,
                "login_record.expiretime":
                {
                    "$gt":now
                }
            },
            {
                "login_record":0
            })

    def authorized_user_id(self, user_id):
        """ Authorized user by user id """
        now = datetime.datetime.utcnow()
        expiretime = now + datetime.timedelta(days=7)
        token = hashlib.md5(user_id+now.strftime('%Y-%m-%d %H-%M-%S')).hexdigest()
        self.mongo.db.user.update(
            {
                "login_record.expiretime":
                {
                    "$lt":now
                }
            },
            {
                "$pull":
                {
                    "login_record":
                    {
                        "expiretime":
                        {
                            "$lt":now
                        }
                    }
                }
            }
        )
        self.mongo.db.user.update(
            {
                "user_id":user_id
            },
            {
                '$push':
                {
                    'login_record':
                    {
                        'token':token,
                        'expiretime':expiretime,
                    }
                }
            })
        return token

    def authorized_email(self, email):
        """ Authorized user by user id """
        now = datetime.datetime.utcnow()
        expiretime = now + datetime.timedelta(days=7)
        token = hashlib.md5(email+now.strftime('%Y-%m-%d %H-%M-%S')).hexdigest()
        self.mongo.db.user.update(
            {
                "login_record.expiretime":
                {
                    "$lt":now
                }
            },
            {
                "$pull":
                {
                    "login_record":
                    {
                        "expiretime":
                        {
                            "$lt":now
                        }
                    }
                }
            }
        )
        self.mongo.db.user.update(
            {
                "email": email
            },
            {
                '$push':
                {
                    'login_record':
                    {
                        'token':token,
                        'expiretime':expiretime,
                    }
                }
            })
        return token

    def verify(self, token):
        """ Verify the token """
        now = datetime.datetime.utcnow()
        param = {
            'login_record.token':token,
            'login_record.expiretime':{'$gt':now},
        }
        result = self.mongo.db.user.count(param)
        return result

    def update_group(self, _id, group):
        """ Update group """
        return self.mongo.db.user.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'group':group
                }
            })

    def clear_permission(self, _id):
        """ Clear user permission """
        return self.mongo.db.user.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'permission':[]
                }
            })

    def update_permission(self, _id, permission):
        """ Update user permission """
        return self.mongo.db.user.update(
            {
                "_id": ObjectId(_id)
            },
            {
                "$set":
                {
                    'permission':permission
                }
            })
