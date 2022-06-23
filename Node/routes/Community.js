const express = require("express");
const Board = require("../models/board");
const Comment = require("../models/comment");
const moment = require("moment");

const router = express.Router();



// 커뮤니티 전체 리스트
router.route("/")
    .get(async (req, res, next) => {
        const user = await req.session.IsLogined;
        const boarders = await Board.findAll({
            order: [["post_id", "DESC"]],
            offset: 0,
        });
        boarders.forEach((el) => {
            el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
        });
        res.render("Community/Community", { boarders, user });
    })
    // 커뮤니티 글 작성
    .post(async (req, res, next) => {
        try {
            let body = req.body;
            await Board.create({
                title: body.inputTitle,
                content: body.inputContent,
                boarder: body.inputWriter,
            });
            res.redirect("/Community");
        } catch (err) {
            next(err);
        }
    });

// 커뮤니티 작성 창
router.get("/CommunityAdd", (req, res) => {
    const user = req.session.IsLogined;
    res.render("Community/CommunityAdd", { user }); 
});



// select
router.get("/:postId", async (req, res, next) => {
    try {
        const user = await req.session.IsLogined;
        const { postId } = req.params;
        const board = await Board.findOne({ where: { post_id: postId } });
        const comments = await Comment.findAll({
            where: { post_id: postId },
            order: [["post_id", "DESC"]],
            offset: 0,
        });

        comments.forEach((el) => {
            el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
        });

        console.log(comments);
        res.render("Community/Community-detail", { board, comments, user });
    } catch (err) {
        next(err);
    }
    // error 처리
});

// detail - comment Insert
router.post("/comment/:postId", async (req, res, next) => {
    try {
        let body = req.body;
        console.log("===================");
        console.log(req.params.postId);
        console.log("===================");
        console.log(body);
        //  console.log(body.inputContent);
        await Comment.create({
            post_id: req.params.postId,
            content: body.inputContent,
            // content: body.inputContent,
            commenter: body.inputCommentWriter,
        });
        // console.log("success");
        res.redirect("/Community/" + req.params.postId);
        // return res.status(200).send("success");
        // res.render("Community/Community/Community-detail");
    } catch (err) {
        next(err);
    }
});

// 업데이트 창 가져오기
router.get("/:postId/update", async (req, res, next) => {
    const user = await req.session.IsLogined;
    const { postId } = req.params;
    const board = await Board.findOne({ where: { post_id: postId } });
    res.render("Community/Community-update", { board, user });
    // 제목
    // 작성자
    // 내용
});

// update
router.put("/update/:postId", async (req, res, next) => {
    try {
        let body = req.body;
        console.log("=========================");
        console.log(body);
        console.log(body.inputContent);
        console.log("=========================");
        await Board.update(
            {
                //   post_id: this.post_id,
                title: body.inputTitle,
                content: body.inputContent,
                boarder: body.inputWriter,
                //   date: now,
            },
            {
                where: { post_id: req.params.postId },
            }
        );
        res.redirect("/Community/" + req.params.postId);
        return res.status(200).send("success");
    } catch (err) {
        next(err);
    }
});

// comment update 창 가져오기
router.get("/comment/update/:comment_id", async (req, res, next) => {
    const user = await req.session.IsLogined;
    console.log(req.params);
    const { comment_id } = req.params;
    // console.log(comment_id);
    const comment = await Comment.findOne({ where: { comment_id: comment_id } });
    res.render("Community/CommunityCommentUpdate", { comment, user });
    // 제목
    // 작성자
    // 내용
});

// comment Update
router.put("/comment/update/:commentId", async (req, res, next) => {
    try {
        let body = req.body;
        console.log("=========================");
        console.log(body);
        console.log(body.inputContent);
        console.log("=========================");
        await Comment.update(
            {
                content: body.inputContent,
                commenter: body.inputCommentWriter,
            },
            {
                where: { comment_id: req.params.commentId },
            }
        );
        res.redirect(`/Community/${body.inputPostId}`);
        return res.status(200).send("success");
    } catch (err) {
        next(err);
    }
});

// 삭제
router.delete("/delete/:postId", async (req, res, next) => {
    const { postId } = req.params;
    console.log("====================");
    console.log(postId);
    console.log("====================");
    const board = await Board.destroy({ where: { post_id: postId } });
    return res.send("success");
});

// 삭제 comment
router.delete(
    "/comment/delete/:commentId",
    async (req, res, next) => {
        const { commentId } = req.params;
        const comment = await Comment.destroy({ where: { comment_id: commentId } });
        // res.redirect("/Community/" + req.params.postId);
        return res.send("delete comment success");
    }
);

// 삭제
router.delete("/delete/:postId", async (req, res, next) => {
    const { postId } = req.params;
    console.log("====================");
    console.log(postId);
    console.log("====================");
    const board = await Board.destroy({ where: { post_id: postId } });
    return res.send("success");
});

// 삭제 comment
router.delete(
    "/comment/delete/:commentId",
    async (req, res, next) => {
        const { commentId } = req.params;
        const comment = await Comment.destroy({ where: { comment_id: commentId } });
        // res.redirect("/Community/" + req.params.postId);
        return res.send("delete comment success");
    }
);


module.exports = router;