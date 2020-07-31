// mostra/lista categorias e respetivas subcategorias - secção vizualizar
let listCat=document.getElementById('veCategoria');
let listSub=document.getElementById('veSubcategoria');

    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
                let info= document.createElement('li');
                info.appendChild(document.createTextNode(element.name));
                listCat.appendChild(info);

                element.row.forEach(sub => {
                    info2= document.createElement('ul');
                    let subli=document.createElement('li')
                    subli.appendChild(document.createTextNode(sub.subcategoria));
                    info2.appendChild(subli);
                    listCat.appendChild(info2);
                });
            });
        })
    .catch(e => console.error(e));    