# coding=UTF-8

""" Attendance Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from attendance.service.cycle import Cycle as Cycle_Service

CYCLE = Blueprint('cycle', __name__)
CORS(CYCLE)
cross_origin(CYCLE)

@CYCLE.route('/add', methods=['GET', 'POST'])
def add():
    """
        add cycle
        param start_time, end_time, lunch_start_time, lunch_end_time,
              overtime_start_time
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    cycle_service = Cycle_Service(MONGO)
    start_time = request.form['start_time']
    end_time = request.form['end_time']
    lunch_start_time = request.form['lunch_start_time']
    lunch_end_time = request.form['lunch_end_time']
    overtime_start_time = request.form['overtime_start_time']
    data, code, message = cycle_service.add(start_time, end_time, lunch_start_time, lunch_end_time,
                                            overtime_start_time)
    return __result(data, code, message)

@CYCLE.route('/update', methods=['GET', 'POST'])
def update():
    """
        update cycle
        param _id, start_time, end_time, lunch_start_time, lunch_end_time,
              overtime_start_time
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    cycle_service = Cycle_Service(MONGO)
    _id = request.form['_id']
    start_time = request.form['start_time']
    end_time = request.form['end_time']
    lunch_start_time = request.form['lunch_start_time']
    lunch_end_time = request.form['lunch_end_time']
    overtime_start_time = request.form['overtime_start_time']

    data, code, message = cycle_service.update(_id, start_time, end_time, lunch_start_time,
                                               lunch_end_time, overtime_start_time)
    return __result(data, code, message)

@CYCLE.route('/list', methods=['GET', 'POST'])
def list():
    """
        list cycle
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    cycle_service = Cycle_Service(MONGO)
    data, code, message = cycle_service.list()
    return __result(data, code, message)

@CYCLE.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        remove machine
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    cycle_service = Cycle_Service(MONGO)
    data, code, message = cycle_service.remove(_id)
    return __result(data, code, message)
