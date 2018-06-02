""" Workflow Model Class"""
import datetime
from bson import ObjectId
from flask import request
from workflow.model.solution import Solution as solution_model
from organization.model.user import User as user_model
class Workflow(object):
    """ Workflow Model Class """
    def __init__(self, mongo):
        self.mongo = mongo
        self.user_model = user_model(self.mongo)
        self.solution_model = solution_model(self.mongo)

    def add(self, solution_id, value, member, creator):
        """ Add workflow """
        solution_model = self.solution_model.find(solution_id)
        now = datetime.datetime.utcnow()
        workflow_model = {
            '_id':ObjectId(),
            'solution_id':ObjectId(solution_id),
            'solution_name':solution_model['name'],
            'solution_copyto':solution_model['copyto'],
            'value':value,
            'member': member,
            'flow': solution_model['flow'],
            'fields': solution_model['fields'],
            'operation_log':[],
            'comment':[],
            'creator': ObjectId(creator),
            'next': ObjectId(member[0]),
            'creation_time': now,
            'end_time': now,
            'status':0 #0 processing, 1 done, 2 reject, 3 cancel
        }
        self.mongo.db.workflow.insert_one(workflow_model)
        return workflow_model

    def cancel(self, _id):
        now = datetime.datetime.utcnow()
        token = request.cookies.get('token')
        operator = self.user_model.find_user_token(token)
        self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$set":{'status':3, 'end_time':now}})
        self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$push":{"operation_log":{
                "operator":operator['_id'],
                "operate_time":now,
                "type":'cancel'
            }}})
        return self.mongo.db.workflow.find({"_id":ObjectId(_id)})
    
    def comment(self, _id, content, picture, attachment):
        now = datetime.datetime.utcnow()
        token = request.cookies.get('token')
        operator = self.user_model.find_user_token(token)
        self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$push":{"operation_log":{
                "operator":operator['_id'],
                "operate_time":now,
                "content":content,
                "picture":picture,
                "attachment":attachment,
                "type":'comment'
            }}})
        return self.mongo.db.workflow.find_one({"_id":ObjectId(_id)})

    def audit(self, _id, status, content):
        now = datetime.datetime.utcnow()
        token = request.cookies.get('token')
        operator = self.user_model.find_user_token(token)
        workflow_model = self.mongo.db.workflow.find_one({"_id":ObjectId(_id)})
        if workflow_model['next'] == operator['_id']:
            self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$push":{"operation_log":{
                "operator":operator['_id'],
                "operate_time":now,
                "content":content,
                "status":status,
                "type":'audit'
            }}})
            if not status:
                self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$set":{"status":2, "end_time":now}})
            else:
                for index in range(len(workflow_model['member'])):
                    if workflow_model['member'][index] == str(operator['_id']):
                        if (index+1) >= len(workflow_model['member']):
                            self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$set":{"status":1, "end_time":now}})
                        else:
                            self.mongo.db.workflow.update({"_id":ObjectId(_id)},{"$set":{"end_time":now, "next": ObjectId(workflow_model['member'][index+1])}})
                        break
        return self.mongo.db.workflow.find_one({"_id":ObjectId(_id)})

    def find_own_workflow(self, status, limit, pagination):
        pagination = pagination - 1
        token = request.cookies.get('token')
        creator = self.user_model.find_user_token(token)
        return self.mongo.db.workflow.find({"status": int(status), "creator": creator['_id']}).limit(limit).skip(pagination*limit), self.mongo.db.workflow.count({"status": int(status), "creator": creator['_id']})

    def find_own_pending_workflow(self, limit, pagination):
        pagination = pagination - 1
        token = request.cookies.get('token')
        next_user = self.user_model.find_user_token(token)
        return self.mongo.db.workflow.find({"status": 0, "next": next_user['_id']}).limit(limit).skip(pagination*limit), self.mongo.db.workflow.count({"status": 0, "next": next_user['_id']})

    def find_own_done_workflow(self, limit, pagination):
        pagination = pagination - 1
        token = request.cookies.get('token')
        current_user = self.user_model.find_user_token(token)
        return self.mongo.db.workflow.find({"operation_log.operator": current_user['_id']}).limit(limit).skip(pagination*limit), self.mongo.db.workflow.count({"operation_log.operator": current_user['_id']})

    def find_own_copyto_workflow(self, limit, pagination):
        pagination = pagination - 1
        token = request.cookies.get('token')
        current_user = self.user_model.find_user_token(token)
        return self.mongo.db.workflow.find({"solution_copyto": str(current_user['_id'])}).limit(limit).skip(pagination*limit), self.mongo.db.workflow.count({"solution_copyto.$": current_user['_id']})
