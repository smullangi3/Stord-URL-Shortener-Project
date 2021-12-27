from flask import Flask, json, request, redirect, jsonify
from flask_cors import CORS
import mysql.connector
import string
import random

app = Flask(__name__)
CORS(app)

def isvalid(url):
    return url.startswith("https://") or url.startswith("http://")

def generateCode():
    codeNeeded = True
    possibleChars = string.ascii_letters + string.digits

    while codeNeeded:
        codeLen = random.randrange(6,9)
        newCode = ''.join([random.choice(possibleChars) for n in range(codeLen)])
        
        cursor.execute("SELECT URL FROM code_to_url WHERE Code = '" + newCode + "'")
        codeNeeded = (len(cursor.fetchall()) != 0)

    return newCode

@app.route('/submit', methods = ['post'])
def submiturl():
    if request.method == 'POST':
        global cursor 
        global codedb

        config = {
            'user': 'root',
            'password': 'root',
            'host': 'db',
            'port': '3306',
            'database': 'code_url_db'
        }
        codedb = mysql.connector.connect(**config)
        cursor = codedb.cursor()

        url = request.json['URLToShorten']['url']
        if (isvalid(url)):
            code = generateCode()
            
            inserttodb = "INSERT INTO code_to_url (Code, URL) values (%s, %s)"
            val = (code, url)
            cursor.execute(inserttodb, val)
            codedb.commit()
            
            return jsonify(newurl = ('localhost:8080/' + str(code)), error="")
        return jsonify(error = "URL Invalid: Must Contain http(s) Prefix", newurl="")

@app.route('/<code>')
def rerouter(code):
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'code_url_db'
    }
    codedb = mysql.connector.connect(**config)
    cursor = codedb.cursor()

    cursor.execute("SELECT URL FROM code_to_url WHERE Code = '" + code + "'")

    urltoredirect = (str(cursor.fetchone()))[2:-3]
    return redirect(urltoredirect)


if __name__ == '__main__':
    app.run(port=8080)