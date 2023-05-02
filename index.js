const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("../Backend/routes/User.routes");
// const jwt = require("jsonwebtoken");
const { auth } = require("./middleware/auth.middleware");
const {noteRouter} = require("../Backend/routes/Note.routes")
require("dotenv").config()
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());


app.use("/users", userRouter);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });
// app.get("/contacts", (req, res) => {
//   res.send("Contacts Page");
// });
// app.get("/about", (req, res) => {
//   res.send("Home Page");
// });


app.use(auth)
app.use("/notes",noteRouter)

// app.get("/series", (req, res) => {
//   // const token = req.headers.authorization.split(" ")[1];
//   // jwt.verify(token, "masai", (err, decoded) => {
//   //   console.log(decoded);
//   //   if (decoded) res.status(200).send("Series Data");
//   //   else res.send({ error: err.message });
//   // });
//   res.status(200).send("Series Data");
// });

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
