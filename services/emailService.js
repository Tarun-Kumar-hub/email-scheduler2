import db from "../config/db.js";
import mailTransport from "../config/mail.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendEmail(user) {
  try {
    const result = await db.query("SELECT * FROM list WHERE user_id = $1", [
      user.id,
    ]);

    const templatePath = path.join(__dirname, "../views/email.ejs");

    const emailHTML = await ejs.renderFile(templatePath, {
      listItems: result.rows,
    });

    await mailTransport.sendMail({
      from: '"Home2Dorm" <ctarun301@gmail.com>',
      to: user.email,
      subject: "Your Weekly Task List",
      html: emailHTML,
    });

    console.log("Email sent");
  } catch (err) {
    console.error(err);
  }
}
