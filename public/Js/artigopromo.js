//classe Artigo em promoção
export default class ArtigoPromo{
    id;
    nome;
    preco;
    img;
    info;
    extra;
    iva;
    categoriaid;
    subcategoriaid;
    sem_desconto;
    card;

    constructor(id, img,nome,preco,info,sem_desconto,extra,iva,categoriaid,subcategoriaid) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.img = img;
        this.info=info;
        this.extra=extra;
        this.iva=iva;
        this.categoriaid=categoriaid;
        this.subcategoriaid=subcategoriaid;
        this.sem_desconto=sem_desconto;
        this.createCard();
    }

    createCard() {
            this.card = `<div class="card h-100">
                <img class="card-img-top  artigo_img" src="${this.img}" alt="">
                <div class="card-body">
                <a href="#" data-toggle="tooltip" title="Informações"> <button type="button" class="btn btn-info btn-sm mb-3" data-toggle="modal" data-target="#modalpromo${this.id}">Informações</button></a>
                    <p class="card-title">${this.nome}</p>
                    <div class="card-price">
                        <span class="card-price-new">${this.preco}€</span> <del class="card-price-old">${this.sem_desconto}€</del>
                    </div>
                    <button type="button" class="btn btn-danger btn-extra btn-sm" data-toggle="modal" data-target="#promoextras${this.id}">Extras</button>
                </div>
                <div class="card-footer">
                    <button data-id="${this.id}" data-nome="${this.nome}" data-price="${this.preco}" class= "btn btn-add btn-lg add-to-cart" onclick="addToCart('${this.nome}','${this.preco}','${this.id}','${this.iva}')"><i class="fas fa-cart-plus"></i></button>
                </div>
                </div>
                <!-- Modal para as informaçoes -->
                <div class="modal fade" id="modalpromo${this.id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">Informações do Artigo</h4>
                            </div>
                            <!-- Modal body -->
                            <div class="modal-body">
                                ${this.info}
                            </div>
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal para os extras -->
                <div class="modal fade" id="promoextras${this.id}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">Extras</h4>
                            </div>
                            <!-- Modal body -->
                            <div class="modal-body">
                                ${this.extra}
                            </div>
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger btn-lg" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        

}