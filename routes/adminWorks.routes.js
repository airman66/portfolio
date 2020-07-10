const express = require("express");
const router = express.Router();
const Work = require("../models/Work");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const works = await Work.find({});
                return res.render("admin/admin-works", {works});
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
                return res.render("admin/admin-works-add");
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
                const {
                    name,
                    description,
                    image,
                    category,
                    link,
                    year,
                    workHeading,
                    previewImage
                } = req.body;
                const work = await new Work({image, name, year, description, category, workHeading, link, previewImage});
                await work.save();
                return res.redirect("/admin/works");
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
                const works = await Work.find({});
                const work = works[id - 1];
                return res.render("admin/admin-works-edit", {work, workNumber: id});
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
                const {
                    name,
                    description,
                    image,
                    category,
                    link,
                    year,
                    workHeading,
                    previewImage
                } = req.body;
                const works = await Work.find({});
                await Work.findOneAndUpdate({_id: works[id - 1]._id}, {
                    name,
                    description,
                    image,
                    category,
                    link,
                    year,
                    workHeading,
                    previewImage
                });
                return res.redirect("/admin/works");
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
                const works = await Work.find({});
                await Work.findOneAndRemove({_id: works[id - 1]._id});
                return res.redirect("/admin/works");
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