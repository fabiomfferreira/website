
let categoria, subcategoria;

     const button = document.getElementById('btnaddCategoria');
      button.addEventListener('click', async event => {
        categoria = document.getElementById("inputCat").value;
        subcategoria = document.getElementById("inputSubcategoria").value;
        

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
      });
      
      const buttonall = document.getElementById('btnaddsubCategoria');
      buttonall.addEventListener('click', async event => {
        let selectcat = document.getElementById('subMenuList');
        let id=document.getElementById('subMenuList').value;
	      categoria = selectcat.options[selectcat.selectedIndex].text;
        console.log(categoria);
        console.log(id);
        subcategoria = document.getElementById("inputSub").value;
        
          const data = { categoria,subcategoria};
          console.log(data);
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };
          const response = await fetch('/gravasub', options);
          if(response){
            console.log("gravado com sucesso");
          }else{
            console.log("erro");
          }
          const json = await response.json();
          console.log(json);
      
      });

