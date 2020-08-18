let categoria, subcategoria;

//POST request elimina itens - categoria
      const buttonc = document.getElementById('btnremoveCategoria');
      buttonc.addEventListener('click', async event => {
        let selectcat = document.getElementById('subMenu');
	      categoria = selectcat.options[selectcat.selectedIndex].text;
        const data = { categoria};
        
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
      });

  //POST request elimina itens - subcategoria
      const buttons=document.getElementById('btnremovesubCategoria');
      buttons.addEventListener('click', async event => {
        let selectcat = document.getElementById('subMenuList');
        let id=document.getElementById('subMenuList').value;
	      categoria = selectcat.options[selectcat.selectedIndex].text;
        let selectsub = document.getElementById(id);
        subcategoria = selectsub.options[selectsub.selectedIndex].text;
        const data = {categoria,subcategoria};
        
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
      });

      //POST request desassocia categorias e subcategorias de artigo
      const buttonremove=document.getElementById('btnremoveArtigo');
      buttonremove.addEventListener('click', async event => {
        let selectsub = document.getElementById('categoriaList');
        let id=document.getElementById('categoriaList').value;
	      subcategoria = selectsub.options[selectsub.selectedIndex].text;
        let artigo = document.getElementById(id);
        artigo = artigo.options[artigo.selectedIndex].text;
        const data = {subcategoria,artigo};
        
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
      });