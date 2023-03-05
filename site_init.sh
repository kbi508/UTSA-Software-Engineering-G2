#!/bin/bash
# Script to initiate the flask website to run on this system.
# Needs to be debian based Linux.

echo Installing python3 and pip3...
sudo apt-get install python3 python3-pip

echo Installing python packages...
pip3 install flask
pip3 install flask-sqlalchemy
pip3 install pymysql
pip3 install mysql-connector-python

echo Installing mysql...
sudo apt-get install mysql-client mysql-server

echo Starting mysql...
sudo service mysql start

echo Setting up root user...
sudo mysql -u root<<EOF
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'r00t4[m3]';
FLUSH PRIVILEGES;
EOF

echo Creating DB...
python3 database_init.py

echo Done!