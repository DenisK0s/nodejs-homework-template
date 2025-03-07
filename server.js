const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const uriDb = process.env.DB_HOST;

mongoose
  .connect(uriDb)
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
