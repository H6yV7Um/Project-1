# favorite(模块编号20)

## 1. 添加自选 [done]

`POST /v1/favorite` （接口编号001）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
name | STRING | YES | 资产名称
nameCn | STRING | YES | 资产中文名称
storageName | STRING | YES | 币交易所名称  
storageNameCn | STRING | YES | 币交易所中文名  
type | STRING | YES | 资产类型  
token | STRING | YES | 代码

**Response:**
```js
{
    "code": 0 ,
    "message": "Success"
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
2000101 | parameter error | 参数错误
2000102 | operation failed | 操作失败

## 2. 自选列表 [done]

`GET /v1/favorite_list` （接口编号002）

**Response:**
```js
{
    "code": 0 ,
    "message": "Success",
    "data": [
      {
        "token": "EOS",
        "type": "token",
        "price": 38.369968799,
        "1dayProfitRate": 1.68,
        "storageName": "Binance",
        "storageNameCn": "币安网"
      },
      {
        "token": "BTC",
        "type": "token",
        "price": 44474.897534,
        "1dayProfitRate": -6.45,
        "storageName": "Binance",
        "storageNameCn": "币安网"
      },
      {
        "token": "HK00700",
        "type": "HK",
        "price": 409.6,
        "1dayProfitRate": -0.631
      }
    ]
}
```

## 3. 删除单条自选 [done]

`DELETE /v1/favorite` （接口编号003）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
_id | STRING | YES | 自选数据id

**Response:**
```js
{
    "code": 0 ,
    "message": "Success"
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
2000301 | parameter error | 参数错误
2000302 | operation failed | 操作失败

## 4. 删除同类型自选 [done]

`DELETE /v1/favorites` （接口编号004）

**Parameters:**

Name | Type | Mandatory | Description
------------ | ------------ | ------------ | ------------
_id | STRING | YES | 自选数据id
type | STRING | YES | 资产类型 | #"US" -> 美股、'HK' ->港股、"A" -> A股、 "token" -> 币

**Response:**
```js
{
    "code": 0 ,
    "message": "Success"
}
```

**Code:**

状态码 | 英文描述 | 中文描述        
---- | ---  | ---       
2000401 | parameter error | 参数错误
2000402 | operation failed | 操作失败


