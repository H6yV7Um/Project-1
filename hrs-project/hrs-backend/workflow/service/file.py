""" File Service Class"""
import os
import hashlib
import datetime
from config import disk_path
from workflow.model.file import File as file_model
from workflow.model.solution import Solution as solution_model

class File(object):
    """ File Service Class"""
    def __init__(self, mongo):
        self.mongo = mongo
        self.file_model = file_model(self.mongo)
        self.solution_model = solution_model(self.mongo)
        self.upload_folder = "attachment"

    def download(self, _id):
        """ download file """
        return self.file_model.find(_id), 0, ''

    def remove(self, _id):
        """ remove file """
        result = self.file_model.find(_id)
        if result:
            path = disk_path + "/" + result['path']
            if os.path.exists(path):
                os.remove(path)
                self.file_model.remove(_id)
        return {}, 0, ''

    def upload(self, files, solution_id, namespace):
        """ upload file """
        file_list = []
        solution = self.solution_model.find(solution_id)
        files = files.getlist(namespace)
        field = {}
        for f in solution['fields']:
            if f['namespace'] == namespace:
                field = f

        for _file in files:
            if not self.allowed(_file.filename, field['filetype']):
                return {}, 1, ''

        for _file in files:
            filetype = _file.filename.rsplit('.', 1)[1]
            now = datetime.datetime.now()
            oldfilename = _file.filename
            filename = oldfilename.encode('utf8')+now.strftime('%Y-%m-%d %H-%M-%S')
            filename = hashlib.md5(filename).hexdigest()
            filename = self.upload_folder+'/'+filename
            _file.save(os.path.join(disk_path, filename))
            result = self.file_model.add(oldfilename, filetype, filename)
            file_list.append(result['_id'])
        return file_list, 0, ''

    def upload_image(self, files):
        """ upload file """
        file_list = []
        files = files.getlist('picture')
        for _file in files:
            if not self.allowed(_file.filename, 'picture'):
                return {}, 1, ''
        for _file in files:
            filetype = _file.filename.rsplit('.', 1)[1]
            now = datetime.datetime.now()
            oldfilename = _file.filename
            filename = oldfilename.encode('utf8')+now.strftime('%Y-%m-%d %H-%M-%S')
            filename = hashlib.md5(filename).hexdigest()
            filename = self.upload_folder+'/'+filename
            _file.save(os.path.join(disk_path, filename))
            result = self.file_model.add(oldfilename, filetype, filename)
            file_list.append(result['_id'])
        return file_list, 0, ''

    def upload_file(self, files):
        """ upload file """
        file_list = []
        files = files.getlist('file')
        for _file in files:
            if not self.allowed(_file.filename, 'doc') and not self.allowed(_file.filename, 'zip'):
                return {}, 1, ''
        for _file in files:
            filetype = _file.filename.rsplit('.', 1)[1]
            now = datetime.datetime.now()
            oldfilename = _file.filename
            filename = oldfilename.encode('utf8')+now.strftime('%Y-%m-%d %H-%M-%S')
            filename = hashlib.md5(filename).hexdigest()
            filename = self.upload_folder+'/'+filename
            _file.save(os.path.join(disk_path, filename))
            result = self.file_model.add(oldfilename, filetype, filename)
            file_list.append(result['_id'])
        return file_list, 0, ''

    def allowed(self, filename, filetype):
        """ check file ext """
        filename = filename.lower()
        image_ext = ['jpg', 'png', 'gif', 'jpeg']
        doc_ext = ['key', 'pptx', 'ppt', 'pages', 'docx', 'doc', 'pdf', 'xls', 'xlsx']
        archive_ext = ['zip', 'rar']

        if filetype == 'picture':
            return '.' in filename and filename.rsplit('.', 1)[1] in image_ext
        elif filetype == 'doc':
            return '.' in filename and filename.rsplit('.', 1)[1] in doc_ext
        else:
            return '.' in filename and filename.rsplit('.', 1)[1] in archive_ext
