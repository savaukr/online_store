const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const devicerRouter = require("./deviceRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");

router.use("/user", userRouter);
router.use("/brand", brandRouter);
router.use("/device", devicerRouter);
router.use("/type", typeRouter);

module.exports = router;
