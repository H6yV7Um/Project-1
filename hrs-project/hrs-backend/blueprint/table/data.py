# coding=UTF-8

""" DingDing Router """
import json
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result
from mongo import MONGO
from table.service.data import Data as Data_Service

DATA = Blueprint('data', __name__)
CORS(DATA)
cross_origin(DATA)

@DATA.route('/', methods=['GET', 'POST'])
def get():
    Data_service = Data_Service(MONGO)
    data, code, message = Data_service.get()
    return __result(data, code, message)

