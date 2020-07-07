const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const jwt = require("jsonwebtoken");
const jwtSecret = "@airman66:WQKf3D3t";

router.get("/", async (req, res) => {
    try {
        if (req.cookies.token) {
            const {token} = req.cookies;
            const verification = await jwt.verify(token, jwtSecret);
            if (verification.adminId) {
                const reviews = await Review.find({});
                return res.render("admin/admin-reviews", {reviews});
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
                return res.render("admin/admin-reviews-add");
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
                const {author, text} = req.body;
                const review = await new Review({text, author});
                await review.save();
                return res.redirect("/admin/reviews");
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
                const allReviews = await Review.find({});
                if (allReviews[id - 1]) {
                    await Review.findOneAndRemove({_id: allReviews[id - 1]._id});
                }
                return res.redirect("/admin/reviews");
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
                const allReviews = await Review.find({});
                if (allReviews[id - 1]) {
                    return res.render("admin/admin-reviews-edit", {review: allReviews[id - 1], id});
                }
                return res.redirect("/admin/reviews");
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
                const allReviews = await Review.find({});
                if (allReviews[id - 1]) {
                    const {author, text} = req.body;
                    await Review.findOneAndUpdate({_id: allReviews[id - 1]._id}, {text, author});
                }
                return res.redirect("/admin/reviews");
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