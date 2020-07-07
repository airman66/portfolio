const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";
const reviewsRouter = require("./adminReviews.routes");
const worksRouter = require("./adminWorks.routes");
const technologiesRouter = require("./adminTechnologies.routes");
const profilesRouter = require("./adminProfiles.routes");
const otherRouter = require("./adminOther.routes");

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                return res.render("admin/admin-panel");
            }
            return res.render("admin/login");
        }
        return res.render("admin/login");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.post("/", async (req, res) => {
    try {
        const {nickname, password} = req.body;
        const admin = await Admin.findOne({ nickname });
        if (!admin) {
            return res.redirect("/");
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.redirect("/");
        }
        const token = jwt.sign(
            { adminId: admin._id },
            jwtSecret,
            { expiresIn: '10h' }
        );
        res.cookie("token", token);
        return res.redirect("/admin");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.use("/reviews", reviewsRouter);

router.use("/works", worksRouter);

router.use("/technologies", technologiesRouter);

router.use("/profiles", profilesRouter);

router.use("/other", otherRouter);

module.exports = router;