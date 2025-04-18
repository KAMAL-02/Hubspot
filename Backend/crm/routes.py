from flask import Blueprint, request, jsonify
from utils.hubspot_data import hubspot_get

crm_bp = Blueprint("crm", __name__)

# Route to fetch standard core objects
@crm_bp.route("/crm/<object_type>", methods=["GET"])
def get_standard_crm_object(object_type):
    valid_objects = ["contacts", "companies", "deals", "tickets", "products"]
    
    if object_type not in valid_objects:
        return jsonify({"error": f"{object_type} is not a supported CRM object"}), 400

    try:
        data = hubspot_get(f"crm/v3/objects/{object_type}")
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get all custom object schemas
@crm_bp.route("/crm/custom/schemas", methods=["GET"])
def get_custom_schemas():
    try:
        data = hubspot_get("crm/v3/schemas")
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get records for a specific custom object
@crm_bp.route("/crm/custom/<object_type>", methods=["GET"])
def get_custom_object_data(object_type):
    try:
        data = hubspot_get(f"crm/v3/objects/{object_type}")
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
