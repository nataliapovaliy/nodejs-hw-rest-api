const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

const contactsRouter = require('./api');
app.use('/api/', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  console.log(err.stack)
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

const uriDb = "mongodb+srv://npovaliy:Heduff7g2shs82YZ@cluster0.xaqgftq.mongodb.net/db-contacts?retryWrites=true&w=majority"
mongoose.connect(uriDb)
  .then(() => 
    app.listen(3000, () => console.log("Database connection successfull")))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
})


// const PORT = 3000
// const uriDb = "mongodb+srv://npovaliy:Heduff7g2shs82YZ@cluster0.xaqgftq.mongodb.net/db-contacts?retryWrites=true&w=majority"

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// })

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running. Use our API on port: ${PORT}`)
//     })
//   })
//   .catch((err) =>
//     console.log(`Server not running. Error message: ${err.message}`),
//   )
