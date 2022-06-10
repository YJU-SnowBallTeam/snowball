console.log(document.getElementById('user-form'));
document.getElementById('user-form').
addEventListener('submit', async (e) => {
    e.preventDefault();
    var class1 = document.getElementById('area2');
    const id = e.target.id.value;
    const passwd = e.target.passwd.value;
    const pwcheck = e.target.pwcheck.value;
    const name = e.target.name.value;
    const tel = e.target.tel.value;
    const email = e.target.email.value;
    const yjuclass =  class1.options[class1.selectedIndex].text;
    const grade = e.target.grade.value;
    console.log("id : " , id );
    console.log("pw : " , passwd );
    console.log("pwcheck : " , pwcheck );
    console.log("name: " , name );
    console.log("TEL : " , tel );
    console.log("EMail: " , email );
    console.log("grade: " , grade );
    console.log("yjuclass: ",yjuclass );
    try {
      const result = await axios.post('/user', { id,passwd,pwcheck,name,tel,email,yjuclass,grade })
      .then((res) =>{
        return res.data
      });
      console.log(result);
      if(result){
        console.log("회원가입 성공");
        location.href = '/login';
      }
      else{
        alert("회원가입실패")
      }
    } catch (err) {
      console.error(err);
    }
    
  });