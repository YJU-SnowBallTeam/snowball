const board = require('../models/board');

// 모든 게시글 조회
const getAllPost = async (req, res) => {
  try {
    const posts = await board.find({});
    res.status(200).render('board', { posts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 게시글 작성 GET / POST
const getWrite = (req, res) => {
  try {
    res.status(200).render('writePage/writePage');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postWrite = async (req, res) => {
  try {
    const {
      body: { title, content, boarder },
    } = req;
    const post = await board.create({
      title,
      content,
      boarder,
    });
    res.redirect(`/board/post/${post._id}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 특정 게시글 GET / DELETE
const getOnePost = async (req, res) => {
  try {
    const {
      params: { post_id },
    } = req;
    const post = await board.findOne({ _id: post_id });
    res.status(200).render('board', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOnePost = async (req, res) => {
  try {
    const {
      params: { post_id },
    } = req;
    await board.findOneAndDelete({ _id: post_id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// 게시글 수정 GET / POST
const getEditPost = async (req, res) => {
  try {
    const {
      params: { post_id },
    } = req;
    const post = await board.findOne({ _id: post_id });
    res.status(200).render('editPost', { post });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const postEditPost = async (req, res) => {
  try {
    const {
      params: { post_id },
      body: { title, content },
    } = req;
    await board.findOneAndUpdate({ _id: post_id }, { title, content });
    res.redirect(`/board/post/${post_id}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getAllPost,
  getWrite,
  postWrite,
  getOnePost,
  getEditPost,
  postEditPost,
  deleteOnePost,
};