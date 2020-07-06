
let categoria, subcategoria;

      const button = document.getElementById('btnaddCategoria');
      button.addEventListener('click', async event => {
        categoria = document.getElementById("inputCategoria").value;
        subcategoria = document.getElementById("inputSubcategoria").value;
        
        if(categoria && subcategoria){
          const data = { categoria,subcategoria};
          console.log(data);
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          const response = await fetch('/gravaitens', options);
          if(response){
            console.log("gravado com sucesso");
          }else{
            console.log("erro");
          }
          const json = await response.json();
          console.log(json);
      }
      });
      

