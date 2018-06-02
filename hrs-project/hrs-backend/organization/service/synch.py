# -*- coding: UTF-8 -*-
""" Organization Synch Class """
import csv
import libs
import hashlib
import requests
import config
from dding import Dding
from bson import ObjectId
from organization.model.department import Department as department_model
from organization.model.user import User as user_model
from organization.service.user import User as user_service
from organization.model.file import File as file_model
class Synch(object):
    """ Organization Synch Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.department_model = department_model(self.mongo)
        self.user_model = user_model(self.mongo)
        self.dding = Dding(self.mongo)
        self.user_service = user_service(self.mongo)
        self.file_model = file_model(self.mongo)

    def synch(self):
        """ Launch Synch """
        result = self.dding.get_department()
        self._add(result['department'], 0, 0)
        return {}, 0, "success"

    def synch_leader(self):
        result = self.department_model.list_all()

        for department in result:
            detail = self.dding.get_department_detail(department['did'])
            user = self.user_model.find_user_id(detail['deptManagerUseridList'])
            self.mongo.db.department.update(
                    {
                        "did": department['did']
                    },
                    {
                        '$set':
                        {
                            'managers':[user['_id']]
                        }
                    })


    def _add(self, departments, parentid, parentdid):
        """ add department """
        for department in departments:
            exists = False
            if 'parentid' in department.keys():
                exists = True
            if not parentid and not exists:
                result = self.department_model.add(department['id'], department['name'], parentid)
                self._add(departments, result['_id'], result['did'])
            else:
                if exists:
                    if department['parentid'] == parentdid:
                        result = self.department_model.add(department['id'],
                                                           department['name'],
                                                           parentid)
                        self._add(departments, result['_id'], department['id'])

    def synch_user(self):
        """ import """
        with open('/Users/yangyunbo/Desktop/import.csv') as f:
            f_csv = csv.reader(f)
            headers = next(f_csv)
            for row in f_csv:
                data = {}
                graduationdate = ''
                regularizationdate = ''
                birthday = ''
                entrydate = ''
                if row[18]:
                    graduationdate = libs.str_to_utc(row[18], "%Y-%m-%d")
                if row[6]:
                    regularizationdate = libs.str_to_utc(row[6], "%Y-%m-%d")
                if row[10]:
                    birthday = libs.str_to_utc(row[10], "%Y-%m-%d")
                if row[7]:
                    entrydate = libs.str_to_utc(row[7], "%Y-%m-%d")

                if row[5] == '实习生':
                    data = {
                        "_id": ObjectId(),
                        "member_id": row[1],
                        "user_id": '',
                        'login_record':[],
                        'permission':[],
                        'group':0,
                        'status':'admitted',
                        'insurance': '',
                        'taxes': '',
                        'fund': '',
                        'salary': ObjectId('58ec7a20cf30a56388401be9'),
                        'salaries':[
                            {
                                "name": "基本薪资（日薪）",
                                "value": float(row[40]),
                                "salary_id": ObjectId("58f08453cf30a55d48a2f0c8")
                            }
                        ],
                        'firstworkdate':'',
                        'major':row[16],
                        'selfie':[],
                        'adminreport':[],
                        'hukouintro':[],
                        'universitytype':row[15],
                        'joblevel':row[28],
                        'education':row[17],
                        'bankcardnumber':row[35],
                        'jobseries':row[29],
                        'depositbank':row[34],
                        'placeofpermanent':row[12],
                        'backuptel':'',
                        'contactname':row[36],
                        'department':[],
                        'type':row[5],
                        'email':row[3],
                        'idcopyfront':[],
                        'graduationdate':graduationdate,
                        'relationship':row[37],
                        'workreport':[],
                        'position_level':row[31],
                        'regularizationdate':regularizationdate,
                        'birthday':birthday,
                        'address':row[13],
                        'certificatetype':row[8],
                        'name':row[0],
                        'salary_level':row[32],
                        'entrydate':entrydate,
                        'mobilephone':row[4],
                        'gender':row[2],
                        'university':row[14],
                        'academiccertificate':[],
                        'idnumber':row[9],
                        'contacttel':row[38],
                        'subordinate_companies':row[21],
                        'marriage':row[11],
                        'workplace':row[20],
                        'jobcategory':row[26],
                        'position':row[27],
                        'degreecertificate':[],
                        'employeemanual': True
                    }
                else:
                    taxesid = ""
                    if row[5] == '普通员工':
                        taxesid = "58ec797acf30a56388401be8"
                    else:
                        taxesid = "58ec800ccf30a56388401bee"

                    data = {
                        "_id": ObjectId(),
                        "member_id": row[1],
                        "user_id": '',
                        'login_record':[],
                        'permission':[],
                        'group':"0",
                        'status':'admitted',
                        'insurance': ObjectId('58edbcdfcf30a5a72b061903'),
                        'taxes': ObjectId(taxesid),
                        'fund': ObjectId('58ec7b56cf30a56388401bec'),
                        'salary': ObjectId('58f0843dcf30a55d48a2f0c6'),
                        'salaries':[
                            {
                                "name": "基本薪资",
                                "value": float(row[40]),
                                "salary_id": ObjectId("58f0843dcf30a55d48a2f0c2")
                            },
                            {
                                "name": "岗位薪资",
                                "value": float(row[41]),
                                "salary_id": ObjectId("58f0843dcf30a55d48a2f0c3")
                            }
                        ],
                        'firstworkdate':'',
                        'major':row[16],
                        'selfie':[],
                        'adminreport':[],
                        'hukouintro':[],
                        'universitytype':row[15],
                        'joblevel':row[28],
                        'education':row[17],
                        'bankcardnumber':row[35],
                        'jobseries':row[29],
                        'depositbank':row[34],
                        'placeofpermanent':row[12],
                        'backuptel':'',
                        'contactname':row[36],
                        'department':[],
                        'type':row[5],
                        'email':row[3],
                        'idcopyfront':[],
                        'graduationdate':graduationdate,
                        'relationship':row[37],
                        'workreport':[],
                        'position_level':row[31],
                        'regularizationdate':regularizationdate,
                        'birthday':birthday,
                        'address':row[13],
                        'certificatetype':row[8],
                        'name':row[0],
                        'salary_level':row[32],
                        'entrydate':entrydate,
                        'mobilephone':row[4],
                        'gender':row[2],
                        'university':row[14],
                        'academiccertificate':[],
                        'idnumber':row[9],
                        'contacttel':row[38],
                        'subordinate_companies':row[21],
                        'marriage':row[11],
                        'workplace':row[20],
                        'jobcategory':row[26],
                        'position':row[27],
                        'degreecertificate':[],
                        'employeemanual': True
                    }
                self.mongo.db.user.insert_one(data)


    def synch_dd(self):
        departments = self.department_model.list_all()
        for department in departments:
            users = self.dding.get_users_detail(department['did'])
            for user in users['userlist']:
                self.mongo.db.user.update(
                    {
                        "name": user['name']
                    },
                    {
                        '$set':
                        {
                            'user_id':user['userid']
                        }
                    })
                self.mongo.db.user.update(
                    {
                        "name": user['name']
                    },
                    {
                        '$push':
                        {
                            'department':
                            {
                                "value": str(department['_id']),
                                "label": department['name']
                            }
                        }
                    })

    def synch_report(self):
        with open('/Users/yangyunbo/Desktop/import.csv') as f:
            f_csv = csv.reader(f)
            headers = next(f_csv)
            for row in f_csv:
                if not row[30]:
                    continue
                adminreport_result = self.mongo.db.user.find_one({"name":row[30]})
                workreport_result = self.mongo.db.user.find_one({"name":row[33]})
                print row[0]
                print row[30]
                print row[33]
                print adminreport_result
                print workreport_result
                self.mongo.db.user.update(
                    {
                        "name": row[0]
                    },
                    {
                        '$set':
                        {
                            'adminreport':[str(adminreport_result['_id'])],
                            'workreport':[str(workreport_result['_id'])]
                        }
                    })
                    
    def synch_avatar(self):
        # users = self.user_model.list_all()
        # for user in users:
        #     result = self.dding.get_user_detail(user['user_id'])
        #     if "avatar" in result.keys():
        #         file_result = self._load(result['avatar'])
        #         if not file_result:
        #             continue
        #         self.mongo.db.user.update(
        #             {
        #                 "user_id": result['userid']
        #             },
        #             {
        #                 '$set':
        #                 {
        #                     'selfie':[]
        #                 }
        #             })
        #         self.mongo.db.user.update(
        #             {
        #                 "user_id": result['userid']
        #             },
        #             {
        #                 '$push':
        #                 {
        #                     'selfie':file_result['_id']
        #                 }
        #             })
        #     else:
        #         print result
        result = self.mongo.db.file.find()
        for file in result:
            self.mongo.db.file.update(
                {
                    "_id": file['_id']
                },
                {
                    '$set':
                    {
                        'filename':file['filename'].replace('attachment/','')
                    }
                })
    def _load(self, avatar):
        """ download database """
        filename = config.disk_path+"/attachment/"+hashlib.md5(avatar).hexdigest()
        try:
            read = requests.get(avatar, stream=True)
            database = open(filename, "wb")
            for chunk in read.iter_content(chunk_size=512):
                if chunk:
                    database.write(chunk)
            database.close()
            result = self.file_model.add(filename+".jpg", ".jpg", filename)
            return result
        except Exception, err:
            print err
            return ''
    # def _managers(self, did):
    #     """ Synch Managers in department """
    #     result = self.dding.get_department_detail(did)
    #     self.department_model.clear_manager(did)
    #     managers = []
    #     if result['deptManagerUseridList'] != '':
    #         managers = result['deptManagerUseridList'].split("|")
    #     self.department_model.update_managers(did, managers)

    # def _users(self, did):
    #     """ Synch Users """
    #     result = self.dding.get_users_detail(did)
    #     for user in result['userlist']:
    #         if self.user_model.exists(user['userid']):
    #             self.user_model.update(user['userid'], user['name'], user['position'],
    #                                    user['active'], user['department'], user['avatar'],
    #                                    user['mobile'], user['email'])
    #         else:
    #             self.user_model.add(user['userid'], user['name'], user['position'],
    #                                 user['active'], user['department'],
    #                                 user['avatar'], user['mobile'], user['email'])
    #             self.user_service.update_group(user['userid'], "0")
