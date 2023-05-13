const express = require("express");
const router = express.Router();
const { isAuthenticateduser } = require("../middleware/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

router.route("/payment/process").post(isAuthenticateduser, processPayment);
router.route("/stripeapikey").get(isAuthenticateduser, sendStripeApiKey);

module.exports = router;
