from flask import Flask, request, redirect, jsonify
from flask_cors import CORS
import os
from auth.routes import auth_bp
from crm.routes import crm_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth_bp)
app.register_blueprint(crm_bp) 

@app.route("/")
def home():
    return "Hello, Flask!"


if __name__ == "__main__":
    app.run(debug=True)