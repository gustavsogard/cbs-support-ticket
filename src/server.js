const express = require("express");
const app = express();
const host = "localhost";
const port = 3000;
const http = require("http").Server(app);
const path = require("path");

const { init } = require("./lib/database/init");
init();

app.use(express.json());

const clientRoutes = require("./routes/client");
const supportTicketsApi = require("./api/support-tickets");
const usersApi = require("./api/users");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", clientRoutes);
app.use("/api/support-tickets", supportTicketsApi);
app.use("/api/users", usersApi);

http.listen(port, host, () => {
  console.log(`Serveren kører på http://${host}:${port}`);
});
