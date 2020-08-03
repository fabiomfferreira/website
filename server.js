const express = require('express');
const app = express();
let passport = require('passport');
let Strategy = require('passport-local').Strategy;
let db = require('./bd');
let path = require('path');
const fs = require("fs"); 

app.listen(3000, () => console.log('servidor a correr na porta 3000'));
app.use(express.static('public'));
app.use(express.static('itens'));
app.use(express.json());

const allData = [];

//Configura a "local strategy" a ser usada pelo Passport
//funcção que recebe (`username` and `password`) submetida pelo admin
passport.use(new Strategy(
  function(username, password, cb) {
    db.admins.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

//Configura persistência de sessão de autenticação Passport
//para restaurar o estado de autenticação nas solicitações HTTP,
//o Passport precisa serializar usuários e desserializar usuários fora da sessão. 
//A implementação típica disso é tão simples quanto fornecer o ID do usuário quando
//serializando e consultando o registro do usuário por ID do banco de dados quando desserialização.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.admins.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

//Usa application-level middleware para funcionalidades comuns como registo, análise e manipulação de sessões
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

//Inicialia o Passport e restaura o estado de autenticação
app.use(passport.initialize());
app.use(passport.session());

//Define rotas
app.get('/',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });

  app.get('/itens',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/itens.html'));
  });

app.get('/login',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Admin/login.html'));
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/admin');
  });
  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/login');
  });

app.get('/admin',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Admin/index.html'));
  });

  app.get('/admin/adiciona',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Admin/additem.html'));
  });

  app.get('/admin/remove',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Admin/removeitem.html'));
  });

  app.get('/admin/password',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Admin/password.html'));
  });

//POST adiciona itens - nova categoria, nova subcategoria
app.post('/gravaitens', function(request, response) {
  const data = request.body;
  allData.push(data);
  response.json(allData);
  let novoid,novoidsub=1;
  //Requere o ficheiro itens.json
  const itens = require("./itens/itens.json"); 

  let existe=0;  
  
  for(let i=0; i<itens.length; i++) 
    { 
      //ve se a categoria introduzida já existe
      if(itens[i].name==data.categoria){
        existe=1;
      } 
      if(i==itens.length-1){
        novoid=itens[i].id+1;
        console.log(novoid);
      }
    }  

    //existe a categoria, então adiciona só a subcategoria
    if(existe==1){
      for (let i=0; i<itens.length;i++) {
        for (let j=0; j<itens[i].row.length;j++) {
          if(j==itens[i].row.length-1)
          {
            novoidsub=itens[i].row[j].id+1;
          }
        }
      }
      
      for(let i=0; i<itens.length; i++) 
        {        
          if(itens[i].name==data.categoria){
              for (let j=0; j<itens[i].row.length;j++) {
                if(j==itens[i].row.length-1)
                {
                  novoidsub=itens[i].row[j].id+1;
                  obj={ id: novoidsub, subcategoria: data.subcategoria, artigos: []};
                }
              }
            itens[i].row.push(obj);
            console.log("sucesso a gravar subcategoria nova");
          } 
        } 
    }

    //não existe a categoria, então adiciona categoria e subcategoria
    if(existe==0){
      let x = { 
        id: novoid, 
        name: data.categoria, 
        row: [
          {
            id:novoidsub ,
            subcategoria:data.subcategoria, 
            artigos: []
          }
        ] 
      }; 
      itens.push(x);
      console.log("sucesso a gravar categoria e subcategoria nova");
    }

  //Escreve no ficheiro itens.json
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), function(err){   
    if (err) throw err;  
    console.log("Escrito com sucesso");
  });
});


//POST associa artigos a subcategoria e categoria
app.post('/associa', function(request, response) {
  const data = request.body;
  allData.push(data);
  response.json(allData);
  let idartigo;
  //Requere ficheiros itens.json e artigos.json
  const itens = require("./itens/itens.json");
  const artigos = require("./itens/artigos.json");  
  
  //encontra id do artigo selecionado
  for(let i in artigos){
    if(artigos[i].nome==data.artigo){
      idartigo=artigos[i].id;
    }
  }

  //adiciona o id do artigo nos itens
  for(let i in itens){
    for(let j in itens[i].row){
      if(itens[i].name==data.categoria){
        if(itens[i].row[j].subcategoria==data.subcategoria){
          itens[i].row[j].artigos.push(idartigo);
        }
      }     
    }
  }

  //Escreve no ficheiro itens.json 
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), function(err){   
    if (err) throw err;  
    console.log("Escrito com sucesso"); 
  });
});


//POST elimina itens - categoria
app.post('/eliminacategoria', function(request, response){
  const data = request.body;
  allData.push(data);
  response.json(allData);
  console.log(allData);
  console.log(data.categoria);

  //Requere ficheiro itens.json
  const itens = require("./itens/itens.json"); 
 
  for(let i=0; i<itens.length; i++) 
    {        
      if(itens[i].name==data.categoria){
        for(let j=0; j<itens[i].row.length; j++){
          if(itens[i].row.length<=1){
            //elimina
            itens.splice(i, 1);
            console.log("sucesso a eliminar categoria"); 
          }
        }
      } 
    }     
  //Escreve no ficheiro itens.json
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), err => {   
    if (err) throw err;   
    console.log("Escrito com sucesso"); 
  });
});

//POST elimina itens - subcategoria
app.post('/eliminasubcategoria', function(request, response){
  const all=[];
  const data = request.body;
  all.push(data);
  response.json(all);
  console.log(data.categoria);
  console.log(data.subcategoria);
  
  //Requere ficheiro itens.json 
  const itens = require("./itens/itens.json");  
  for (let i in itens) {
      for (let j in itens[i].row) {
        if(itens[i].name==data.categoria){
          if(itens[i].row[j].subcategoria==data.subcategoria){
            if(itens[i].row[j].artigos.length<=1){
              z = itens[i].row[j].subcategoria;
              console.log(z);
              itens[i].row.splice(j, 1);
            }
          }
      }
    }
  }   
  
  //Escreve no ficheiro itens.json
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), err => {     
    if (err) throw err;    
    console.log("Escrito com sucesso");
  });
});

//POST desassocia artigo de subcategoria
app.post('/desassociaartigo', function(request, response){
  const all=[];
  const data = request.body;
  all.push(data);
  response.json(all);
  console.log(data.subcategoria);
  console.log(data.artigo);
  let artigoid;
  //Requere ficheiros itens.json e artigos.json
  const itens = require("./itens/itens.json");  
  const artigos = require("./itens/artigos.json"); 
  
  //encontra id do artigo selecionado
  for(let i in artigos){
    if(artigos[i].nome==data.artigo){
      console.log("igual");
      artigoid=artigos[i].id;
      console.log(artigoid);
    }
  }

  //desassocia artigo dos itens
  for(let i in itens){
      for(let j in itens[i].row){
        if(itens[i].row[j].subcategoria==data.subcategoria){
          console.log(itens[i].row[j].subcategoria);
          for(let x in itens[i].row[j].artigos){
            if(itens[i].row[j].artigos[x]==artigoid){
              console.log(itens[i].row[j].artigos[x]);
              itens[i].row[j].artigos.splice(x, 1);
            }
          }
        }
      }
    }
  
  //Escreve no ficheiro itens.json
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), err => {     
    if (err) throw err;    
    console.log("Escrito com sucesso");
  });
});

//POST - Muda password do admin
app.post('/novapassword', function(request, response){
  const data = request.body;
  response.json(data);
  //Requere ficheiro admin.json
  const admins = require("./bd/admin.json"); 
  admins[0].password=data.password;
  //Escreve no ficheiro admin.json
  fs.writeFile("./bd/admin.json", JSON.stringify(admins,null,2), err => { 
  if (err) throw err;  
  console.log("Escrito com sucesso");
  });
});
