let categorias;

const createSelect = (id, class_name) => {
    return $('<select>').attr("id", id).addClass(class_name);
}

const appendDropDown = (id, text, value) => {
    $('<option>').val(value).text(text).appendTo(id);
};

//mostra categorias e respetivas subcategorias
(() => {
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
})();

//mostra somente categoria
(() => {
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
            categorias = data;
            data.forEach(element => {
                //Adicionar options para Select Tag para Submenus     
                appendDropDown("#subMenu", element.name, `option${element.id}`);
            });
        })
        .catch(e => console.error(e));
})();
