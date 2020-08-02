import Artigo from './artigo.js';
//mostrar artigos em promoção na pagina principal e pagina itens (index.html e itens.html)
let maximo=6;
let i=0;
(() => {
    fetch('/artigos.json')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(element => {
                let art=new Artigo(element.id,element.img,element.nome,element.preco,element.info,element.sem_desconto,element.extra);
                if(art.sem_desconto!=null){
                    i++;
                    if(i<=maximo){
                        let  container= document.getElementById('promo_container');
                        let col =document.createElement('div');
                        col.classList = 'col-lg-2 mb-5';
                        col.innerHTML+=art.card;
                        container.append(col);
                        console.log(art);
                    }
                }
        });
        })
    .catch(e => console.error(e));    
})();




