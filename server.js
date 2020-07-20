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

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  // Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define rotas
app.get('/',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });

  app.get('/itens/:subcategoria',
  function(req, res){
    const itens = require("./itens/itens.json");  
    for (let i in itens) {
      for (let j in itens[i].row) {
        if(req.params.subcategoria == itens[i].row[j].subcategoria){
          console.log(itens[i].row[j].id);
          console.log(req.params.subcategoria);
          console.log(itens[i].row[j].subcategoria);
          res.sendFile(path.join(__dirname, 'views/itens.html'));
        }
      }
    } 
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


  //POST adiciona itens - nova subcategoria
  app.post('/gravasub', function(request, response) {
  const data = request.body;
  allData.push(data);
  response.json(allData);
  console.log(allData);
  // Requiring itens file 
  const itens = require("./itens/itens.json"); 
  let obj;
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
              obj={ id: novoidsub, subcategoria: data.subcategoria};
            }
          }
        itens[i].row.push(obj);
        console.log("sucesso a gravar subcategoria nova");
      } 
    }    
  
  // STEP 3: Writing to a file 
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), function(err){   
    // Checking for errors 
    if (err) throw err;  
    console.log("Escrito com sucesso"); // Success 
  });
});


//POST adiciona itens - nova categoria e nova subcategoria
app.post('/gravaitens', function(request, response) {
  const data = request.body;
  allData.push(data);
  response.json(allData);
  let novoid,novoidsub=1;
  // Requiring itens file 
  const itens = require("./itens/itens.json"); 
  
  //let obj = { subcategoria: data.subcategoria };
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

    if(existe==0){
      // Defining new item
      let x = { 
        id: novoid, 
        name: data.categoria, 
        row: [
          {
            id:novoidsub ,
            subcategoria:data.subcategoria
          }
        ] 
      }; 
      itens.push(x);
      console.log("sucesso a gravar categoria e subcategoria nova");
    }

  // STEP 3: Writing to a file 
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), function(err){   
    // Checking for errors 
    if (err) throw err;  
    console.log("Escrito com sucesso"); // Success 
  });
});

//POST elimina itens - categoria
app.post('/eliminacategoria', function(request, response){
  const data = request.body;
  allData.push(data);
  response.json(allData);
  console.log(allData);
  console.log(data.categoria);
  
  // Requiring itens file 
  const itens = require("./itens/itens.json"); 
 
  for(let i=0; i<itens.length; i++) 
    {        
      if(itens[i].name==data.categoria){
        //elimina
        console.log(itens[i]);
        itens.splice(i, 1);
        console.log("sucesso a eliminar categoria"); 
      } 
    }     
  // STEP 3: Writing to a file 
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), err => {   
    // Checking for errors 
    if (err) throw err;   
    console.log("Escrito com sucesso"); // Success 
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
  
  // Requiring itens file 
  const itens = require("./itens/itens.json");  
  for (let i in itens) {
      for (let j in itens[i].row) {
        if(itens[i].name==data.categoria){
          if(itens[i].row[j].subcategoria==data.subcategoria){
            z = itens[i].row[j].subcategoria;
            console.log(z);
            itens[i].row.splice(j, 1);
          }
      }
    }
  }   
  
  // STEP 3: Writing to a file 
  fs.writeFile("./itens/itens.json", JSON.stringify(itens,null,2), err => {    
    // Checking for errors 
    if (err) throw err;    
    console.log("Escrito com sucesso"); // Success 
  });
});

app.post('/novapassword', function(request, response){
  const data = request.body;
  response.json(data);
  //console.log(data);  
  // Requiring users/admin file 
  const users = require("./bd/useradmin.json"); 
  users[0].password=data.password;
  // Requiring users/admin file 
  console.log(users); 
  //Writing to a file 
  fs.writeFile("./bd/useradmin.json", JSON.stringify(users,null,2), err => { 
  // Checking for errors 
  if (err) throw err;  
  console.log("Escrito com sucesso"); // Success 
  });
});


  
 /* // Requiring itens file 
  const artigos = require("./itens/artigos.json"); 
  let x=1,z=1,art="Artigo2";
  let catid=x;
  let subid=z;
      
    for (let i in artigos) {
      if(artigos[i].nome==art){
        console.log(artigos[i].nome);
        artigos[i].catid=catid;
        artigos[i].subid=subid;
      }
      
    }
    //Writing to a file 
    fs.writeFile("./itens/artigos.json", JSON.stringify(artigos,null,2), err => { 
    // Checking for errors 
    if (err) throw err;  
    console.log("Escrito com sucesso"); // Success 
  });*/
 