# asset(模块编号10)
### 1. 添加资产 [done]
`POST /v1/asset` （接口编号001）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
name | STRING | YES | 资产名称
type | STRING | YES | 类型 US -> 美股、HK ->港股、A -> A股、 token -> 币
token | STRING | YES | 资产简称
tokenId | Number | NO | 币的tokenId
storageName | STRING | NO | 交易所名称
qty | NUMBER | YES | 数量 
price | NUMBER | YES | 买入价格
priceType | NUMBER | YES | 总价／单价 0 -> 单价 1 -> 总价
buyAt | NUMBER | YES | 买入时间时间戳
remark | STRING | NO | 备注

**Response:**
```js
{
    "code": 0 ,
    "message": 'Success'
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000101 | parameter error| 参数错误
1000102 | operation failed|  操作失败

### 2. 股票搜索接口 [done]
`GET /v1/stock/list` （接口编号002）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
keyword | STRING | YES | 关键字

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data":[
       {
         "name": "TENCENT",
         "nameCn": "腾讯控股",
         "token": "HK00700",
         "type": "HK"
       }
    ]
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000201 | parameter error|  参数错误
1000202 | operation failed|  操作失败

### 3. 币种数据接口 [done]
`GET /v1/token/list` （接口编号003）

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data":[
       {
         "exchangeName": "livecoin",
         "name": "FinCoin",
         "token": "FINCOIN",
         "nameCn": "－",
         "ranking": 0,
         "exchangeNameCn": "Livecoin",
         "tokenId": 1
       },
       {
         "exchangeName": "aex",
         "name": "ATN",
         "token": "ATN",
         "nameCn": "－",
         "ranking": 0,
         "exchangeNameCn": "AEX",
         "tokenId": 1
       }
    ]
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000301 | operation failed|  操作失败

### 4. 资产列表 [done]
`GET /v1/asset` （接口编号004）

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data":{
      "overview": {
         #总资产
         "totalAsset": 1000,
         # 总收益率
         "totalProfitRate":1,
         # 今日收益率
         "1dayProfitRate": 0.4,
         # 总成本
         "totalPrice": 323.213,
         # 总收益
         "totalProfit": 100000,
         # 总资产今日变化率
         "1dayProfitRate": -0.06336590552500104
      },
      "list": [
        {
          #"US" -> 美股、'HK' ->港股、"A" -> A股、 "token" -> 币
          "type": "token", 
          "token": "BTC",
          "icon": "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
          #数量
          "qty": 10,
          #当前价格
          "price": 47360.62575472,
          #今日变化
          "1dayProfitRate": -6.7,
          #成本
          "totalPrice": 500000,
          #收益
          "totalProfit": -26393.742452799983,
          #占比
          "ratio": 0.9263760911586331
        },
        {
          "type": "token",
          "token": "EOS",
          "icon": "https://s2.coinmarketcap.com/static/img/coins/64x64/6.png",
          "qty": 1000,
          "price": 37.6399437174,
          "1dayProfitRate": -5.83,
          "totalPrice": 40000,
          "totalProfit": -2360.056282599995,
          "ratio": 0.07362390884136685
        }
      ]
    }
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000401 | parameter error| 参数错误
1000402 | operation failed| 操作失败 

### 5. 资产收益率图表数据
`GET /v1/asset/profit_rate` （接口编号005）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
range | STRING | YES | day/month/year 时间段

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data":[
      {
        timestamp: 1123232323,
        value: 0.3,
      }
    ]
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000501 | parameter error | 参数错误

### 6. 资产统计分析
`GET /v1/asset/statistics` （接口编号006）

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data":[
      {
        "timestamp": 2310318,
        "cost": 1048.30,
        "totalPrice": 2039432,
      },
    ]
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000601 | parameter error | 参数错误


### 7. 资产编辑接口 [done]
`PUT /v1/asset` （接口编号007）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
_id | STRING | YES | 数据库种资产文档的id
qty | NUMBER | YES | 数量 
price | NUMBER | YES | 买入价格
priceType | NUMBER | YES | 总价／单价
buyAt | NUMBER | YES | 买入时间时间戳
remark | STRING | NO | 备注

**Response:**
```js
{
    "code": 0 ,
    "message": 'Success'
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000701 | parameter error| 参数错误
1000702 | operation failed|  操作失败

### 8. 删除单条资产接口 [done]
`DELETE /v1/asset` （接口编号008）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
_id | STRING | YES | 数据库种资产文档的id

**Response:**
```js
{
    "code": 0 ,
    "message": 'Success'
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000801 | parameter error | 参数错误
1000802 | operation failed|  操作失败

### 9. 删除同类型资产接口 [todo]
`DELETE /v1/assets` （接口编号009）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
token | STRING | YES | 资产代码

**Response:**
```js
{
    "code": 0 ,
    "message": 'Success'
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1000901 | parameter error | 参数错误
1000902 | operation failed|  操作失败

### 10. 资产详情列表 [doing]
`GET /v1/asset_detail_list` （接口编号010）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
token | STRING | YES | 资产代码

**Response:**
```js
{
    "code": 0 ,
    "message": 'Success'
    "data": {
      "overview": {
         #总个数
         "qty": 10000,
         "token": "EOS",
         #总资产
         "totalAsset": 999999,
         # 今日收益率
         "1dayProfitRate": 0.4,
         # 总收益率
         "totalProfitRate":1,
         # 总成本
         "totalPrice": 323.213,
         # 总收益
         "totalProfit": 100000,
      },
      "list": [{
        #交易所名称
        "storageName": "Binance",
        #交易所中文名
        "storageNameCn": "币安网",
        #资产个数
        "qty": 500,
        #代码
        "token": "EOS",
        #当前总价格
        "currentTotalPrice": 4000,
        #当前单价
        "price": 30,
        #买入价格
        "unitPrice": 37,
        #今日利润
        "1dayProfit": -1000,
        #总利润
        "totalProfit": -10000,
        #买入时间
        "butAt": 15635126737
      }]
    }
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
1001001 | parameter error | 参数错误
1001002 | operation failed|  操作失败
