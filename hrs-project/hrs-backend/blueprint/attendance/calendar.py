# coding=UTF-8

""" Attendance Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from attendance.service.calendar import Calendar as Calendar_Service

CALENDAR = Blueprint('calendar', __name__)
CORS(CALENDAR)
cross_origin(CALENDAR)

@CALENDAR.route('/add', methods=['GET', 'POST'])
def add():
    """
        add calendar
        param date, vacation, title, remark, attendance_time, closing_time
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    calendar_service = Calendar_Service(MONGO)
    date = request.form['date']
    vacation = request.form['vacation']
    title = request.form['title']
    remark = request.form['remark']
    attendance_time = request.form['attendance_time']
    closing_time = request.form['closing_time']
    data, code, message = calendar_service.add(date, vacation, title,
                                               remark, attendance_time, closing_time)
    return __result(data, code, message)

@CALENDAR.route('/update', methods=['GET', 'POST'])
def update():
    """
        update calendar
        param _id, date, vacation, title, remark, attendance_time, closing_time
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    calendar_service = Calendar_Service(MONGO)
    _id = request.form['_id']
    date = request.form['date']
    vacation = request.form['vacation']
    title = request.form['title']
    remark = request.form['remark']
    attendance_time = request.form['attendance_time']
    closing_time = request.form['closing_time']

    data, code, message = calendar_service.update(_id, date, vacation, title,
                                                  remark, attendance_time, closing_time)
    return __result(data, code, message)

@CALENDAR.route('/list', methods=['GET', 'POST'])
def list():
    """
        list calendar
        param start_time, end_time
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    start_time = request.form['start_time']
    end_time = request.form['end_time']
    calendar_service = Calendar_Service(MONGO)
    data, code, message = calendar_service.list(start_time, end_time)
    return __result(data, code, message)

@CALENDAR.route('/remove', methods=['GET', 'POST'])
def remove():
    """
        remove calendar
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":"success"}}
    """
    _id = request.form['_id']
    calendar_service = Calendar_Service(MONGO)
    data, code, message = calendar_service.remove(_id)
    return __result(data, code, message)
