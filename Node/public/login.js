
document.getElementById('login-tag').
addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = e.target.id.value;
    const passwd = e.target.pw.value;
    console.log("id : " , id );
    console.log("pw : " , passwd );

    try {
    const result = await axios.post('/login', { id,passwd })
    .then((res)=>{
        return res.data;
    });
    console.log(result);
      if(result == true){
        console.log("로그인 성공, 메인 페이지로 이동");
        location.href = '/';
        // 메인페이지.html 열어 주세요
      } else{
        console.log("로그인 실패 alert 알림문 출력");
        alert('로그인 실패, 다시입력');
        e.target.id.value = '';
        e.target.pw.value = '';
      }
      
    } catch (err) {
      console.error('err');
    }
    
    

  });
