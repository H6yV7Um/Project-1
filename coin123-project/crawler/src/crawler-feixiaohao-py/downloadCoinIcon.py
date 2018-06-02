#coding=utf-8

def downloadCoinIcon(directory, page, tableRow):
	tokenFullName = pq(tableRow).attr('id')
	PATH = "coindetails"
	url = '%s/%s/%s' % (BASE_URL, PATH, tokenFullName)
	_dir = "%s/%s/list_%d" % (directory, PATH, page)
	filename = "%s.html" % (tokenFullName)
	urllib.request.urlretrieve(url, file_name)