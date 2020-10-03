const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')

require('dotenv').config()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const collectionRoutes = require('./routes/collections')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order');

const app = express();






// Database

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true 

}).then(() => console.log('DB Connected'))


//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//Routes middleware
app.use(authRoutes)
app.use(userRoutes)
app.use(categoryRoutes)
app.use(collectionRoutes)
app.use(productRoutes)
app.use(braintreeRoutes)
app.use(orderRoutes);

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
