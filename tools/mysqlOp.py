# -*- coding: utf-8 -*-
"""
Created on Tue Oct 17 11:19:59 2017
@author: zzc
"""
#encoding:utf8  
import pymysql  
  
  
##��ѯ  
def select():  
    conn = pymysql.connect(user='root', passwd='�������',  
                     host='localhost', db='test',charset='utf8')  
    cur = conn.cursor()  
    cur.execute("SELECT * FROM user")  
    for r in cur:  
          print("row_number:" , (cur.rownumber) )          
          print("id:"+str(r[0])+" name:"+str(r[1])+" password:"+str(r[2]))   
    cur.close()      
    conn.close()  
  
##����  
def insert(name,pwd):  
    conn = pymysql.connect(user='root', passwd='�������',  
                     host='localhost', db='test',charset='utf8')  
    cur = conn.cursor()  
    sql= "INSERT INTO user (Name,Password) VALUES ('"+name+"','"+pwd+"')"  
    print(sql)  
    sta=cur.execute(sql)  
    if sta==1:  
        print('Done')  
    else:  
        print('Failed')     
    conn.commit()  
    cur.close()      
    conn.close()  
  
##����  
def update(name,pwd):  
    conn = pymysql.connect(user='root', passwd='�������',  
                     host='localhost', db='test',charset='utf8')  
    cur = conn.cursor()  
    sql= "UPDATE USER SET PASSWORD='"+pwd+"' WHERE NAME='"+name+"'""'" 
    print(sql) 
    sta=cur.execute(sql) 
    if sta==1: 
        print('Done') 
    else: 
        print('Failed')    
    conn.commit() 
    cur.close()     
    conn.close() 
 
##ɾ�� 
def delete(name): 
    conn = pymysql.connect(user='root', passwd='�������', 
                     host='localhost', db='test',charset='utf8') 
    cur = conn.cursor() 
    sql = "DELETE FROM USER WHERE Name='"+name+"'"  
    print(sql)  
    sta=cur.execute(sql)  
    if sta==1:  
        print('Done')  
    else:  
        print('Failed')     
    conn.commit()  
    cur.close()      
    conn.close()  
  
##���ú������в������� 