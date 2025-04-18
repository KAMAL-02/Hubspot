import requests
import os
from flask import request, jsonify
from dotenv import load_dotenv

load_dotenv()

HUBSPOT_BASE = os.getenv("HUBSPOT_BASE_URI")
HUBSPOT_TOKEN_URL = os.getenv("HUBSPOT_TOKEN_URI")
CLIENT_ID = os.getenv("HUBSPOT_CLIENT_ID")
CLIENT_SECRET = os.getenv("HUBSPOT_CLIENT_SECRET")

def refresh_access_token(refresh_token):
    payload = {
        "grant_type": "refresh_token",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "refresh_token": refresh_token
    }
    res = requests.post(HUBSPOT_TOKEN_URL, data=payload)
    res.raise_for_status()
    return res.json()

def hubspot_get(endpoint, params=None):
    access_token = request.headers.get("access-token")
    refresh_token = request.headers.get("refresh-token")  

    if not access_token or not refresh_token:
        raise Exception("Missing tokens in cookies")

    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    url = f"{HUBSPOT_BASE}/{endpoint}"

    res = requests.get(url, headers=headers, params=params)

    if res.status_code == 401: #If 401 that means token expired and we gotta refresh the token and make the request again
        print("token expired")
        new_tokens = refresh_access_token(refresh_token)
        access_token = new_tokens["access_token"]

        headers["Authorization"] = f"Bearer {access_token}"
        res = requests.get(url, headers=headers, params=params)

    res.raise_for_status()
    data = res.json()
    res_body = {
    "data": data,
    "access_token": access_token,
   }
    # return res.json()
    return res_body
