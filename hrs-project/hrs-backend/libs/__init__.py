# coding=UTF-8
""" Common Function """
from datetime import datetime, timedelta
from tzlocal import get_localzone
from pytz import timezone
from functools import wraps
from flask import Response, make_response, request
from bson.json_util import dumps
from organization.model.user import User as user_model
from config import environment
def __result(data, code, message):
    """ Response Data """
    result = {"data":data, "status":{"code":code, "message":message}}
    response = make_response(dumps(result))
    response.mimetype = 'application/json'
    if environment == 'devlopment':
        response.headers['Access-Control-ALLOW-Credentials'] = 'true'
    return response

def __result_cookie(data, code, message, key, value, expires, httponly):
    """ Response Data """
    result = {"data":[data], "status":{"code":code, "message":message}}
    response = make_response(dumps(result))
    response.mimetype = 'application/json'
    response.set_cookie(key, value, expires=expires, httponly=httponly)
    if environment == 'devlopment':
        response.headers['Access-Control-ALLOW-Credentials'] = 'true'
    return response

def auth(mongo):
    """ Authority check decorator"""
    def _auth(func):
        """ Authority check decorator"""
        @wraps(func)
        def __auth(*args, **kwargs):
            """ wrapper """
            token = request.cookies.get('token')
            _user_model = user_model(mongo)
            # if _user_model.verify(token):
            return func(*args, **kwargs)
            # else:
                # return __result({}, -1, 'invalid token')
        return __auth
    return _auth

def str_to_utc(str_time, date_format):
    """ str to datetime of utc """
    local_zone = get_localzone()
    result = datetime.strptime(str_time, date_format)
    result = local_zone.localize(result)
    return result.astimezone(timezone('UTC'))

def utc_to_local(utc_time):
    """ utc to local """
    return utc_time.astimezone(get_localzone())
