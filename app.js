const express = require("express");
const morgan = require("morgan");
const layout = require('./views/layout')
const Models = require('./models');

const wikiRouter = require('./routes/wiki.js');
// const userRouter = require('./routes/user.js');

const app = express();
app.use('/wiki', wikiRouter);
// app.use('/user', userRouter);

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })



app.use(express.urlencoded({ extended: false }))


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
  res.send(layout(''))
})


const initDB = async () => {
  await Models.db.sync({ force: true })
  await Models.Page.sync()
  await Models.User.sync()
  console.log('db synced');

  const PORT = 1337;

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

initDB();
