const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Backend!</h2>`);
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n ~* Server is live at http://localhost:${port} *~ \n`);
});
