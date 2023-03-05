#!/bin/bash
# Script to initiate the flask website to run on this system.
# Needs to be debian based Linux. Needs python3 installed.

echo Installing python packages...
pip3 install flask
pip3 install flask-sqlalchemy
pip3 install pymysql
pip3 install mysql-connector-python

echo Installing mysql...
sudo apt-get install mysql-client mysql-server

echo Starting mysql...
sudo service mysql start

echo Creating DB...
python3 database_init.py

echo Done!