let categoria, subcategoria;

//POST request elimina itens - categoria
      const buttonc = document.getElementById('btnremoveCategoria');
      buttonc.addEventListener('click', async event => {
        let selectcat = document.getElementById('subMenu');
        let id=document.getElementById('subMenu').value;
	      categoria = selectcat.options[selectcat.selectedIndex].text;
        console.log(categoria);
        console.log(id);

        const data = { categoria};
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/eliminacategoria', options);
        if(response){
          console.log("gravado com sucesso");
        }else{
          console.log("erro");
        }
        const json = await response.json();
        console.log(json);
      });

  //POST request elimina itens - subcategoria
      const buttons=document.getElementById('btnremovesubCategoria');
      buttons.addEventListener('click', async event => {
        let selectcat = document.getElementById('subMenuList');
        let id=document.getElementById('subMenuList').value;
	      categoria = selectcat.options[selectcat.selectedIndex].text;
        let selectsub = document.getElementById(id);
        subcategoria = selectsub.options[selectsub.selectedIndex].text;
        console.log(categoria);
        console.log(id);
        console.log(subcategoria);
        const data = {categoria,subcategoria};
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/eliminasubcategoria', options);
        if(response){
          console.log("gravado com sucesso");
        }else{
          console.log("erro");
        }
        const json = await response.json();
        console.log(json);
      });

      const buttonremove=document.getElementById('btnremoveArtigo');
      buttonremove.addEventListener('click', async event => {
        let selectsub = document.getElementById('categoriaList');
        let id=document.getElementById('categoriaList').value;
	      subcategoria = selectsub.options[selectsub.selectedIndex].text;
        let artigo = document.getElementById(id);
        artigo = artigo.options[artigo.selectedIndex].text;
        console.log(subcategoria);
        console.log(id);
        console.log(artigo);
        const data = {subcategoria,artigo};
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        const response = await fetch('/desassociaartigo', options);
        if(response){
          console.log("gravado com sucesso");
        }else{
          console.log("erro");
        }
        const json = await response.json();
        console.log(json);
      });