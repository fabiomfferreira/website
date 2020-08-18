
let categoria, subcategoria, artigo;

//POST Request adiciona itens - nova categoria, nova subcategoria
const button = document.getElementById('btnaddCategoria');
button.addEventListener('click', async event => {
  categoria = document.getElementById("inputCat").value;
  subcategoria = document.getElementById("inputSubcategoria").value;    
  const data = { categoria,subcategoria};
  
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
});

//POST Request associa categoria e subcategoria a artigos 
const butt = document.getElementById('btnArtigo');
  butt.addEventListener('click', async event => {
    let selectcat = document.getElementById('subList');
    let id=document.getElementById('subList').value;
    categoria = selectcat.options[selectcat.selectedIndex].text;
    let selectsub = document.getElementById(id);
    subcategoria = selectsub.options[selectsub.selectedIndex].text;
    let selectartigo = document.getElementById('artigosList');
    artigo = selectartigo.options[selectartigo.selectedIndex].text;
        
    const data = {categoria,subcategoria,artigo};
    console.log(data);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
        const response = await fetch('/associa', options);
        if(response){
          console.log("gravado com sucesso");
        }else{
          console.log("erro");
          }
  });


