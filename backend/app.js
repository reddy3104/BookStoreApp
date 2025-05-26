const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const user = require("./routes/user");
const book = require("./routes/book");
const cart = require("./routes/cart");
const fav = require("./routes/favourite");
const order = require("./routes/order");


dotenv.config();
require("./conn/conn"); // DB connection

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", cart);
app.use("/api/v1", fav);
app.use("/api/v1", order);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server Started at PORT : ${PORT}`);
});
