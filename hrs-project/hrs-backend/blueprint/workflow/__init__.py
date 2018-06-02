# coding=UTF-8

""" Workflow Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from workflow.service import Workflow as Workflow_Service

WORKFLOW = Blueprint('workflow', __name__)
CORS(WORKFLOW)
cross_origin(WORKFLOW)

@WORKFLOW.route('/add', methods=['GET', 'POST'])
def add():
    """
        add workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    solution_id = request.form['solution_id']
    fields = json.loads(request.form['fields'])
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.add(solution_id, fields)
    return __result(data, code, message)

@WORKFLOW.route('/cancel', methods=['GET', 'POST'])
def cancel():
    """
        cancel workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.cancel(_id)
    return __result(data, code, message)

@WORKFLOW.route('/find_own_workflow', methods=['GET', 'POST'])
def find_own_workflow():
    """
        find_own_workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    status = request.form['status']
    pagination = int(request.form['p'])
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.find_own_workflow(status, pagination)
    return __result(data, code, message)

@WORKFLOW.route('/find_own_pending_workflow', methods=['GET', 'POST'])
def find_own_pending_workflow():
    """
        find_own_pending_workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    pagination = int(request.form['p'])
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.find_own_pending_workflow(pagination)
    return __result(data, code, message)

@WORKFLOW.route('/find_own_done_workflow', methods=['GET', 'POST'])
def find_own_done_workflow():
    """
        find_own_done_workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    pagination = int(request.form['p'])
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.find_own_done_workflow(pagination)
    return __result(data, code, message)
@WORKFLOW.route('/find_own_copyto_workflow', methods=['GET', 'POST'])
def find_own_copyto_workflow():
    """
        find_own_copyto_workflow
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    pagination = int(request.form['p'])
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.find_own_copyto_workflow(pagination)
    return __result(data, code, message)

@WORKFLOW.route('/audit', methods=['GET', 'POST'])
def audit():
    """
        audit
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    status = bool(int(request.form['status']))
    content = request.form['content']
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.audit(_id, status, content)
    return __result(data, code, message)

@WORKFLOW.route('/comment', methods=['GET', 'POST'])
def comment():
    """
        comment
        return {"data":[]
                , "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    picture = json.loads(request.form['picture'])
    attachment = json.loads(request.form['attachment'])
    content = request.form['content']
    workflow_service = Workflow_Service(MONGO)
    data, code, message = workflow_service.comment(_id, content, picture, attachment)
    return __result(data, code, message)
