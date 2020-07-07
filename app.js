const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const isemail = require("isemail");
const path = require("path");
const mailer = require("./nodemailer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoUri = "mongodb+srv://admin:WQKf3D3t@cluster0.1c3fn.mongodb.net/app?retryWrites=true&w=majority";
const adminRouter = require("./routes/admin.routes.js");
const Review = require("./models/Review");
const Work = require("./models/Work");
const Technology = require("./models/Technology");
const Profile = require("./models/Profile");
const OtherData = require("./models/OtherData");

function insertVariables (str, variables) {
    const interpolationRegExp = /\$\$\[([(a-z-A-Z.)]*)]/g;
    const matches = Array.from(str.matchAll(interpolationRegExp));
    const replacements = {};
    for (const match of matches) {
        if (variables[match[1]]) {
            replacements[match[1]] = variables[match[1]];
        }
    }
    return str.replace(/\$\$\[(\w+)]/g, (m, g1) => replacements[g1]);
}

app.set('view engine', 'pug');

app.use(cookieParser("@airman66:WQKf3D3t"));

app.use(express.static(path.resolve(__dirname, "public")));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try {
        const otherdatas = await OtherData.find({});
        const {about, email, copyright, resume, name, profession, photo} = otherdatas[0];
        const reviews = await Review.find({});
        const works = await Work.find({});
        const technologies = await Technology.find({});
        let randomNumber = Math.ceil(Math.random() * reviews.length);
        if (randomNumber !== 0) {
            randomNumber -= 1;
        }
        const randomReview = reviews[randomNumber];
        const vars = {
            worksAmount: works.length,
            reviewsAmount: reviews.length,
            myEmail: email
        };
        const profiles = await Profile.find({});
        return res.render("index", {
            randomReview,
            works,
            technologies,
            about: insertVariables(about, vars),
            resume: insertVariables(resume, vars),
            email,
            profiles,
            copyright,
            name,
            profession,
            photo
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

app.post("/", async (req, res) => {
    try {
        const {email, text} = req.body;
        if (isemail.validate(email) && text.trim()) {
            const other = await OtherData.find({});
            const myEmail = other[0].email;
            const message = {
                to: myEmail,
                subject: "Обращение с сайта-портфолио",
                html: `
        <h2>Почта отправителя - ${email}</h2>
        <p>${text}</p>
        `
            };
            mailer(message);
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

app.get("/reviews", async (req, res) => {
    try {
        const reviews = await Review.find({});
        const otherData = await OtherData.find({});
        const {name, photo, profession, copyright} = otherData[0];
        return res.render("reviews", {
            reviews,
            lastIndex: reviews.length - 1,
            name,
            photo,
            profession,
            copyright
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

app.get("/work/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const works = await Work.find({});
        const otherData = await OtherData.find({});
        const {name, photo, profession, copyright} = otherData[0];
        if (works[id - 1]) {
            const work = works[id - 1];
            return res.render("work", {
                work,
                name,
                photo,
                profession,
                copyright
            });
        }
        return res.redirect("/#works");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

app.use("/admin", adminRouter);

app.use(function(req, res) {
    res.status(404);
    return res.redirect("/");
});

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(port);
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();