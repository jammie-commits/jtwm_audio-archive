# routes/audio_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models import AudioFile

audio_bp = Blueprint('audio', __name__)

@audio_bp.route('/', methods=['GET'])
@jwt_required()
def get_audios():
    audios = AudioFile.query.all()
    return jsonify([{"id": audio.id, "title": audio.title, "author": audio.author, "url": audio.url} for audio in audios])

@audio_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_audio():
    data = request.get_json()
    audio = AudioFile(title=data['title'], author=data['author'], url=data['url'])
    db.session.add(audio)
    db.session.commit()
    return jsonify(message="Audio uploaded successfully!")
