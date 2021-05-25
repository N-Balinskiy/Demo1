const Router = require("express");
const router = new Router();
const orderController = require("../controllers/order.controller");

router.post("/", orderController.createOrder);
router.get("/",  orderController.getOrders); 
router.get("/:id", orderController.getOneOrder);
router.put("/:id", orderController.editOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;