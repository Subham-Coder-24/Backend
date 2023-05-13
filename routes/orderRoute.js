const express = require("express");
const { isAuthenticateduser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/order/new").post(isAuthenticateduser, newOrder);
router.route("/order/:id").get(isAuthenticateduser, getSingleOrder);

router.route("/orders/me").get(isAuthenticateduser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticateduser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticateduser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticateduser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
