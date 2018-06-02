爬虫、数据整合
=====================================

## clone

```bash
git clone git@github.com:coins007/crawler.git
```

## 安装

```bash
npm install
```

## 运行、按先后顺序执行

1. 爬取汇率数据

```bash
  #加定时器可定时抓取
  node rate
```

2. 获取币种基本数据

```bash
  node coinmarketcap
```

3. 爬取非小号数据

```bash
  #整合币和交易所的数据
  node feixiaohao
```

4. 获取历史数据(未完成)

```bash
  node tokenCache
```

**以上按顺序启动**
