//admin adicionar - le dados
let cat;

let Select = (id, class_name) => {
    return $('<select>').attr("id", id).addClass(class_name);
}

let appendDrop = (id, text, value) => {
    $('<option>').val(value).text(text).appendTo(id);
};

//mostra categorias e respetivas subcategorias

    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            cat = data;
            data.forEach(element => {
                //Adicionar options para Select Tag para Submenus     
                appendDrop("#subList", element.name, `option${element.id}`);

                //Criar Select Tag para mostrar options para os submenus
                $("#optionList").append(Select(`option${element.id}`, "hide submenuOptions"));

                element.row.forEach(sub_element => {
                    appendDrop(`#option${element.id}`, sub_element.subcategoria, `option${element.id}`);
                });

                //Mostrar respetivas options do submenu 
                $("#subList").change(function() {
                    $(".submenuOptions").hide();
                    $("#" + $(this).val()).css("display", "block");
                }).trigger("change");
            });
        })
        .catch(e => console.error(e));



const appendArtigo = (id, text, value) => {
    $('<option>').val(value).text(text).appendTo(id);
};

//mostra artigos

    fetch('/artigos.json')
        .then(resp => resp.json())
        .then(data => {
            cat = data;
            data.forEach(element => {
                appendArtigo("#artigosList", element.nome, `option${element.id}`);
            });
        })
        .catch(e => console.error(e));
