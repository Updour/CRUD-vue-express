const express =  require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
// using app
const app = express()
// 
const User = require('./src/components/user.route')
// connection mongodb
mongoose.connect('mongodb://localhost:27017/user',  {
	useNewUrlParser: true ,
	useCreateIndex: true,
})
// .then((res) => console.log(res))
// .catch((err) => console.log(err))
const db = mongoose.connection
db.on('err', console.error.bind(console, 'connection err'))
db.once('open', function() {
	console.log('connection success')
})

// use app
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app get
app.get('/', (req, res) => res.send('Hello World!'));
app.use(User);
// listen / port
app.listen(5000, () => console.log('app listen on port 5000'))