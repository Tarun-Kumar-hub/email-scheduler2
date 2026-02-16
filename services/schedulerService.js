import schedule from "node-schedule";
import db from "../config/db.js";
import { sendEmail } from "./emailService.js";

export function startScheduler() {
  schedule.scheduleJob("0 9 * * 6", async function () {
    try {
      const users = await db.query("SELECT id,email FROM users");

      for (const user of users.rows) {
        await sendEmail(user);
      }

      console.log("Weekly email job running");
    } catch (err) {
      console.error(err);
    }
  });
}
