import pytest
from website.__init__ import create_app
from website.models import User, db
from flask_testing import TestCase
from werkzeug.security import generate_password_hash

class TestLogin(TestCase):

    SQLALCHEMY_DATABASE_URI = "sqlite://" 
    TESTING = True

    def create_app(self):
        app = create_app()  
        app.config['SQLALCHEMY_DATABASE_URI'] = self.SQLALCHEMY_DATABASE_URI
        app.config['TESTING'] = self.TESTING
        return app

    def setUp(self):
        db.create_all()
        hashed_password = generate_password_hash("testpassword", method='sha256')
        test_user = User(email="test@example.com", password=hashed_password)
        db.session.add(test_user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


if __name__ == "__main__":
    pytest.main()
