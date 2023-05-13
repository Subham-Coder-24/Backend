const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticateduser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticateduser, getUserDetails);
router.route("/password/update").put(isAuthenticateduser, updatePassword);
router.route("/me/update").put(isAuthenticateduser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticateduser, authorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticateduser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticateduser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticateduser, authorizeRoles("admin"), deleteUser);
  
module.exports = router;
