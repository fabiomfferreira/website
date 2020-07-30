import Artigo from './artigo.js';

$('#btn_prev').hide();
$('#btn_next').hide();

//classe btn-categoria, pertence às subcategorias do accordion criado 
$('.btn-categoria').on('click', function(event){
    $('#titulo-promo').hide();
    $('#promocoes').hide();
    $('#btn_prev').show();
    $('#btn_next').show();
    //seleciona categoria/subcategoria
    let categoria = $(this).attr('id');
    $('#artigos-container').empty();
    
    //obtem produtos dessa categoria/subcategoria
    getProdutos(categoria);
});


function getProdutos(categoria) {
    //var produtos = [];
    let titulo = $('#titulo-categoria');
    let soma=0;
    fetch('/itens.json').then(resp => resp.json()).then(data => {
        data.forEach(element => {
            // Procurar em cada "row" do ficheiro itens.json
            element.row.forEach(sub => {
                // Verificar se a subcategoria do "row" atual é igual ao que tu clicaste (parametro da funçao)
                if(sub.subcategoria === categoria){
                    titulo.text(sub.subcategoria);
                    sub.artigos.forEach(artigo => {
                        preencheProduto(artigo);
                    })
                }
            })
         })
    }).catch(e => console.error(e));

    //console.log(produtos);
}

function preencheProduto(produto){
    // div colocar os produtos
    let container = $('#artigos-container');
    fetch('/artigos.json').then(resp => resp.json()).then(data => {
        data.forEach(artigo => { 
            let art=new Artigo(artigo.id,artigo.img,artigo.nome,artigo.preco,artigo.info,artigo.sem_desconto);
            console.log(art.info);
            if(art.id == produto ){
                let col =document.createElement('div');
                col.classList = 'col-lg-2 mb-5';
                col.innerHTML+=art.card;
                container.append(col);
            }
        })
    }).catch(e => console.error(e));
}
