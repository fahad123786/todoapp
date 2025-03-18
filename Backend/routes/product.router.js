const express = require('express');
const router = express.Router();

const controller = require('../controller/product.controller')

router.post("/", controller.store);
router.post("/user/:userId", controller.storing);
router.get("/",controller.index);
router.get("/:id",controller.get);
router.get("/user/:userId", controller.getting);
router.delete("/:id", controller.destroy);
router.put("/:id", controller.update)


module.exports= router;