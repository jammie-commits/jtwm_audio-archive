# app.py
from flask import Flask
from flask_cors import CORS
from extensions import db, jwt
from routes.auth_routes import auth_bp
from routes.audio_routes import audio_bp
from routes.user_routes import user_bp
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app, origins="http://localhost:3000")

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    # app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(audio_bp, url_prefix='/audio')
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
