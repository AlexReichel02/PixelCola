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
    with patch('website.path.exists', return_value=False), \
         patch('website.db.create_all') as mock_create_all:

        create_database(None)  
        mock_create_all.assert_called_once()

    


