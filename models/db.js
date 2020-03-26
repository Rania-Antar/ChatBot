var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin@cluster0-tdssk.gcp.mongodb.net/test?retryWrites=true&w=majority',  { useNewUrlParser: true })


mongoose.connection.on('connected', ()=>{
    console.log('connected to database ' )
});
mongoose.connection.on('error', (err)=>{
    console.log('Connection Error: '+ err);
});
