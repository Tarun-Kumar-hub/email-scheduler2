import express from "express";
import db from "../config/db.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.get("/do", async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  const result = await db.query(
    "SELECT * FROM list WHERE user_id=$1 ORDER BY priority DESC,id ASC",
    [req.user.id],
  );

  res.render("index.ejs", {
    listItems: result.rows,
    user: { name: req.user.name, photo: req.user.photo },
    emailSent: req.query.sent === "1",
  });
});

router.post("/add", async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  await db.query(
    "INSERT INTO list(user_id,task,priority,category) VALUES($1,$2,$3,$4)",
    [
      req.user.id,
      req.body.new_item,
      req.body.priority || 1,
      req.body.category || null,
    ],
  );

  res.redirect("/do");
});

router.post("/send", async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");

  await sendEmail(req.user);
  res.redirect("/do?sent=1");
});

export default router;
