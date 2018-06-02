# coding=UTF-8

""" File Router """
import os
import mimetypes
from flask import Blueprint, request, send_file
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from config import disk_path
from organization.service.file import File as File_Service

FILE = Blueprint('file', __name__)
CORS(FILE)
cross_origin(FILE)

FILE_SERVICE = File_Service(MONGO)

@FILE.route('/upload', methods=['GET', 'POST'])
@auth(MONGO)
@cross_origin()
def upload():
    """
        upload file
        params _id
        code 1 Invalid file type,
        code 2 Exceed maximum file size,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    files = request.files
    data, code, message = FILE_SERVICE.upload(files, _id)
    return __result(data, code, message)

@FILE.route('/remove', methods=['GET', 'POST'])
@auth(MONGO)
def remove():
    """
        remove file
        params _id
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    _id = request.form['_id']
    data, code, message = FILE_SERVICE.remove(_id)
    return __result(data, code, message)

@FILE.route('/download/<_id>', methods=['GET', 'POST'])
def download(_id):
    """
        Download file
        params _id
    """
    file_model, code, message = FILE_SERVICE.download(_id)
    root_dir = disk_path
    filename = file_model['filename']
    path = file_model['path']
    path = os.path.join(root_dir, path)
    filetype = file_model['filetype']
    mimetype = mimetypes.guess_type(filetype)[0]
    return send_file(path,
                     attachment_filename=filename.encode('utf8'),
                     as_attachment=True,
                     mimetype=mimetype)
