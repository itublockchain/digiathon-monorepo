const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const whitelistMiddleware = require("../middlewares/whitelistMiddleware");
const SignRequest = require("../models/SignRequest");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const SubmittedDocument = require("../models/SubmittedDocument");
const Verification = require("../models/Verification");

/**
 * @dev Get single request by id
 */
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const request = await SignRequest.findOne({
      _id: id,
    });

    const uploadedDocument = await SubmittedDocument.findOne({
      requestId: id,
    });

    const verification = await Verification.findOne({
      requestId: id,
    });

    let payload = {};
    if (request != null) {
      payload = {
        _id: request._id,
        submitted: request.submitted,
        sender: request.sender,
        created: request.created,
        title: request.title,
        document: uploadedDocument,
        verification: verification,
      };
      res.json(payload);
    } else {
      res.status(404).json({
        msg: "Request not found",
      });
    }
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
 * @dev Get all requests other than me
 */
router.post("/approvals", authMiddleware, async (req, res) => {
  const { sender } = req.body;

  try {
    const doc = await SignRequest.find({
      sender: { $ne: sender },
      submitted: true,
    }).sort({ _id: 1 });
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

      const newRequest = new SignRequest({
        title: title,
        sender: sender,
      });

      await newRequest.save();

      return res.json(newRequest);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        msg: "Server error",
      });
    }
  }
);

/**
 * @dev Submit document for request
 */
router.post(
  "/:id/submit",
  authMiddleware,
  body("data")
    .isString()
    .isLength({
      min: 1,
    })
    .withMessage("Data must be filled"),
  body("hash")
    .isString()
    .isLength({
      min: 1,
    })
    .withMessage("Hash must be filled"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { data, hash } = req.body;
      const { id } = req.params;

      const newDocument = new SubmittedDocument({
        data,
        requestId: id,
        hash,
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

/**
 * @dev Submit document for signing
 */
router.post("/:id/submitForSign", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const newDocument = await SignRequest.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { submitted: true } }
    );

    await newDocument.save();

    return res.json(newDocument);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

/**
 * @dev Get document verification
 */
router.get("/:id/verification", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Verification.findOne({
      requestId: id,
    });

    if (doc == null) {
      return res.status(404).json({ msg: "Not found" });
    }

    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

/**
 * @dev Get document verification
 */
router.post("/:id/verify", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, type } = req.body;

    const doc = new Verification({
      sender: sender,
      type: type,
      requestId: id,
      comment: "",
    });

    await doc.save();

    return res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;
