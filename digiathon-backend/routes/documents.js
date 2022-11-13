const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SubmittedDocument = require("../models/SubmittedDocument");
const router = express.Router();
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");

const PDFMerger = require("pdf-merger-js");
var merger = new PDFMerger();

/**
 * @dev Get document with id
 */
router.get("/:hash", authMiddleware, async (req, res) => {
  const hash = req.params.hash;
  const document = await SubmittedDocument.findOne({
    hash: hash,
  });

  QRCode.toDataURL(`http://localhost:3000/belge/${hash}`, function (err, url) {
    if (err) throw err;
    res.json({
      image: url,
      data: document.data,
    });
  });
});

module.exports = router;
