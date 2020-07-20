
let categoria, subcategoria,artigo;

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

      const butt = document.getElementById('btnArtigo');
      butt.addEventListener('click', async event => {
        let selectcat = document.getElementById('subList');
        let id=document.getElementById('subList').value;
        categoria = selectcat.options[selectcat.selectedIndex].text;
        let selectsub = document.getElementById(id);
        subcategoria = selectsub.options[selectsub.selectedIndex].text;
        let selectartigo = document.getElementById('artigosList');
        let idart=document.getElementById('artigosList').value;
        artigo = selectartigo.options[selectartigo.selectedIndex].text;
        console.log(categoria);
        console.log(id);
        console.log(subcategoria);
        console.log(artigo);
        console.log(idart);
        
          const data = { categoria,subcategoria,artigo};
          console.log(data);
          /*const options = {
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
          console.log(json);*/
      
      });

