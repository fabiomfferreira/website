let categoria, subcategoria;

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