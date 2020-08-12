//admin - secção remover - le dados
let categorias;

let appendDropDown = (id, text, value) => {
    $('<option>').val(value).text(text).appendTo(id);
};

//mostra somente categoria
fetch('/itens.json')
.then(resp => resp.json())
.then(data => {
    categorias = data;
    data.forEach(element => {
        //Adicionar options para Select Tag para Submenu     
        appendDropDown("#subMenu", element.name, `option${element.id}`);
    });
})
.catch(e => console.error(e));

let createSelect = (id, class_name) => {
    return $('<select>').attr("id", id).addClass(class_name);
}

//mostra categorias e respetivas subcategorias
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
                //Adicionar options para Select Tag para Submenus     
                appendDropDown("#subMenuList", element.name, `option${element.id}`);

                //Criar Select Tag para mostrar options para os submenus
                $("#optionsList").append(createSelect(`option${element.id}`, "hide submenuOptions"));

                element.row.forEach(sub_element => {
                    appendDropDown(`#option${element.id}`, sub_element.subcategoria, `option${element.id}`);
                });

                //Mostrar respetivas options do submenu 
                $("#subMenuList").change(function() {
                    $(".submenuOptions").hide();
                    $("#" + $(this).val()).css("display", "block");
                }).trigger("change");
            });
        })
        .catch(e => console.error(e));


//mostra subcategorias e respetivos artigos
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
                element.row.forEach(sub_element => {                       
                    appendDropDown("#categoriaList", sub_element.subcategoria, `option${sub_element.subcategoria}`); 
                    $("#artigoList").append(createSelect(`option${sub_element.subcategoria}`, "hide subOptions"));                       
                        fetch('/artigos.json')
                            .then(resp => resp.json())
                            .then(data => {
                                data.forEach(artigo => {
                                    if(artigo.categoriaid==element.id && artigo.subcategoriaid==sub_element.id){
                                     appendDropDown(`#option${sub_element.subcategoria}`, artigo.nome, `option${sub_element.subcategoria}`);
                                    }
                                });
                            })
                            .catch(e => console.error(e));                       
                });
                $("#categoriaList").change(function() {
                    $(".subOptions").hide();
                    $("#" + $(this).val()).css("display", "block");
                }).trigger("change");
            });
        })
        .catch(e => console.error(e));
