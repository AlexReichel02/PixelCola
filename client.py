import socket
import threading

def receive_messages(client_socket, chat_history):
    while True:
        msg = client_socket.recv(1500).decode()
        chat_history.append(msg)
        print("\n".join(chat_history))

def main():
    user_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_address = ('127.0.0.1', 60010)
    
    try:
        user_socket.connect(server_address)
    except ConnectionRefusedError:
        print("Server is not available.")
        return
    
    username = input("Enter your username: ")
    user_socket.send(username.encode())
    
    chat_history = []
    receive_thread = threading.Thread(target=receive_messages, args=(user_socket, chat_history))
    receive_thread.start()

    while True:
        user_input = input("> ")
        
        if user_input == "exit":
            print("Have a good day")
            user_socket.send(user_input.encode())
            break
        
        print(f"{username}: {user_input}")
        user_socket.send(user_input.encode())

    user_socket.close()

if __name__ == "__main__":
    main()
