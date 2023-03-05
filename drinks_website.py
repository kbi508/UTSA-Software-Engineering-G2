#!/bin/python
import datetime
from flask import Flask, render_template
# Need to pip3 install flask-sqlalchemy
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:r00t4[m3]98@localhost/site_db'
db = SQLAlchemy(app)

# DB creation:
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# DB Testing:
with app.app_context():
    User.query.filter_by(username='Broham').delete()
    new_user = User(username='Broham', email='bubba@lolzers', password='password')
    db.session.add(new_user)
    db.session.commit()

    users = []
    for user in User.query.all():
        users.append(user)


@app.route('/')
def main():
    return render_template('main.html', utc_dt=datetime.datetime.utcnow())
    
@app.route('/about/')
def account():
    return render_template('account.html')

@app.route('/helloworld')
def helloworld():
    return render_template('helloworld.html', _users=users)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)
