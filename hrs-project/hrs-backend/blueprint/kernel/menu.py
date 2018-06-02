# coding=UTF-8

""" Kernel Module Router """
from flask import Blueprint, request
from flask_cors import CORS, cross_origin
from libs import __result, auth
from mongo import MONGO
from kernel.service.menu import Menu as Menu_Service

MENU = Blueprint('menu', __name__)
CORS(MENU)
cross_origin(MENU)

@MENU.route('/add', methods=['GET', 'POST'])
@auth(MONGO)
def menu_add():
    """
        Add menu
        params moduleid, name, icon
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 icon cannot be empty.
        	 3 module doesn't exists.
    """
    moduleid = request.form['moduleid']
    name = request.form['name']
    icon = request.form['icon']
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.add(moduleid, name, icon)
    return __result(data, code, message)

@MENU.route('/update', methods=['GET', 'POST'])
@auth(MONGO)
def menu_update():
    """
        Update menu
        params mid, name, icon
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 icon cannot be empty.
    """
    mid = request.form['mid']
    name = request.form['name']
    icon = request.form['icon']
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.update(mid, name, icon)
    return __result(data, code, message)

@MENU.route('/delete', methods=['GET', 'POST'])
@auth(MONGO)
def menu_delete():
    """
        Delete menu
        params mid
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    mid = request.form['mid']
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.delete(mid)
    return __result(data, code, message)

@MENU.route('/list_all', methods=['GET', 'POST'])
@auth(MONGO)
def menu_list_all():
    """
        List all of menu

        return {
                    "data":[
                    {
	                    'moduleid':moduleid,
		                'name':name,
		                'icon':icon,
		                'sub':[
		                {
							'moduleid':moduleid,
			                'name':name,
			                'icon':icon,
			                'url':''
		                }
		                ]
	                }
                ], "status":{"code":0, "message":""}}
    """
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.list_all()
    return __result(data, code, message)
    
@MENU.route('/add_sub', methods=['GET', 'POST'])
@auth(MONGO)
def menu_add_sub():
    """
        Add sub menu
        params parentid, name, url, icon, permission
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 icon cannot be empty.
        	 3 url cannot be empty.
    """
    parentid = request.form['parentid']
    name = request.form['name']
    url = request.form['url']
    icon = request.form['icon']
    permission = request.form['permission']
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.add_sub(parentid, name, url, icon, permission)
    return __result(data, code, message)

@MENU.route('/update_sub', methods=['GET', 'POST'])
@auth(MONGO)
def menu_update_sub():
    """
        Update sub menu
        params sid, name, url, icon, permission
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
        code 1 name cannot be empty.
        	 2 icon cannot be empty.
        	 3 url cannot be empty.
    """
    sid = request.form['sid']
    name = request.form['name']
    url = request.form['url']
    icon = request.form['icon']
    permission = request.form['permission']

    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.update_sub(sid, name, url, icon, permission)
    return __result(data, code, message)

@MENU.route('/delete_sub', methods=['GET', 'POST'])
@auth(MONGO)
def menu_delete_sub():
    """
        Delete sub menu
        params sid
        return {
                    "data":[
                    {}
                ], "status":{"code":0, "message":""}}
    """
    sid = request.form['sid']
    menuservice = Menu_Service(MONGO)
    data, code, message = menuservice.delete_sub(sid)
    return __result(data, code, message)
