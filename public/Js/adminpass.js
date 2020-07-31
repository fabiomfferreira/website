let password;

//POST Request muda password do admin
const button = document.getElementById('btn-changepass');
  button.addEventListener('click', async event => {
    password = document.getElementById("inputPassword").value;
    const data = {password};
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      };
      const response = await fetch('/novapassword', options);
      if(response){
        console.log("gravado com sucesso");
      }else{
        console.log("erro");
        }
      const json = await response.json();
  });
    
      