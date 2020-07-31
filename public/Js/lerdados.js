//"Menu" itens categoria/subcategoria
    fetch('/itens.json')
        .then(resp => resp.json())
        .then(data => {
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
                subcategoria.setAttribute('id', sub.subcategoria);
                subcategoria.setAttribute("href","#");              
                subcategoria.classList = "dropdown-item text-left btn-categoria";
                collapse_card.append(subcategoria);
              })
         
              collapse.append(collapse_card);

              card.append(card_header);
              card.append(collapse);
              container.append(card);
              
            });
        })
        .catch(e => console.error(e));

