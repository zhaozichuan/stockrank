# -*- coding: utf-8 -*-
"""
Created on Tue Oct 17 09:28:06 2017
@author: zzc
"""

import urllib.request
import re
#import pandas as pd
#from sqlalchemy import create_engine,Table,Column,Integer,String,MetaData,ForeignKey

import pymysql
#pymysql.install_as_MySQLdb()
#import tushare as ts
##def downback(a,b,c):

##    ''''

##    a:�Ѿ����ص����ݿ�

##    b:���ݿ�Ĵ�С

##    c:Զ���ļ��Ĵ�С

##   '''

##    per = 100.0 * a * b / c

##    if per > 100 :

##        per = 100

##    print('%.2f%%' % per)

stock_CodeUrl = 'http://quote.eastmoney.com/stocklist.html'

#��ȡ��Ʊ�����б�

def urlTolist(url):

    allCodeList = []

    html = urllib.request.urlopen(url).read()

    html = html.decode('gbk')

    s = r'<li><a target="_blank" href="http://quote.eastmoney.com/\S\S(.*?).html">(.*?)</a></li>'

    pat = re.compile(s)

    code = pat.findall(html)
    
    print(code[0][1])
    conn = pymysql.connect(user='root', passwd='Zzc7382788',  
                     host='rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com', db='playebean',charset='utf8')
    for item in code:
           print(item[0],item[1])
           insert(conn,item[0],item[1],"")
           
    conn.close() 
#    conn = pymysql.connect(user='root', passwd='Zzc7382788',  
#                     host='rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com', db='playebean',charset='utf8') 

     
#    engine=create_engine('mysql://root:Zzc7382788@rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com/playebean?charset=utf8')
##        
#    data= pd.DataFrame(code)
##    print(data)
#    data.to_sql('stock1',engine) 
##    data.to_excel('c:/000875.xlsx')
#    return allCodeList    
   
   
    # stockname = pat.findall(html)
#    for item in code:
#
#        if item[0]=='6' or item[0]=='3' or item[0]=='0':
#
#            allCodeList.append(item)
#
#    return allCodeList


##����  
def insert(conn,code,name,simple_name):  
#    conn = pymysql.connect(user='root', passwd='Zzc7382788',  
#                     host='rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com', db='playebean',charset='utf8')  
    cur = conn.cursor()  
    sql= "INSERT INTO stock (code,name,simple_name) VALUES ('"+code+"','"+name+"','"+simple_name+"')"  
    print(sql)  
    sta=cur.execute(sql)  
    if sta==1:  
        print('Done')  
    else:  
        print('Failed')     
    conn.commit()  
    cur.close()      
#    conn.close()  


    

allCodelist = urlTolist(stock_CodeUrl)
#
#print(allCodelist)

#for code in allCodelist:
#
#    print('���ڻ�ȡ%s��Ʊ����...'%code)
#
#    if code[0]=='6':
#
#        url = 'http://quotes.money.163.com/service/chddata.html?code=0'+code+\
#        '&end=20161231&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP'
#
#    else:
#
#        url = 'http://quotes.money.163.com/service/chddata.html?code=1'+code+\ '&end=20161231&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP'
#
#        urllib.request.urlretrieve(url,'d:\\all_stock_data\\'+code+'.csv')#���Լ�һ������dowmback��ʾ���ؽ���


##!/usr/bin/env pytho
## -*- coding:utf-8 -*-
##jdbc:mysql://rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com:3306/playebean  
## ��������
#conn = pymysql.connect(host='rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com', port=3306, user='root', passwd='Zzc7382788', db='playebean', charset='utf8')
### �����α�
#cursor = conn.cursor()
#  
## ִ��SQL����������Ӱ������
#effect_row = cursor.execute("select * from stock")
#  # ��ȡʣ�����ĵ�һ������
#row_1 = cursor.fetchone()
#
#print(row_1)
## ��ȡʣ����ǰn������
## row_2 = cursor.fetchmany(3)
# 
## ��ȡʣ������������
## row_3 = cursor.fetchall()
#
#
## ִ��SQL����������Ӱ������
##effect_row = cursor.execute("update tb7 set pass = '123' where nid = %s", (11,))
#  
## ִ��SQL����������Ӱ������,ִ�ж��
##effect_row = cursor.executemany("insert into tb7(user,pass,licnese)values(%s,%s,%s)", [("u1","u1pass","11111"),("u2","u2pass","22222")])
#  
#  
## �ύ����Ȼ�޷������½������޸ĵ�����
#conn.commit()
#  
## �ر��α�
#cursor.close()
## �ر�����
#conn.close()