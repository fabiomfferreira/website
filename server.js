
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

// Define routes
app.get('/',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
  });

  app.get('/categorias',
  function(req, res){
    res.sendFile(path.join(__dirname, 'views/Categorias/aguas.html'));
  });

  app.get('/itens/:subcategoria',
  function(req, res){
    //if (req.params.subcategoria == "subcategoria1"){
    res.sendFile(path.join(__dirname, 'views/itens.html'));
    //}
    /*else{
      res.send("error");
    }*/
    //res.redirect('/');
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

//POST adiciona itens - categoria,subcategoria
app.post('/gravaitens', function(request, response) {
  const data = request.body;
  allData.push(data);
  response.json(allData);

  // Requiring itens file 
  const itens = require("./itens/itens.json"); 
  let novoid=itens.length;
  let obj = { subcategoria: data.subcategoria };
  
  for(let i=0; i<itens.length; i++) 
    {        
      //ve se a categoria introduzida já existe, se existir acrescenta a subcategoria à respetiva categoria
      if(itens[i].name==data.categoria){
        itens[i].row.push(obj);
        console.log("sucesso a gravar subcategoria nova");
        existe=0;
      }
      else if((itens[i].name!=data.categoria)){
        existe=1;
      }   
    }    

    if(existe==1){
      // Defining new item
      let x = { 
        id: novoid, 
        name: data.categoria, 
        row: [
          {subcategoria:data.subcategoria}
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


  
  /*// Requiring itens file 
  const itens = require("./itens/itens.json"); 
  let x,z;
  for(let i=0; i<itens.length; i++) 
    {  
      for(let j=0;j<itens[i].row.length;j++){
        x=itens[i].row.length;
        for(let j=0;j<x;j++){
          z=itens[i].row[j].subcategoria;
          console.log(z);
        }
        console.log(z);
      }      
      console.log(x);
    } 

    for (let i in itens) {
      x = itens[i].name;
      console.log(x);
      for (let j in itens[i].row) {
        z = itens[i].row[j].subcategoria;
        console.log(z);
      }
    }*/
