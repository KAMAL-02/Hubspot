from flask import Blueprint, request, redirect, jsonify, make_response
import requests
import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("HUBSPOT_CLIENT_ID")
CLIENT_SECRET = os.getenv("HUBSPOT_CLIENT_SECRET")
REDIRECT_URI = os.getenv("HUBSPOT_REDIRECT_URI")
HUBSPOT_TOKEN_URI = os.getenv("HUBSPOT_TOKEN_URI")

auth_bp = Blueprint("auth", __name__)

# HubSpot callback route
@auth_bp.route("/oauth/callback")
def oauth_callback():

    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Authorization code not provided"}), 400
    
    return redirect(f"{os.getenv('FRONTEND_REDIRECT_URI')}?code={code}")

#Route to fetch access and refresh tokens from HubSpot
@auth_bp.route("/get-token")
def get_token():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Authorization code not provided"}), 400
    
    payload = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code
    }

    try:
        response = requests.post(HUBSPOT_TOKEN_URI, data=payload)
        
        if response.status_code != 200:
            return jsonify({"error": "Failed to get tokens from HubSpot", "error": response.text}), response.status_code
        
        tokens = response.json()
        
        access_token = tokens["access_token"]
        refresh_token = tokens["refresh_token"]
        expires_in = tokens["expires_in"]
        
        if not all([access_token, refresh_token, expires_in]):
            return jsonify({"error": "Missing tokens in response"}), 500

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token,
            "expires_in": expires_in
        })

    except requests.exceptions.RequestException as e:
        print(f"Error while requesting tokens from HubSpot: {e}")
        return jsonify({"error": "An error occurred while requesting tokens from HubSpot"}), 500