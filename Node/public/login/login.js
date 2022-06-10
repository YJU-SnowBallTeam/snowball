document.getElementById("login-tag").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = e.target.id.value;
  const passwd = e.target.pw.value;
  console.log("id : ", id);
  console.log("pw : ", passwd);

  try {
    const user = await axios.post("/login", { id, passwd }).then((res) => {
      return res.data;
      /* routes/login.js에서 받아온 유저 데이터 */
    });
    console.log(user);
    if (user !== false) {
      if (user === "falsed") {
        return alert("비번틀림");
      }

      const isLogined = user;
      console.log("IsLogined는 ", isLogined);
      await axios.post("/logined", { user });
      // index.js의 logined로 post요청을 보낸다.
      location.href = "/logined";
      console.log("로그인 성공");

      // 메인페이지.html 열어 주세요
    } else {
      console.log("로그인 실패 alert 알림문 출력");
      alert("로그인 실패, 다시입력");
      e.target.id.value = "";
      e.target.pw.value = "";
    }
  } catch (err) {
    console.error(err);
  }
});
