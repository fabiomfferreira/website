//mostras artigos
import Artigo from './artigo.js';

$('#btn_prev').hide();
$('#btn_next').hide();

//classe btn-categoria, pertence às subcategorias do accordion criado 
$('.btn-categoria').on('click', function(event){
    $('#titulo-promo').hide();
    $('#promocoes').hide();

    //seleciona categoria/subcategoria
    let categoria = $(this).attr('id');
    $('#artigos-container').empty();
    
    //obtem produtos dessa categoria/subcategoria
    getItensIds(categoria);
});


function getItensIds(categoria) {
    let titulo = $('#titulo-categoria');
    fetch('/itens.json').then(resp => resp.json()).then(data => {
        data.forEach(element => {
            element.row.forEach(sub => {
                // Verifica se a subcategoria do "row" é igual à "categoria"
                if(sub.subcategoria == categoria || sub.subcategoria.toUpperCase()==categoria.toUpperCase() || sub.subcategoria.toLowerCase()==categoria.toLowerCase()){
                    titulo.text(sub.subcategoria);
                    preencheProduto(element.id,sub.id);
                }
            })
         })
    }).catch(e => console.error(e));
}

function preencheProduto(catid,subid){
    //div colocar os produtos
    let container = $('#artigos-container');
    fetch('/artigos.json').then(resp => resp.json()).then(data => {
        data.forEach(artigo => { 
            let art=new Artigo(artigo.id,artigo.img,artigo.nome,artigo.preco,artigo.info,artigo.sem_desconto,artigo.extra,artigo.iva,artigo.categoriaid,artigo.subcategoriaid);
 
            if(art.categoriaid==catid  && art.subcategoriaid==subid){
                let col =document.createElement('div');
                col.classList = 'col-lg-2 mb-5';
                col.innerHTML+=art.card;
                container.append(col);
            }
        })
    }).catch(e => console.error(e));
}

//Pesquisa subcategoria com botao - onclick
$('#btn-search').on('click', function(event){
    $('#titulo-promo').hide();
    $('#promocoes').hide(); 
    $('#artigos-container').empty();
    var pesquisa=$('#input-pesquisa').val();
    console.log(pesquisa);
    getItensIds(pesquisa);
})

//Pesquisa subcategoria com tecla "enter"
$('#input-pesquisa').keypress(function(event){
    if ( event.which == 13 ) {
        event.preventDefault();
        $('#titulo-promo').hide();
        $('#promocoes').hide(); 
        $('#artigos-container').empty();
        var pesquisa=$('#input-pesquisa').val();
        console.log(pesquisa);

        fetch('/itens.json').then(resp => resp.json()).then(data => {
            data.forEach(element => {
                element.row.forEach(sub => {
                    // Verifica se a subcategoria do "row" é igual à "categoria"
                    if(sub.subcategoria == pesquisa || sub.subcategoria.toUpperCase()==pesquisa.toUpperCase() || sub.subcategoria.toLowerCase()==pesquisa.toLowerCase()){
                        getItensIds(pesquisa);
                    }
                    else{
                        $('#titulo-promo').hide();
                        $('#promocoes').hide();
                        
                    }
                })
             })
        }).catch(e => console.error(e));
     }
})