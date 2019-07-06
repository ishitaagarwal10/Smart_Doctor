var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var request=require("request");
var fs=require("fs");
//var shell=require("shelljs");

var exec = require("child_process").exec;

//shell====================================
var shell = require('shelljs');

//shell.exec("s3 rm s3://doctalkbucket/JTW1.jpeg --region ap-south-1");
//================================================



//var shopguroos=require("./models/db");
//var popup = require('popups');
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//===================
//mongconnect
var mongoose=require("mongoose");
var passport=require("passport");
var passportlocal=require("passport-local");
var passlocalmongoose=require("passport-local-mongoose");
//collections=users
mongoose.connect("mongodb://localhost/User"); 
var User=require("./models/db");
app.use(require("express-session")({
    secret:"U Buy We GIFT",
    resave: false,
    saveUninitialized: false
}));
passport.use(new passportlocal(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 //============================
 
   //========================================= 
    //Restful Routes
    //========================================
     
app.get("/",function(req,res)
{  shell.exec("s3cmd put userimage/temp.jpeg s3://doctalkbucket/");
    res.render("main");
});

//=======================================
//webcam
var base64ToImage = require('base64-to-image');
app.post("/storeImage",function(req,res)
{  var base64Str=req.body.image;
    //console.log(req.body.image);
   var path="./userimage/";
    var optionalObj = {'fileName': 'temp', 'type':'jpeg'};


    base64ToImage(base64Str,path,optionalObj); 
    
    //Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
    var imageInfo = base64ToImage(base64Str,path,optionalObj);
        
    //res.render("dash");
});
//==========================================================================
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
//================================================================================
//testing
 var i=0;
var arr=new Array();
app.get("/test",function(req,res)
{  res.render("test");
});
app.get("/qa1",function(req,res)
{  res.render("qa1");
});
app.get("/qa2",function(req,res)
{  res.render("qa2");
});
app.get("/qa3",function(req,res)
{  res.render("qa3");
});
app.get("/qa4",function(req,res)
{  res.render("qa4");
});
app.get("/qa5",function(req,res)
{  res.render("qa5");
});
app.get("/qa6",function(req,res)
{  res.render("qa6");
});
app.get("/conclusion",function(req,res)
{  res.render("conclusion");
});
app.get("/conclusion1",function(req,res)
{  res.render("conclusion1");
});
app.get("/conclusion2",function(req,res)
{  res.render("conclusion2");
});

//testans

app.get("/dash",function(req,res) //isLoggedIn
{   
    var first=req.query.username;
    console.log(first);
    
   
    var obj0={
    "username" : first
    
   }
   
   console.log(obj0);
 
   arr.push(obj0);
  
   //var res=JSON.parse(obj);
   //console.log(first+" "+last);
    res.render("dash",{obj:obj0});
});
  
app.get("/testans",function(req,res)
{   
    var first=req.query.firstname+"Virus";
    var last=req.query.lastname+"Mickey";
    
  console.log
    var obj0={
    "firstname" : first,
    "lastname"  : last
  }
  var obj1={
    "firstname" : "shantanu",
    "lastname"  : "kumar"
  }
  var obj2={
    "firstname" : "hiiii",
    "lastname"  : "last"
  }
  console.log(obj1);
 
  arr.push(obj0);
  arr.push(obj1);
  arr.push(obj2);
  //var res=JSON.parse(obj);
  //console.log(first+" "+last);
    res.render("testans",{obj:arr[(i++)%3]});
});

app.get("/qa",function(req,res) //isLoggedIn
{   
    // var first=req.query.firstname+"Virus";
    // var last=req.query.lastname+"Mickey";
    
    var obj0={
    "q1" : "No rashes",
    "q2"  : "Yes, I have rashes",
    "q0" :"Do you have any rashes?"
  }
  //console.log(obj0);
 
  //arr.push(obj0);
  
  //var res=JSON.parse(obj);
  //console.log(first+" "+last);
    res.render("qa",{obj:obj0});
});


//movie api test
app.get("/testsearch",function(req,res){
    var query=req.query.search;
    request("http://www.omdbapi.com/?s="+ query +"&apikey=thewdb",function(error,response,body){
        console.log(body);
        if(!error&&response.statusCode==200)
        {
            var parsedata=JSON.parse(body);
            res.render("testsearch",{parsedata:parsedata,
                obj:arr[(i++)%3]
            });
        } 
        else
        {
            console.log(error);
        }
    }); 
});
 
//========================================================================================
     //======================
     //Auth routes
    // ======================
app.get("/qa",function(req,res)
{
    res.render("qa");
});
app.get("/login",function(req,res)
{
    res.render("login");
});
//get signup form
app.get("/signup",function(req,res)
{
    res.render("signup");
});
//post signup form
app.post("/signup",function(req,res)
{   //============
 User.register(
 new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        gender:req.body.gender,
        phoneno:req.body.phone,
        username:req.body.username,
        password:"",
        created:"",
        imagename:req.body.username+".jpeg",
        imagedisp:""
     }),
 req.body.password,
 function(err,user)
 {
     if(err)
     {
         console.log(err);
         res.render("signup");
     }
     passport.authenticate("local")(req,res,function(){
         res.render("login");
     });
 });
});

app.get("/main",function(req,res)
{
    res.render("main");
});
app.get("/captureImage",function(req,res)
{
    res.render("captureImage");
});
app.get("/contactus",function(req,res)
{
    res.render("contactus");
});
app.get("/test1",function(req,res)
{
    res.render("test1");
});
//================================================
//mongocheck
app.get("/checkmongo",function(req,res)
{
    res.render("checkmongo");
});

//======================================================
//html-node-java
app.get("/apicheck",function(req,res)
{
    res.render("apicheck");
});

/*app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  reply += req.body.image;
  res.send(reply);
 });*/
//==========================================================
//storing sign in details in database
app.post("/login",passport.authenticate("local",{
    successRedirect:"/dash",
    failureRedirect:"/login"
}),function(req,res)
{
    
});
/*app.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("main");
});*/


/*app.post("/signup",function(req,res)
{   shopguroos.create({
     firstname: req.body.first_name,
        lastname: req.body.last_name,
        emailid: req.body.email,
        password: req.body.password,
        username: req.body.display_name,
        created:  Date.now()
}
    );
    user.register(new user({
        username: req.body.display_name
    }),req.body.password,function(err,user)
    {
        if(err)
        {console.log(err);
        return res.render("signup");   
        }
       passport.authenticate("local")(req,res,function()
       {
           res.render("login");
       });
    });
});*/
app.listen(process.env.PORT,process.env.IP,function()
{

        console.log("Doctalk has started!! "+process.env.PORT+" "+process.env.IP+" Hello");
});



    

