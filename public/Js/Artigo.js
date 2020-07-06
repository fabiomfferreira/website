export default class Artigo{
    label_informacoes;
    nome;
    preco;
    img;
    label_extras;
    label;
    card;

    constructor(label_informacoes, nome, preco, img, label_extras, label) {
        this.label_informacoes = label_informacoes;
        this.nome = nome;
        this.preco = preco;
        this.img = img;
        this.label_extras = label_extras;
        this.label = label;


        this.createCard();
    }

    createCard() {
        this.card = `<div class="card h-100">
                <a href="#" data-toggle="tooltip" title="Informações"> <button type="button" class="btn btn-infos fas fa-plus-circle" data-toggle="modal" data-target="#infoModal">${this.label_informacoes}</button></a>
                <a href="#"><img class="card-img-top" src="${this.img}" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">${this.nome}</h4>
                    <h5 class="card-price">${this.preco}</h5>
                    <button type="button" class="btn btn-danger btn-extra btn-lg" data-toggle="modal" data-target="#extrasModal">${this.label_extras}</button>
                </div>
                <div class="card-footer">
                    <button class= "btn btn-add btn-lg">${this.label}</button>
                </div>
                </div>`;
    }
}