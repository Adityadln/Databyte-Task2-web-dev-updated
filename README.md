# SociaLink - a group based social network.
## Description
+ The project made is a group based social network which essentially lets an user join different groups,chat and shares images.
+ The project is made using ejs css and vanilla javascript for the front end and node js(express framework),mongoDB as the database and have used socket.io for web socket for live chatting and image upload.
+ The app lets a user login or signup to their respective accounts and create and join different groups.
## How to use the project
+ The project has multiple files along with the package.json and the app.js.
+ app.js is the main file and the program starts from app.js
## Details
### Normal mode
+For the normal mode ,to start of with i have used bcrpyt to hash the passwords and compare them and used json web tokens with cookies to authenticate an user in and store the cookie for the session so that user can login back if previously didnt log out.
+ The registered user's details are stored in the database.
+ After logging/signing in the user can create new groups or join the previously existing groups.
+ Uswr can click on the group card button and the user is directed to chat section of the group.
+ Also the group can be deleted by click of the trash can icon.
+ The user can search the groups based on the groups name in the search bar.
### Hacker mode
+In the hacker mode the chat feature has been made functionalable where user can send live chat messages and also provides for image upload to the chat.
+ User can also search for the groups by the respective group tags.
## Extra features
+ I have made the website have both the light and the dark mode and once clicked the user's preffered mode is stored in the local storage.
+ Additionally i have made a home page which serves as a the starting point into the chat app.
## Challenges faced
+ The backend was challenging not because backend as such is hard but because i had to spend hours or maybe days at times to rectify any error that would crash the node app.
+ The connection with database(mongoDB)was at times slightly tiring as i have not made all ip address access the database which meant that i had to add current ip address every time i have started running the node app.
