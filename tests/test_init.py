import os
import sys
sys.path.insert(0, "/home/jon/Capstone/PythonChatGame")
from website import create_app, create_database
from unittest.mock import patch
from flask import Flask


def test_create_app():
    app = create_app()
    assert app is not None
    assert isinstance(app, Flask)


def test_create_database():
    # Mocking path.exists to always return False, so the database creation logic is triggered
    with patch('website.path.exists', return_value=False), \
         patch('website.db.create_all') as mock_create_all:

        create_database(None)  # app argument is not used in your function

        # Assert that db.create_all was called once
        mock_create_all.assert_called_once()

    


