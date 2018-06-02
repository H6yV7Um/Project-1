# coding=UTF-8

""" DingDing Router """
from flask import Blueprint
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from dding.service import Service as Dding_Service

DDING = Blueprint('dding', __name__)
CORS(DDING)
cross_origin(DDING)

@DDING.route('/get_signature')
def get_signature():
    """
        Get JSAPI Signature From DingDing
        return {
                    "data":[
                    {"signatue":hashlib.sha1(str_sign).hexdigest(),
                      "url": sign["url"],
                      "noncestr":sign["noncestr"],
                      "timestamp":sign["timestamp"]}
                ], "status":{"code":0, "message":"success"}}
    """
    ddservice = Dding_Service(MONGO)
    data, code, message = ddservice.get_jsapi_signature()
    return __result(data, code, message)
    