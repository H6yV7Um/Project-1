#coding=utf-8

import os
import time
import requests
from pyquery import PyQuery as pq
import urllib.request
import re
import hashlib

t = time.strftime("%Y%m%d-%H:%M:%S")
BASE_URL = "https://www.feixiaohao.com"

# 获取所有token的页面
def getCurrenciesPage(directory):
	PATH = "currencies"
	for page in range(1, 20):
		filename = "list_%d.html" % (page)
		# url = "%s/%s" % (BASE_URL, filename)
		url = "{0}/{1}".format(BASE_URL, filename)
		_dir = '{0}/{1}'.format(directory, PATH)
		
		getAndSavePage(url, _dir, filename)


# 存储页面
def getAndSavePage(url, directory, filename):
	print(directory, "Get ->", url)
	data = requests.get(url).text
	
	if not os.path.exists(directory):
	    os.makedirs(directory)
	
	filepath = "%s/%s" % (directory, filename)
	print(time.strftime("%Y%m%d-%H:%M:%S"), filename, len(data))
	file = open(filepath, "w")
	# file.write(data.encode('ascii', 'ignore').decode('ascii'))
	file.write(data.encode('utf8', 'ignore').decode('utf8'))
	 
	file.close() 


# 获取页面的公共方法
def tokenPagesAction(directory, handler):
	for page in range(1, 20):
		file = open("%s/currencies/list_%d.html" % (directory, page), "r")
		data = file.read()
		file.close()

		d = pq(data)
		trList = d('.maintable tr')
		for tr in trList:
			handler(directory, page, tr)

# 获取市场详情，以及市场子页的详情
def getMarketDetailsPage(directory, page, tableRow):
	tokenFullName = pq(tableRow).attr('id')
	PATH = "coinmarket"
	url = '%s/%s/%s' % (BASE_URL, PATH, tokenFullName)
	_dir = "%s/%s/list_%d" % (directory, PATH, page)
	filename = "%s-p1.html" % (tokenFullName)
	getAndSavePage(url, _dir, filename)

	# read market-details
	file = open("%s/coinmarket/list_%s/%s" % (directory, page, filename), "r")
	data = file.read()
	file.close()

	# 获取子页面数
	pageCnt = pq(data)('.pageList').eq(0).find('a').length - 2
	for subpage in range(1, pageCnt):
		filename = "%s-p%d.html" % (tokenFullName, subpage+1)
		suburl = "%s/list_%d.html" % (url, subpage+1)
		getAndSavePage(suburl, _dir, filename)

# 获取币属性详情
def getDetailsPage(directory, page, tableRow):
	tokenFullName = pq(tableRow).attr('id')
	PATH = "details"
	url = '%s/%s/%s' % (BASE_URL, "currencies", tokenFullName)
	_dir = "%s/%s/list_%d" % (directory, PATH, page)
	filename = "%s.html" % (tokenFullName)
	getAndSavePage(url, _dir, filename)

# 获取币介绍详情
def getCoinDetailsPage(directory, page, tableRow):
	tokenFullName = pq(tableRow).attr('id')
	PATH = "coindetails"
	url = '%s/%s/%s' % (BASE_URL, PATH, tokenFullName)
	_dir = "%s/%s/list_%d" % (directory, PATH, page)
	filename = "%s.html" % (tokenFullName)
	getAndSavePage(url, _dir, filename)

def downloadCoinIcon(directory, page, tableRow):
	tokenFullName = pq(tableRow).attr('id')
	filepath = "{0}/details/list_{1}/{2}.html".format(directory, page, tokenFullName)
	data = readFile(filepath)

	# url =>  //static.feixiaohao.com/coin/eced1e28da4f16e117f471b08ad6e_mid.png
	urlObj = pq(data)('.cell.maket img').eq(0).attr('src')
	url = "{0}".format(urlObj)
	if url.find("//") != -1: 
		md5 = hashlib.md5(url.encode('utf-8')).hexdigest()
		filename = "{0}/icons/{1}-{2}.png".format(directory, tokenFullName, md5)
		print("url =>", url, filename)
		urllib.request.urlretrieve("https:{0}".format(url), filename)

def readFile(filepath):
	file = open(filepath, "r")
	data = file.read()
	file.close()
	return data;


# parseAllTokens('20180309-11:14:58')
#print('START', time.strftime("%Y-%m-%d %H:%M:%S")) #START 2018-03-17 17:10:00
# requestAllTokenPages(t)
# parseMarketDetailsFromTokenPages(t)
# parseMarketDetailsFromTokenPages('20180317-16:58:14')

# START 2018-03-19 16:34:59
# 
print('START', time.strftime("%Y-%m-%d %H:%M:%S"))
t = "20180319-16:34:59"
# getCurrenciesPage(t)
# tokenPagesAction(t, getDetailsPage)
# tokenPagesAction(t, getMarketDetailsPage)
# tokenPagesAction(t, getCoinDetailsPage)
tokenPagesAction(t, downloadCoinIcon)
print('END', time.strftime("%Y-%m-%d %H:%M:%S")) 


