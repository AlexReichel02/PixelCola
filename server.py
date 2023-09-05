import socket
import random
import time
import string
import threading

class Server:
    def __init__(self):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.address = ('127.0.0.1', 60010)
        self.clients = []
        self.address_length = 0
        self.client_socket = None
        self.secretWord="Fake"
        self.gameOver=False
        self.chatOver=False
      

    def start_server(self):
        self.server_socket.bind(self.address)
        self.server_socket.listen(10)
        print("=====Waiting for New connection=====")
        client_num = 0
        while True:
            client_socket, client_address = self.server_socket.accept()
            print(f"New connection from {client_address}")
            client_thread = threading.Thread(target=self.handle_client, args=(client_socket,))
            client_thread.start()
            self.clients.append(client_socket)
            client_num += 1
      
           

    def handle_client(self, client_socket):
        
        username = client_socket.recv(1500).decode()
        
        while True:
            try:
                msg = client_socket.recv(1500).decode()
                if not msg:
                    print(f"{username} disconnected")
                    self.clients.remove(client_socket)
                    client_socket.close()
                    break


                print(f"Received from {username}: {msg}")
               

                if(msg =="chat"):
                    print(f"{username} Wants to Chat")
                

                    while self.chatOver == False:
                         chat = client_socket.recv(1500).decode()

                         print(f"Received Chat from {username}: {chat}")

                         if chat == "quit":
                             self.chatOver =True
                             break

                         self.broadcast_message(f"Chat: {username}: {chat}", client_socket)
                         



                if(msg == "play"):
                    print(f"{username} Wants to Play")
               
                    self.gameOver = False
                    while self.gameOver == False:
                       
                      
                        answer = client_socket.recv(1500).decode()
                        print(f"Received Guess from {username}: {answer}")

                        if answer == "quit":
                             self.gameOver =True

                        if answer == self.secretWord:
                             winMsg = "The secret word: " + answer + " was Guessed Correctly from: " + username+ " they won"
                             print(f"The secret word: {answer} was Guessed Correctly from {username} they won\n")
                             client_socket.send(winMsg.encode())
                             self.broadcast_message(f"{username}: {winMsg}", client_socket)
                             self.gameOver = True
                             break
                        else:
                             wrongMsg = "Wrong Word Guessed, Try Again"
                             client_socket.send(wrongMsg.encode())



                if msg == "Exit" or msg =="exit":
                    exitMsg = "Have a good day"
                    client_socket.send(exitMsg.encode())
                    print(f"{username} manually disconnected")
                    self.clients.remove(client_socket)
                    client_socket.close()

                  
                self.chatOver =False
               
                
            except ConnectionResetError:
                print(f"{username} forcibly disconnected")
                self.clients.remove(client_socket)
                client_socket.close()
                break

       

    def broadcast_message(self, msg, sender_socket):
        for client_socket in self.clients:
            if client_socket != sender_socket:
                try:
                    client_socket.send(msg.encode())
                except:
                    self.clients.remove(client_socket)
                    client_socket.close()

    def close(self):
        for client_socket in self.clients:
            client_socket.close()
        self.server_socket.close()

if __name__ == "__main__":
     server = Server()
     try:
        server.start_server()
     except KeyboardInterrupt:
        print("\nServer is shutting down...")
        server.close()

