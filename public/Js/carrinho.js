//CARRINHO
var shoppingCart = (function() {
    cart = [];
    
    // Construtor
    function Item(nome, preco, id, iva,quantidade) {
      this.id = id;
      this.nome = nome;
      this.preco = preco;
      this.iva = iva;
      this.quantidade = quantidade;
    }
    
    //guarda o carrinho - session storage
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
    //carrega o carrinho - session storage
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
     
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
    // Public métodos e propriedades
    var obj = {};
    
    // Adiciona ao carrinho - função
    obj.addItemCart = function(nome, preco, id, iva, quantidade) {
      for(var item in cart) {
        if(cart[item].nome === nome) {
          cart[item].quantidade ++;
          saveCart();
          return;
        }
      }
      var item = new Item(nome, preco, id, iva, quantidade);
      cart.push(item);
      saveCart();
    }

    // Conta a quantidade do artigo no carrinho - função
    obj.contaItem = function(nome, quantidade) {
      for(var i in cart) {
        if (cart[i].nome === nome) {
          cart[i].quantidade = quantidade;
          break;
        }
      }
    };

    // Remove artigo do carrinho - função
    obj.removeItemCart = function(nome) {
        for(var item in cart) {
          if(cart[item].nome === nome) {
            cart[item].quantidade --;
            if(cart[item].quantidade === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove todo o mesmo artigo do carrinho
    obj.removeItemCartAll = function(nome) {
      for(var item in cart) {
        if(cart[item].nome === nome) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Limpa o carrinho
    obj.limpaCart = function() {
      cart = [];
      saveCart();
    }
  
    // Conta o total de artigos presentes no carrinho
    obj.totalConta = function() {
      var totalConta = 0;
      for(var item in cart) {
        totalConta += cart[item].quantidade;
      }
      return totalConta;
    }
  
    // Preço Total carrinho
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].preco * cart[item].quantidade;
      }
      return Number(totalCart.toFixed(2));
    }

    // Total Iva cart - função
    obj.totalIva = function() {
      var totalsemIva = 0;
      var precosemiva, iva;
      for(var item in cart) {
        precosemiva = (cart[item].preco * cart[item].quantidade) / cart[item].iva;
        totalsemIva+=precosemiva;
      }
      return Number(totalsemIva.toFixed(2));
    }
  
    // Lista cart função
    obj.listaCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.preco * item.quantidade).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();
  
  //Eventos
  //Adiciona item
  function addToCart(nome,preco,id,iva) {
    var nome = nome
    var preco = Number(preco);
    var id=id;
    var iva=iva;
    shoppingCart.addItemCart(nome, preco, id,iva,1);
    mostraCart();
  };
  
  //Limpa carrinho
  $('.clear-cart').on("click",function() {
    shoppingCart.limpaCart();
    mostraCart();
  });
  
  function mostraCart() {
    var cartArray = shoppingCart.listaCart();
    var output = "";
    var title="";
    title += 
    "<tr>"+
        "<td>Artigo</td>"+
        "<td>Preço Uni.</td>"+
        "<td>Quantidade</td>"+
        "<td>Preço</td>"
    +"</tr>";

    for(var i in cartArray) {
      output+="<tr>"
      +"<td>"+cartArray[i].nome+"</td>" 
      +"<td>("+cartArray[i].preco+"€)</td>"
      +"<td><div class='input-group quantidade-div'><button class='minus-item input-group-addon btn btn-primary' data-nome='"+cartArray[i].nome+"'>-</button>"
      +"<input type='number' class='item-count  form-quantidade' data-nome='"+cartArray[i].nome+"' value='" + cartArray[i].quantidade + "'>"
      +"<button class='plus-item btn btn-primary input-group-addon' data-nome='"+cartArray[i].nome+"'>+</button></div></td>"
      +"<td>"+cartArray[i].total+"€</td>"
      +"=" 
      +"<td><button class='delete-item btn btn-danger btn-delete' data-nome='"+cartArray[i].nome+"'>X</button></td>"
      +"</tr>";
    }
    $('.cart-table-title').html(title);
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalConta());
    $('.total-iva').html((shoppingCart.totalCart()-shoppingCart.totalIva()).toFixed(2)); 
  }
  
  //Limpa artigo - button
  $('.show-cart').on("click", ".delete-item", function(event) {
    let nome = $(this).data('nome')
    shoppingCart.removeItemCartAll(nome);
    mostraCart();
  })
  
  //Quantidade -1 
  $('.show-cart').on("click", ".minus-item", function(event) {
    var nome = $(this).data('nome')
    console.log($(this).data('nome'));
    console.log(nome);
    shoppingCart.removeItemCart(nome);
    mostraCart();
  })

  //Quantidade +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var nome = $(this).data('nome')
    shoppingCart.addItemCart(nome);
    mostraCart();
  })
  
  //Item conta
  $('.show-cart').on("change", ".item-count", function(event) {
     var nome = $(this).data('nome');
     var quantidade = Number($(this).val());
    shoppingCart.contaItem(nome, quantidade);
    mostraCart();
  });
  
  mostraCart();

  console.log(cart);
  
///stepper do carrinho
var atualTab = 0;
mostraTab(atualTab);

function mostraTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    
    if(n == 0){
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("clearBtn").style.display = "inline";
   }else{
      document.getElementById("prevBtn").style.display = "inline";
      document.getElementById("clearBtn").style.display = "none";
    }
    
    if (n==(x.length-1)){
      document.getElementById("nextBtn").innerHTML = "Submeter";
      document.getElementById("nextBtn").addEventListener("click",function(){
        Submetido(cart);
        shoppingCart.limpaCart();
        mostraCart();
      })};  
    fixStepAtivo(n)
}

//Descobre qual tab a mostrar
function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    
    if (n == 1 && !validaForm()){
      return false;
    }
    x[atualTab].style.display = "none";
    if(atualTab==2){
      x[atualTab].style.display="block"
    }
    atualTab = atualTab + n;
  
    //se fim
    if (atualTab >= x.length) {
        return false;
    }
    //senão mostra tab:
    mostraTab(atualTab);
}

function emailValido (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

//Validação campos do form
function validaForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[atualTab].getElementsByTagName("input");
    
    //Verifica todos os inputs
    for (i = 0; i < y.length; i++) {
      if (y[i].value == ""){
          y[i].className += " invalid";
          valid = false;
        }
    }

    if(atualTab==1){
      var mail=document.getElementById("emailCart").value;
      console.log(mail);
      console.log(emailValido(mail))
        if(emailValido(mail)==false){
          mail.className +=" invalid";
          valid=false;
        }
    }
    //se valido marca o step como finish
    if (valid) {
        document.getElementsByClassName("step")[atualTab].className += " finish";
    }
    return valid;
}

function fixStepAtivo(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

//Funcao Submetido - envia POST request informação final carrinho
function Submetido(carrinho) {
    if(carrinho.length!=0){     
      let nome=document.getElementById("Nome").value;
      let email=document.getElementById("emailCart").value;
      let morada=document.getElementById("moradaCart").value;
      let cidade=document.getElementById("cidadeCart").value;
      let codpostal=document.getElementById("codPCart").value;
      const data = {nome,email,morada,cidade,codpostal,carrinho};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      };
      const response = fetch('/carrinho', options);
      if(response){
        console.log("gravado com sucesso");
      }else{
        console.log("erro");
        }
        document.getElementById("btnpaypal").style.display="none";
      document.getElementById("confirmar").innerHTML='<i class="fa fa-check-circle" style="font-size:36px"></i>' +
            '<br>'+
            '<strong style="font-size:26px">CONFIRMADO COM SUCESSO!</strong>';
      }
      window.location.reload();
}
