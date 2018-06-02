# coding=UTF-8

""" Organization Router """
from flask import Blueprint
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from organization.service.permission import Permission as Permission_Service
PERMISSION = Blueprint('organization', __name__)
CORS(PERMISSION)
cross_origin(PERMISSION)

PERMISSION_SERVICE = Permission_Service(MONGO)

@PERMISSION.route('/list', methods=['GET', 'POST'])
@auth(MONGO)
def list():
    """
        List permission data
        params
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    data, code, message = PERMISSION_SERVICE.list()
    return __result(data, code, message)
