const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

// Middlewear for registering user 
app.use(express.json({extended:false}));


// Define Routes 
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

//Serve Static Assets in Prod
if(process.env.NODE_ENV === 'production'){
    // Set Static Folder 
    app.use(express.static('my-app/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log('Server started on port ' + PORT));
