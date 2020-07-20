//mostra categorias e respetivas subcategorias 
let listCat=document.getElementById('veCategoria');
let listSub=document.getElementById('veSubcategoria');
(() => {
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
                let info= document.createElement('li');
                info.appendChild(document.createTextNode(element.name));
                listCat.appendChild(info);

                element.row.forEach(sub => {
                    info= document.createElement('li');
                    info.appendChild(document.createTextNode(sub.subcategoria));
                    listSub.appendChild(info);
                });
            });
        })
    .catch(e => console.error(e));    
})();