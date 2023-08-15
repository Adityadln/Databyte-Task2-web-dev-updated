const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router=require('./router/router');
const User=require('./models/userSchema');
const cookieParser = require('cookie-parser');
const server=require("http").createServer(app);
const port=3000;

app.use(express.static('public'));


app.use(express.json());
app.use(cookieParser());   
app.use(express.urlencoded({ extended: true }));



app.set('view engine','ejs');


const dbUri='mongodb+srv://adityadln:adityapass123@cluster0.gp9obyt.mongodb.net/databyteNodejs?retryWrites=true&w=majority';
  mongoose.connect(dbUri)
    .then((response)=>{
        console.log("connected to db");
        server.listen(port,()=>{
          console.log("listening on port 3000");
      });
      
       
    })
    
    .catch((err)=>{
        console.log(err);
    
    })

const dbUriMain='mongodb+srv://adityadln:adityapass123@cluster0.gp9obyt.mongodb.net/databyteNodejs?retryWrites=true&w=majority'; 
    mongoose.connect(dbUriMain)
      .then((res)=>{
        console.log('connected to db main');
        
      })
      .catch((err)=>{
        console.log(err);
      })
      const io=require('socket.io')(server,{
        cors:{
            origin:'*',
        }
    });
      io.on('connection',socket=>{
          console.log(socket.id);
          socket.on('message',data=>{
            console.log(data);
          socket.broadcast.emit('message-post',{data:data,id:socket.id});
       
      
          })
          socket.on('image-upload',data=>{
            socket.broadcast.emit('image-upload-all',data);
          });
       
        
    })
    console.log("end of the server");
    app.use(router);
    app.use((req, res)=>{
      res.render('404');
    })