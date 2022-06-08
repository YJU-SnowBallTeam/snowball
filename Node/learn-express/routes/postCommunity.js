const express = require('express');
const postRouter = express.Router();

const {
  getAllPost,
  getWrite,
  postWrite,
  getOnePost,
  getEditPost,
  postEditPost,
  deleteOnePost,
} = require('./communitycontrol');

// 모든 게시글 조회
postRouter.get('/', getAllPost);

// 게시글 작성 GET / POST
postRouter.get('/post', getWrite);
postRouter.post('/post', postWrite);

// 특정 게시글 GET / DELETE
postRouter.get('/post/:postId', getOnePost);
postRouter.delete('/post/:postId', deleteOnePost);

// 게시글 수정 GET / POST
postRouter.get('/post/edit/:postId', getEditPost);
postRouter.post('/post/edit/:postId', postEditPost);

module.exports = postRouter;



/* 1. 게시판에 보여줄 전체 글 조회
	- GET /
  - getAllPost

2. 글쓰기 버튼을 눌렀을 때 나올 게시글 작성 페이지
	- GET /post
	- getWrite
    
3. 작성이 끝나고 클라인언트가 submit 했을 때 데이터 전달
	- POST /post
	- postWrite

4. 게시판에서 특정 게시글을 눌렀을 때 해당 게시글 정보 보여주기
	- GET /post/:postId
	- getOnePost

5. 해당 게시글 삭제
	- DELETE /post/:postId
	- deleteOnePost
    
6. 게시글을 수정할 수 있는 페이지
	- GET /post/edit/:postId
	- getEditPost

7. 게시글 수정 완료 후 submit 했을 때 수정된 데이터 전송
	- POST /post/edit/:postId
	- postEditPost */