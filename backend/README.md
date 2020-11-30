##Chitchat Site
 
 This is simple website built on Node.js, Express and MongoDB. It mostly serves as a sample site to learn how Express framework works on backend. It includes SignUp/Login with the authentication using passportJS. All user credentials, chat and sessions will be stored on local mongoDB database.
 Most of the frontend design(css and jquery) for chat room has been used or modified from https://github.com/ezesundayeze/anonymouse-realtime-chat-app

##Highlights

1.Login/SignUp and authentication using passportJS local strategy.

2. Store users, sessions and past room chats on local database "mongodb://localhost:27017/chitchat".

3. Realtime chat room using SOCKET.IO where authenticated users can chat with each other in real time. Also, loading of past chats as saved on database.

4. Use of EJS as frontend template 

##Installation
1. Clone this repository and run npm install
2. Then run npm start
3. visit localhost:3000 on website and explore

Note:
You should have mongoDB and nodeJS installed and started for this application to work correctly.