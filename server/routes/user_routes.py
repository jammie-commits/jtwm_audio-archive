from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_data():
    # Get current user's identity from JWT token
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    if user:
        return jsonify({
            "username": user.username,
            "email": user.email,
            "subscription_active": user.subscription_active
        })
    else:
        return jsonify({"error": "User not found"}), 404
