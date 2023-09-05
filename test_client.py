import client

class TestClient():

    def test_receive_messages(client_socket):
        assert client_socket.recv(1500).decode()
