const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const whitelistMiddleware = require("../middlewares/whitelistMiddleware");
const SignRequest = require("../models/SignRequest");
const router = express.Router();
const { body, validationResult } = require("express-validator");

/**
 * @dev Get single request by id
 */
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await SignRequest.findOne({
      _id: id,
    });
    res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

/**
 * @dev Get all requests by sender
 */
router.get("/", authMiddleware, async (req, res) => {
  const { sender } = req.query;

  try {
    const doc = await SignRequest.find({
      sender,
    }).sort({ _id: -1 });
    res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

/**
 * @dev Create a new document sign request
 */
router.post(
  "/",
  authMiddleware,
  body("title")
    .isString()
    .isLength({
      min: 1,
    })
    .withMessage("Title must be filled"),
  body("sender")
    .isString()
    .isLength({
      min: 1,
    })
    .withMessage("Sender must be string"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, sender } = req.body;

      const newDocument = new SignRequest({
        title: title,
        sender: sender,
      });

      await newDocument.save();

      return res.json(newDocument);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

module.exports = router;
