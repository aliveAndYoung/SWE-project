const express = require("express");
const logger = require("./middlewares/logger.js");
const idChecker = require("./middlewares/idChecker.js");
const productsRouter = require("./routes/products.js");
const usersRouter = require("./routes/users.js");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/products", productsRouter);
app.use("/users", usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
