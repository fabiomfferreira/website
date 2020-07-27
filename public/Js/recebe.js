/*fetch('/itens/:subcategoria')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    let  container= document.getElementById('exemplo');
    let p =document.createElement('p');
    let node = document.createTextNode(myJson);
    p.appendChild(node);
    container.appendChild(p);
  })*/

  
/*fetch('products.json').then(function(response) {
    return response.json();
  }).then(function(json) {
    let products = json;
    initialize(products);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });*/

/*var req = new XMLHttpRequest();
var url = '/dados';

req.open('GET',url,true); // set this to POST if you would like
req.addEventListener('load',onLoad);
req.addEventListener('error',onError);

req.send();

function onLoad() {
   var response = this.responseText;
   var parsedResponse = JSON.parse(response);

   // access your data newly received data here and update your DOM with appendChild(), findElementById(), etc...
   var messageToDisplay = parsedResponse['message'];
    console.log(messageToDisplay);
    let  container= document.getElementById('exemplo');
    let p =document.createElement('p');
    let node = document.createTextNode(messageToDisplay);
    p.appendChild(node);
    container.appendChild(p);
   // append child (with text value of messageToDisplay for instance) here or do some more stuff
}

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}*/