""" score """
import datetime
from bson import ObjectId
class Score(object):
    """ score Class"""
    def __init__(self, mongo):
        self.mongo = mongo