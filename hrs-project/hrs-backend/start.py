# coding=UTF-8

""" Launch Flask """
import sys
import os
import hrs

sys.path.append(os.path.split(os.path.realpath(__file__))[0])

if __name__ == '__main__':
    hrs.APP.run('0.0.0.0', debug=True, threaded=True)
else:
    application = hrs.APP
