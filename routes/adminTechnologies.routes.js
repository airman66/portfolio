const express = require("express");
const router = express.Router();
const Technology = require("../models/Technology");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const technologies = await Technology.find({});
                return res.render("admin/admin-technologies", {technologies});
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
                return res.render("admin/admin-technologies-add");
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
                const {name} = req.body;
                const technology = await new Technology({name});
                await technology.save();
                return res.redirect("/admin/technologies");
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
                const technologies = await Technology.find({});
                return res.render("admin/admin-technologies-edit", {technology: technologies[id - 1], technologyNumber: id});
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
                const {name} = req.body;
                const {id} = req.params;
                const technologies = await Technology.find({});
                await Technology.findOneAndUpdate({_id: technologies[id - 1]._id}, {name});
                return res.redirect("/admin/technologies");
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
                const technologies = await Technology.find({});
                if (technologies[id - 1]) {
                    await Technology.findOneAndRemove({_id: technologies[id - 1]._id});
                }
                return res.redirect("/admin/technologies");
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