const express = require("express");
const productRouter = require("./routes/product.router");
const orderRouter = require("./routes/order.router");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use("/api", productRouter);
app.use("/api", orderRouter);


app.listen(PORT, () => console.log(`server started on ${PORT}`));
