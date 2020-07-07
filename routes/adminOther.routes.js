const express = require("express");
const router = express.Router();
const OtherData = require("../models/OtherData");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const otherData = await OtherData.find({});
                const other = otherData[0];
                return res.render("admin/admin-other", other);
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.get("/edit", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const otherData = await OtherData.find({});
                const other = otherData[0];
                return res.render("admin/admin-other-edit", other);
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.post("/edit", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const otherData = await OtherData.find({});
                const other = otherData[0];
                await OtherData.findOneAndUpdate({_id: other._id}, req.body);
                return res.redirect("/admin/other");
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});


module.exports = router;