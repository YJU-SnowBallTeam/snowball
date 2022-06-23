document.getElementById("login-tag").
addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = e.target.id.value;
  const passwd = e.target.pw.value;

  try {
    const user = await axios.post("/login", { id, passwd }).then((res) => {
      return res.data;
    });
    if (user !== false) {
      if (user === "falsed") {
        return alert("비번틀림");
      }
      // 로그인 성공시
      location.href = '/login/logined';
    } else {
      alert("로그인 실패, 다시입력");
      e.target.id.value = "";
      e.target.pw.value = "";
    }
  } catch (err) {
    console.error(err);
  }
});
