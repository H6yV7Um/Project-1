# coding=UTF-8

""" File Router """
import os
import mimetypes
from flask import Blueprint, request, send_file
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from config import disk_path
from workflow.service.file import File as File_Service

WORKFLOW_FILE = Blueprint('workflowfile', __name__)
CORS(WORKFLOW_FILE)
cross_origin(WORKFLOW_FILE)
FILE_SERVICE = File_Service(MONGO)

@WORKFLOW_FILE.route('/upload', methods=['GET', 'POST'])
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
    _id = request.form['solution_id']
    namespace = request.form['namespace']
    files = request.files
    data, code, message = FILE_SERVICE.upload(files, _id, namespace)
    return __result(data, code, message)

@WORKFLOW_FILE.route('/upload_image', methods=['GET', 'POST'])
@auth(MONGO)
@cross_origin()
def upload_image():
    """
        upload image
        params _id
        code 1 Invalid file type,
        code 2 Exceed maximum file size,
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    files = request.files
    data, code, message = FILE_SERVICE.upload_image(files)
    return __result(data, code, message)

@WORKFLOW_FILE.route('/upload_file', methods=['GET', 'POST'])
@auth(MONGO)
@cross_origin()
def upload_file():
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
    files = request.files
    data, code, message = FILE_SERVICE.upload_file(files)
    return __result(data, code, message)

@WORKFLOW_FILE.route('/remove', methods=['GET', 'POST'])
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

@WORKFLOW_FILE.route('/download/<_id>', methods=['GET', 'POST'])
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
