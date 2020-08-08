//CARRINHO
var shoppingCart = (function() {

    // Private metodos e propriedades
    cart = [];
    
    // Construtor
    function Item(nome, preco, id, iva,quantidade) {
      this.id = id;
      this.nome = nome;
      this.preco = preco;
      this.iva = iva;
      this.quantidade = quantidade;
    }
    
    // guarda o carrinho - session storage
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // carrega o carrinho -  session storage
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
     
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    
    // Public métodos e propriedades
    var obj = {};
    
    // Adiciona ao carrinho - função
    obj.addItemToCart = function(nome, preco, id, iva, quantidade) {
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

    // Conta a quantidade do artigo no carinho - função
    obj.setCountForItem = function(nome, quantidade) {
      for(var i in cart) {
        if (cart[i].nome === nome) {
          cart[i].quantidade = quantidade;
          break;
        }
      }
    };

    // Remove artigo do carrinho - função
    obj.removeItemFromCart = function(nome) {
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
    obj.removeItemFromCartAll = function(nome) {
      for(var item in cart) {
        if(cart[item].nome === nome) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Limpa o carrinho, remove todos os atigos do carrinho
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Conta o total
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].quantidade;
      }
      return totalCount;
    }
  
    // Total cart - função
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].preco * cart[item].quantidade;
        console.log(cart[item].id);
      }
      return Number(totalCart.toFixed(2));
    }

    // Total Iva cart - função
    obj.totalIva = function() {
      var totalsemIva = 0;
      var precosemiva, iva;
      for(var item in cart) {
        precosemiva = (cart[item].preco * cart[item].quantidade) / cart[item].iva;
        
        console.log(precosemiva);
        totalsemIva+=precosemiva;
        console.log(totalsemIva);
        //totalIva += iva;
        //console.log(totalIva);
        //totalIva+=precosemiva;
      }
      return Number(totalsemIva.toFixed(2));
    }
  
    // List cart função
    obj.listCart = function() {
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
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  

  //Triggers / Events  
  //Adiciona item
  function addToCart(nome,preco,id,iva) {
    var nome = nome
    var preco = Number(preco);
    var id=id;
    var iva=iva;
    shoppingCart.addItemToCart(nome, preco, id,iva,1);
    displayCart();
    console.log(id);
    console.log(nome);
    console.log(preco);
  };
  
  //Limpa itens
  $('.clear-cart').on("click",function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
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
        + "<td>"  + cartArray[i].nome + "</td>" 
        + "<td>(" + cartArray[i].preco + "€)</td>"
        + "<td><div class='input-group quantidade-div'><button class='minus-item input-group-addon btn btn-primary' data-nome='"+cartArray[i].nome+"'>-</button>"
        + "<input type='number' class='item-count  form-quantidade' data-nome='"+cartArray[i].nome+"' value='" + cartArray[i].quantidade + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-nome='"+cartArray[i].nome+"'>+</button></div></td>"
        + "<td>" + cartArray[i].total + "€</td>"
        + " = " 
        + "<td><button class='delete-item btn btn-danger btn-delete' data-nome='"+cartArray[i].nome+"'>X</button></td>"
        +  "</tr>";
    }
    $('.cart-table-title').html(title);
  
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
    console.log(shoppingCart.totalCart());
    console.log(shoppingCart.totalIva());
    
    console.log((shoppingCart.totalCart()-shoppingCart.totalIva()).toFixed(2));
  }
  
  //Limpa artigo - button
  $('.show-cart').on("click", ".delete-item", function(event) {
    let nome = $(this).data('nome')
    shoppingCart.removeItemFromCartAll(nome);
    displayCart();
  })
  
  
  //Quantidade -1 
  $('.show-cart').on("click", ".minus-item", function(event) {
    var nome = $(this).data('nome')
    console.log($(this).data('nome'));
    console.log(nome);
    shoppingCart.removeItemFromCart(nome);
    displayCart();
  })

  //Quantidade +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var nome = $(this).data('nome')
    shoppingCart.addItemToCart(nome);
    displayCart();
  })
  
  //Item conta
  $('.show-cart').on("change", ".item-count", function(event) {
     var nome = $(this).data('nome');
     var quantidade = Number($(this).val());
    shoppingCart.setCountForItem(nome, quantidade);
    displayCart();
  });
  
  displayCart();

  console.log(cart);
  
///steppers de todos os passos do carrinho
  var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("clearBtn").style.display = "inline";
   } else {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("clearBtn").style.display = "none";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submeter";
        document.getElementById("nextBtn").onclick=function () {
            Submetido(cart);
            //location.reload();
            shoppingCart.clearCart();
            displayCart();
            //document.getElementById("regForm").submit();
            //window.location.reload();
            var email = document.getElementById("emailcart");
            //console.log(email.value);
        };
      }    
    /*if (n == 1) {
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("clearBtn").style.display = "inline";
      document.getElementById("btn-submit").style.display ="none";
 }*/
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function emailIsValid (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    //var email = document.getElementById("emailcart");
    
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
      if (y[i].value == "") { 
          // add an "invalid" class to the field:
            y[i].className += " invalid";
            //email.className += "invalid";
            // and set the current valid status to false
            valid = false;
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

//Funcao Submetido - envia POST request informação final carrinho
function Submetido(carrinho) {

  console.log(carrinho);
    
  //POST Request carrinho
        
  const data = {carrinho};
  console.log(JSON.stringify(data.carrinho));

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

    document.getElementById("confirmar").innerHTML='<i class="fa fa-check-circle" style="font-size:36px"></i>' +
        '<br>'+
        '<strong style="font-size:26px">CONFIRMADO COM SUCESSO!</strong>';
}
