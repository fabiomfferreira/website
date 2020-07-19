export default class Artigo{
    id;
    nome;
    preco;
    img;
    info;
    sem_desconto;
    catid;
    subid;
    card;

    constructor(id, img,nome,preco,info,sem_desconto,catid,subid) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.img = img;
        this.info=info;
        this.sem_desconto=sem_desconto;
        this.catid=catid;
        this.subid=subid;
        this.createCard();
    }

    createCard() {
        if(this.sem_desconto!=null){
            this.card = `<div class="card h-100">
                <img class="card-img-top  artigo_img" src="${this.img}" alt="">
                <div class="card-body">
                <a href="#" data-toggle="tooltip" title="Informações"> <button type="button" class="btn btn-infos fas fa-plus-circle openmodal" data-toggle="modal" data-target="#modal${this.id}"></button></a>
                    <h4 class="card-title">${this.nome}</h4>
                    <div class="card-price">
                        <span class="card-price-new">${this.preco}€</span> <del class="card-price-old"> ${this.sem_desconto}€</del>
                    </div>
                    <button type="button" class="btn btn-danger btn-extra" data-toggle="modal" data-target="#extrasModal">Extras</button>
                </div>
                <div class="card-footer">
                    <button data-name="${this.nome}" data-price="${this.preco}" class= "btn btn-add btn-lg add-to-cart" onclick="addToCart('${this.nome}','${this.preco}')"><i class="fas fa-cart-plus"></i></button>
                </div>
                </div>
                <!-- Modal para as informaçoes -->
                <div class="modal fade" id="modal${this.id}">
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
                </div>`;
        } else{
            this.card = `<div class="card h-100">
                <img class="card-img-top  artigo_img" src="${this.img}" alt="">
                <div class="card-body">
                <a href="#" data-toggle="tooltip" title="Informações"> <button type="button" class="btn btn-infos fas fa-plus-circle openmodal" data-toggle="modal" data-target="#modal${this.id}"></button></a>
                    <h4 class="card-title">${this.nome}</h4>
                    <div class="card-price">
                        <span class="card-price-new">${this.preco}€</span> <del class="card-price-old"></del>
                    </div>
                    <button type="button" class="btn btn-danger btn-extra" data-toggle="modal" data-target="#extrasModal">Extras</button>
                </div>
                <div class="card-footer">
                    <button data-name="${this.nome}" data-price="${this.preco}" class= "btn btn-add btn-lg add-to-cart" onclick="addToCart('${this.nome}','${this.preco}')"><i class="fas fa-cart-plus"></i></button>
                </div>
                </div>
                <!-- Modal para as informaçoes -->
                <div class="modal fade" id="modal${this.id}">
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
                </div>`;
        }
        

    }
}

