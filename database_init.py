import mysql.connector

my = mysql.connector.connect(host='localhost', user='root', passwd='r00t4[m3]98')

my_cursor = my.cursor()

my_cursor.execute("CREATE DATABASE site.db")
my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
    print(db)