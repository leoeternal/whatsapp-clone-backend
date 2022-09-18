const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(cors(corsOptions));

const { db } = require("./db/database");
const UserRoute = require("./routes/UserRoute");
const ConversationRoute = require("./routes/ConversationRoute");
const MessageRoute = require("./routes/MessageRoute");

app.use(UserRoute);
app.use(ConversationRoute);
app.use(MessageRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
