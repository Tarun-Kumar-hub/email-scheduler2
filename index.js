import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import env from "dotenv";

import nodemailer from'nodemailer';
import  ejs from 'ejs';
//important imports
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

let items = [
  { id: "30", task: "drinking" },
  { id: "40", task: "party" },
];

const mailTransport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo's SMTP server
  port: 587, // Port for TLS (use 465 if you want SSL)
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.BREVO_USER, // Brevo API key
    pass: process.env.BREVO_PASSWORD // Brevo API key
  }
});

// Function to send email
async function sendEmail(user) {
    try {
    const result = await db.query("SELECT * FROM list  WHERE user_id = $1;",[user.id]);
    items = result.rows;
    console.log(items);
// Read and render the EJS email template
  const templatePath = path.join(__dirname, 'views/email.ejs');
  const emailHTML = await ejs.renderFile(templatePath , {
    listItems: items,
  });
  console.log("Rendered HTML:", emailHTML);

  const emailOptions = {
    from: '"Tarun1" <ctarun301@gmail.com>',
    to: user.email, 
    subject: 'Item List',
    html: emailHTML // Use the rendered HTML as email content
  };

  try {
    const result = await mailTransport.sendMail(emailOptions);
    //console.log('Email sent:', result);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}catch (err) {
  console.log(err);
  }};
  


import schedule from 'node-schedule';

//const j = schedule.scheduleJob('0 9 * * 6', function(){
//  sendEmail();
//  console.log('Task running every Saturday at 9:00 AM!');
//});


      // Schedule job to send email every Saturday at 9:00 AM
schedule.scheduleJob('0 9 * * 6', async function() {
  try {
    const users = await db.query("SELECT id, email FROM users");
    console.log(users.rows)
    for (const user of users.rows) {
      await sendEmail(user);
      
    }
    console.log('Task running every Saturday at 9:00 AM!');
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});

// Example of a job running every 1 minute (for testing purposes)
//schedule.scheduleJob('*/1 * * * *', async function() {
// try {//   const users = await db.query("SELECT id, email FROM users");
//   for (const user of users.rows) {
//     await sendEmail(user);//   }
//   console.log('Running task every 1 minute');
// } catch (error) {
//   console.error('Error in scheduled job:', error);
// }
//}); 

//let totalCorrect = 0;



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.get("/do",async(req,res)=>{
    console.log(req.user);
    
    if (req.isAuthenticated()) {
      try {
      const result = await db.query("SELECT * FROM list  WHERE user_id = $1;",[req.user.id]);
      items = result.rows;
      console.log(items);

      res.render("index.ejs", {
        listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
    } else {
      res.redirect("/");
    }
  });
  


app.post("/add",async(req,res)=>{
  if (req.isAuthenticated()) {
    const newTask = req.body.new_item;
  if (newTask && newTask.trim() !== "") {
  console.log(newTask);
  try{
    const result = await db.query("INSERT INTO list (user_id, task) VALUES ($1, $2)", [req.user.id, newTask]);
  }catch (err) {
    console.log(err);
  }
}
  res.redirect(303,"/do");

  } else {
    res.redirect("/");
  }
});

app.post("/edit",async(req,res)=>{
  if (req.isAuthenticated()) {
    const editItemId = req.body.editItemId;
  const updatedTask=req.body.updatedTitle;
  try{
     await db.query("UPDATE list SET task = $1 WHERE id = $2 AND user_id = $3", [updatedTask, editItemId, req.user.id]);
  }catch (err) {
    console.log(err);
  }
  res.redirect(303,"/do");
  } else {
    res.redirect("/");
  }
  
});

app.post("/delete",async(req,res)=>{
    // console.log(req.user);
    if (req.isAuthenticated()) {
      const deleteItemId =req.body.deleteItemId;
    try{
      await db.query("DELETE FROM list WHERE id = $1 AND user_id = $2", [deleteItemId, req.user.id]);
    }catch(err){
      console.log(err);
    }
    res.redirect(303,"/do");
    } else {
      res.redirect("/");
    }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/do",
  passport.authenticate("google", {
    successRedirect: "/do",
    failureRedirect: "/",
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/do",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
