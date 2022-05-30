

console.log(document.querySelector('#login-from'));
document.getElementById('login-tag').
addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = e.target.id.value;
    const passwd = e.target.pw.value;
    console.log("id : " , id );
    console.log("pw : " , passwd );

    try {
      await axios.post('/login', { id,passwd });
    } catch (err) {
      console.error(err);
    }
    
  });

  document.getElementById('btn').addEventListener('submit',async(e) =>{
    e.preventDefault();
})