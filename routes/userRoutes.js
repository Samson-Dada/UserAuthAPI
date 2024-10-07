import express from "express";
// import userController from "./../controllers/userController.js";
import {
	signup,
	login,
	forgotPassword,
	resetPassword,
	restrictTo,
	protect,
	updatePassword,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);

// router.patch("/updateMe", protect, userController.updateMe);
// router.delete("/deleteMe", protect, userController.deleteMe);

// router
// 	.route("/")
// 	.get(userController.getAllUsers)
// 	.post(userController.createUser);

// router
// 	.route("/:id")
// 	.get(userController.getUser)
// 	.patch(userController.updateUser)
// 	.delete(userController.deleteUser);

export default router;
