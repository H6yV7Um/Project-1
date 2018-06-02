# coding=UTF-8

""" Attendance Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from attendance.service.machine import Machine as Machine_Service

MACHINE = Blueprint('machine', __name__)
CORS(MACHINE)
cross_origin(MACHINE)

@MACHINE.route('/add', methods=['GET', 'POST'])
def add():
    """
        add machine
        param serial_number, ip_address, location
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    machine_service = Machine_Service(MONGO)
    serial_number = request.form['serial_number']
    ip_address = request.form['ip_address']
    location = request.form['location']
    data, code, message = machine_service.add(serial_number, ip_address, location)
    return __result(data, code, message)

@MACHINE.route('/update', methods=['GET', 'POST'])
def update():
    """
        update machine
        param _id, serial_number, ip_address, location
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    machine_service = Machine_Service(MONGO)
    _id = request.form['_id']
    serial_number = request.form['serial_number']
    ip_address = request.form['ip_address']
    location = request.form['location']
    data, code, message = machine_service.update(_id, serial_number, ip_address, location)
    return __result(data, code, message)

@MACHINE.route('/list', methods=['GET', 'POST'])
def list():
    """
        list machine
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    machine_service = Machine_Service(MONGO)
    data, code, message = machine_service.list_machines()
    return __result(data, code, message)

@MACHINE.route('/remove', methods=['GET', 'POST'])
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
    machine_service = Machine_Service(MONGO)
    data, code, message = machine_service.remove(_id)
    return __result(data, code, message)
