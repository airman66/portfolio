const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const profiles = await Profile.find({});
                return res.render("admin/admin-profiles", {profiles});
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.get("/add", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                return res.render("admin/admin-profiles-add");
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.post("/add", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const {prompt, link, icon} = req.body;
                const profile = await new Profile({icon, link, prompt});
                await profile.save();
                return res.redirect("/admin/profiles");
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const {id} = req.params;
                const profiles = await Profile.find({});
                const profile = profiles[id - 1];
                return res.render("admin/admin-profiles-edit", {profile, profileNumber: id});
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const {id} = req.params;
                const {prompt, link, icon} = req.body;
                const profiles = await Profile.find({});
                await Profile.findOneAndUpdate({_id: profiles[id - 1]._id}, {icon, prompt, link});
                return res.redirect("/admin/profiles");
            }
            return res.redirect("/");
        }
        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.status(500).json({ok: false, message: "Что-то пошло не так, попробуйте снова"});
    }
});

router.get("/remove/:id", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const {id} = req.params;
                const profiles = await Profile.find({});
                await Profile.findOneAndRemove({_id: profiles[id - 1]._id});
                return res.redirect("/admin/profiles");
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