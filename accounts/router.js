const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("accounts").select());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .select()
    );
  } catch (err) {
    next(err);
  }
});

router.post("/", validateAccount, async (req, res, next) => {
  try {
    res.json(await db("accounts").insert(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .update(req.body)
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .del()
    );
  } catch (err) {
    next(err);
  }
});

function validateAccount(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No data received from client post." });
  } else if (!req.body.name || !req.body.budget) {
    res
      .status(400)
      .json({ error: "One or more required fields not received." });
  } else if (!Number.isInteger(req.body.budget)) {
    res.status(400).json({ error: "Wrong data type sent in budget field." });
  } else next();
}

// function validateAccountId(req, res, next) {
//   if (
//     db("accounts")
//       .where("id", req.params.id)
//       .select()
//   ) {
//     res.status(404).json({ error: "That account is not on file." });
//   } else next();
// }

module.exports = router;
