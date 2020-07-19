import Artigo from './artigo.js';

//Menu itens categoria/subcategoria
let categorias;
(() => {
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
        
              let container = document.getElementById('categorias-accordion');

              let card = document.createElement('div');
              card.classList = 'card';

              let card_header = document.createElement('div');
              card_header.classList = "card-header";
              card_header.setAttribute('id', element.name);

              let h2 = document.createElement('h2');
              h2.classList = 'mb-0';


              let button = document.createElement('button');
              button.classList = 'btn btn-link btn-block text-left text-decoration-none text-dark ';
              button.setAttribute('type', 'button');
              button.setAttribute('data-toggle', 'collapse');
              button.setAttribute('data-target', '#coll' + element.id);
              button.setAttribute('aria-expanded', 'false');
              button.setAttribute('aria-controls', "coll" + element.id);
              button.innerHTML = element.name;

              h2.append(button);
              card_header.append(h2);


              let collapse = document.createElement('div');
              collapse.classList = 'collapse';
              collapse.setAttribute('id', "coll" + element.id);
              collapse.setAttribute('aria-labelledby', element.name);
              collapse.setAttribute('data-parent', '#categorias-accordion');

              let collapse_card = document.createElement('div');
              collapse_card.classList = 'card-body';


              element.row.forEach(sub => {
                var subcategoria = document.createElement('a');
                subcategoria.text = sub.subcategoria;
                //subcategoria.href = "/itens/"+sub.subcategoria;   // LINK para a categoria
                subcategoria.setAttribute("href","/"+sub.subcategoria);
                subcategoria.id=sub.subcategoria;
                console.log(subcategoria.getAttribute("href"));
               /* if(subcategoria.addEventListener){
                  subcategoria.addEventListener('click', function(){
                     alert(sub.subcategoria);
                  });}*/
                
                subcategoria.classList = "dropdown-item text-left";
                collapse_card.append(subcategoria);
              })
         
              collapse.append(collapse_card);

              card.append(card_header);
              card.append(collapse);
              container.append(card);
              
            });
        })
        .catch(e => console.error(e));
})();

//artigos
let artigos;

(() => {
    fetch('/artigos.json')
        .then(resp => resp.json())
        .then(data => {
            artigos = data;
            data.forEach(element => {
                let art=new Artigo(element.id,element.img,element.nome,element.preco,element.info,element.sem_desconto,element.catid,element.subid);
                let  container= document.getElementById('artigos-container')
                let col =document.createElement('div');
                col.classList = 'col-lg-2 mb-5';
                col.innerHTML+=art.card;
                container.append(col);
                console.log(art);
        });
        })
    .catch(e => console.error(e));    
})();
