import socket
import threading
from time import sleep

gameOver =False
chatOver =False
gameOverV2 = False

def receive_messages(client_socket, chat_history):
    global gameOver
    global chatOver
    
    while True:
        msg = client_socket.recv(1500).decode()
        chat_history.append(msg)
       
        if "Chat: " in msg:
            print("Message from Server Chat: ")
            print(chat_history[len(chat_history)-1])
            print("Reply: ")
          
        if "Wrong" in msg:
            print("Message from Server Game: ")
            print(chat_history[len(chat_history)-1])
            
        if "won" in msg:
            print("Message from Server Game: ")
            print(chat_history[len(chat_history)-1])
            gameOver = True
           
          
      

def main():
    global gameOver
    global chatOver
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

     
    
        choice = input("Enter chat to chat\nEnter play to play: \n")
        user_socket.send(choice.encode())
        
    
        if choice == "play":
            # gameOver = False
             gameOver=False
         
             print("Welcome to the guessing game ! Enter Choice \n")
             while(gameOver==False):
                user_input = input("Choice > ")
                user_socket.send(user_input.encode())
                
                if user_input =="quit":
                    gameOver=True
                    break
                if gameOverV2 == True:
                    gameOver=True
                    break
          


        if choice == "chat" and chatOver==False:
             welcome = input("Welcome to the Chat! \n")
             user_socket.send(welcome.encode())
             while(chatOver ==False):
                user_input = input("Chat: ")
                user_socket.send(user_input.encode())
                if user_input =="quit":
                    chatOver=True
                    break
             


        if choice == "exit":
            print("Have a good day")
            user_socket.send(user_input.encode())
            user_socket.close()
            exit()
            break
        
       
        chatOver=False
       # gameOver = False  
       
        
        #print(f"{username}: {user_input}")
        #user_socket.send(user_input.encode())



if __name__ == "__main__":
    main()
