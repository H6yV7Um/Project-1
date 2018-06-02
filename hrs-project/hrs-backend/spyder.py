# coding=UTF-8
import requests
import sys
import base64
reload(sys)
sys.setdefaultencoding("utf-8")
from lxml import html
LOGIN_URL = 'https://www.taptap.com/auth/email/login'
REVIEW_LIST_URL = ['https://www.taptap.com/developer/reviews/1340?app_id=13096',
                   'https://www.taptap.com/developer/reviews/1340?app_id=228']
HOME_URL = ['https://www.taptap.com/app/13096', 'https://www.taptap.com/app/228']

USERNAME = 'bd@nibirutech.com'
PASSWORD = 'Tap4fun99'
cookies = ""
s = requests.Session()
# LOGIN
def login():
    prepage = html.fromstring(s.get(LOGIN_URL).content)
    token = prepage.xpath('//input[@name="_token"]/@value')
    s.post(LOGIN_URL, {"email": USERNAME, "password": PASSWORD, "remember": 'on', "_token":token[0]})

def fetch_list():
  result = []
  for url in REVIEW_LIST_URL:
      page = html.fromstring(s.get(url).content)
      page_numbers = page.xpath('//*[@class="pagination"]/li/a/text()')
      game = page.xpath('//*[@class="developer-header-text"]/h2/a/text()')[0].strip()
      word = "游戏版本:"
      version = page.xpath('//*[@class="developer-header-text"]/p/span/text()')[0].strip().replace(word, "").strip()
      country = "cn"
      game_cd=""
      if game == '部落征服':
          game_cd = "1012"
      else:
          game_cd = "1001"
      total_pages = 0
      for number in page_numbers:
          if number != '>':
              if total_pages<int(number):
                total_pages = int(number)
      i=1
      while i<=total_pages:
          if i!=1:
            page = html.fromstring(s.get(url+"&page="+str(i)).content)
          reviews_id = page.xpath('//*[@class="list-unstyled"]/li/@id')
          reviews_author = page.xpath('//*[@class="list-unstyled"]/li/@data-user')
          reviews_rating = page.xpath('//*[@class="colored"]/@style')
          reviews_content = page.xpath('//*[@class="item-text-body"]/p/text()')
          reviews_time = page.xpath('//a[@class="text-header-time"]/span/text()')
          for index in range(len(reviews_id)):
              result.append({
                             "id":reviews_id[index],
                             "author":reviews_author[index],
                             "rating":int(reviews_rating[index].replace("width: ","").replace("px",""))/14,
                             "content":reviews_content[index],
                             "review_time":reviews_time[index],
                             "country":country,
                             "version":version,
                             "game_cd":game_cd
                             })
          i+=1
  return result

def fetch_sum():
  result = []
  for url in HOME_URL:
    page = html.fromstring(s.get(url).content)
    game = page.xpath('//*[@class="main-header-text"]/h1/text()')[0]
    avg = page.xpath('//*[@class="app-rating-score"]/text()')[0]
    count = page.xpath('//*[@class="pull-right"]/small/text()')[0]
    
    game_cd = ""
    if game == '部落征服':
          game_cd = "1012"
    else:
          game_cd = "1001"
    
    
    result.append({"game_cd":game_cd, "average_rating":avg, "rating_count":count, "version":""})
  return result

def output(reviews, sum_infos):
  result_str = "id,author,rating,content,review_time,country,version,game_cd\r"
  for record in reviews:
    result_str+='%s,%s,%s,%s,%s,%s,%s,%s\r' % (record['id'], base64.b64encode(record['author']),
                                               record['rating'], base64.b64encode(record['content']),
                                               record['review_time'], record['country'],
                                               record['version'], record['game_cd'])
  path = "reviews.csv"
  with open(path, "w") as f:
    f.write(result_str)

  result_str = "game_cd,average_rating,rating_count,version\r"  
  for record in sum_infos:
    result_str+='%s,%s,%s,%s\r' % (record['game_cd'], record['average_rating'], record['rating_count'], record['version'])
  path = "sum.csv"
  with open(path, "w") as f:
    f.write(result_str)

  print "done"
if __name__ == "__main__":
  login()

  reviews = fetch_list()
  sum_infos = fetch_sum()
  for info in sum_infos:
      for review in reviews:
        if info['game_cd'] == review['game_cd']:
          info['version'] = review['version']
          break
  output(reviews, sum_infos)