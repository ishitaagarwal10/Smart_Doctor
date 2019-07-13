var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var request=require("request");
var async = require("asyncawait/async");
var await = require("asyncawait/await");
var Promise=require("bluebird");
var fs=require("fs");
var AWS = require("aws-sdk");
var Jugaad=require("./models/signindb");
//var shell=require("shelljs");
var flag=0;
var exec = require("child_process").exec;

//shell====================================
var shell = Promise.promisifyAll(require('shelljs'));

//shell.exec("s3 rm s3://doctalkbucket/JTW1.jpeg --region ap-south-1");
//================================================

var flash = require('connect-flash');
//var api=require('./api');
//var shopguroos=require("./models/db");
//var popup = require('popups');
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(flash());

//===================
//mongconnect
var mongoose=require("mongoose");
var passport=require("passport");
var passportlocal=require("passport-local");
var passlocalmongoose=require("passport-local-mongoose");
//collections=users
//mongoose.connect("mongodb://localhost/User"); 
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
     //kyu??
app.get("/",function(req,res)
{  shell.exec("s3cmd sync userimage s3://shantanubck/");
Jugaad.deleteMany({},function(err,z)
   {
       if(err)
       console.log(err);
       else
      console.log("Deleted"); 
       
   });
    res.render("main");
});

//=======================================
//webcam
var base64ToImage = require('base64-to-image');
var user=async(function(userimage,req,res)
{
   var image=userimage.substring(10);
   await(User.find({imagename:image},function(err,z)
   {
       if(err)
       console.log(err);
       else
       console.log(z);
       res.render("dash",{obj:z[0]});
   }));
//   await(Jugaad.deleteMany({},function(err,z)
//   {
//       if(err)
//       console.log(err);
//       else
//       console.log("Deleted"); 
       
//   }));
//   /*await(Jugaad.create({imagename:image},function(err,z)
//   {
//       if(err)
//       console.log(err);
//       else
//       console.log("object with "+image +"created");
//   }))*/
//   var val = new Jugaad({ imagename: image });
 
//     // save model to database
//     val.save(function (err, book) {
//       if (err) return console.error(err);
//       console.log(book.imagename + " saved to Uses.jugaads collection.");
//     });
   
});
//storeImage + login on basis of image captured

    //rukcopy==========
var ruk=async( function(image,req,res)
    {   var imagematch="hell";
        var params = {
                SimilarityThreshold: 90,
                SourceImage: {
                         S3Object: {
                                     Bucket: "shantanubck",
                                     Name: "userimage/temp.jpeg"
                                    }
                        },
                TargetImage: {
                         S3Object: {
                                     Bucket: "shantanubck",
                                     Name: "userimage/"+image
                                    }
                        }
                };
    var rekognition = new AWS.Rekognition();
           
    await(rekognition.compareFaces(params, function (err, data) {
                      if (err) console.log(err, err.stack); // an error occurred
                    else{ 
                        if(data.FaceMatches.length!=0) //res.render("signup");
                            {
                                shell.exec("s3cmd del s3://shantanubck/userimage/temp.jpeg");
                                console.log("Matched!");
                               console.log(params.TargetImage.S3Object.Name);
                               user(params.TargetImage.S3Object.Name,req,res);
                                //console.log(this.flag);
                                //res.render("dash");
                                imagematch= params.TargetImage.S3Object.Name;
                                console.log("imagematch "+ imagematch);
                                //this.image=params.TargetImage.S3Object.Name;
                            }
                       
                            //console.log(data);
                        }   // successful response
                })); 
                return imagematch;
    });
    
    //imagename-----
    
 function hello()
 {
     console.log("Waiting");
 }
var imagename= async (function(req,res)
{
    
AWS.config.setPromisesDependency(Promise);
AWS.config=new AWS.Config();
AWS.config.accessKeyId="AKIAIWPZ55MWIRR2M56A";
AWS.config.secretAccessKey="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";
AWS.config.region="us-east-1";

var passportLocalMongoose=require("passport-local-mongoose");

//AWS.config.update({ region: "us-east-1"});

var num=await( User.countDocuments({},function(err,x){
        if(err)
            console.log(err);
        else
        {   
            return x;
        }
    
    }));
    console.log("num "+num );
    //console.log(x+"^^^");
        /*const wait = time => new Promise((resolve) => setTimeout(resolve, time));

        wait(500).then(() => console.log("hello"));*/
var s3 =  new AWS.S3();
var userobjs=await( User.find({},function(err,z){
             if(err)
                console.log(err);
            else
            {
            //use z;
                return z;
            }
        }));
console.log(userobjs);
var imagematch="hell"; 
for(var i=0;i<num;i++)
{    
    console.log(userobjs[i].imagename+"\n");
    //var uwait="o";
    ruk(userobjs[i].imagename,req,res).then(function(x)
    {
        if(x!="hell")
        {imagematch=x;
        }
        //uwait="p";
    }).catch(function(err)
    {
        console.log(err);
        //uwait="p";
    });
   
      //while(uwait!="p");
      //uwait="o";
        
        console.log("i "+i);

}

return imagematch;        
//console.log("SSDFSDFDS");
           
});

//imagenamecopy



            
        
    
app.post("/storeImage",function(req,res)
{  
   // var image="check";
    var base64Str=req.body.image;
    //var first=req.body.username;
    //console.log(req.body.image);
    
    var path="./userimage/";
    var optionalObj = {'fileName': 'temp', 'type':'jpeg'};


    base64ToImage(base64Str,path,optionalObj); 
    
    //Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
    var imageInfo = base64ToImage(base64Str,path,optionalObj);
   shell.exec("s3cmd sync userimage s3://shantanubck/",function(err,x)
   {   if(err)
   {
       console.log(err);
   }
   else
       shell.exec("s3cmd sync userimage s3://shantanubck/");
   });
  
    // imagename().then(function(x)
    // {  
    //     //setTimeout(hello,5000);
    //     console.log(x);
    //     if(x=="hell")
    //     {
    //         res.render("signup");
    //     }
    //     else
    //     {  //console.log(this.image);
    //         res.render("dash");
    //     }
    // }).catch(function(err)
    // {
    //     console.log(err);
    // });
   imagename(req,res);
//   call().then(
//         Jugaad.find({},function(err,z){
//                 if(err)
//                     console.log(err);
            
//             //use z;
//                 console.log(z);
//                 User.find({imagename:z[0].imagename},function(err,y)
//                 {   
//                     if(err)
//                     console.log(err);
//                     console.log("This seems close"+y);
//                 //return y[0];
//                     res.render("dash",{obj:y[0]});
//                 });
//                 }
//                 )
//                 );
           
   //console.log(obj);
     
    //res.render("signup");
    //===========================
    
//AWS.config.loadFromPath('./cred.json');
// AWS.config.setPromisesDependency(require('bluebird'));
// AWS.config=new AWS.Config();
// AWS.config.accessKeyId="AKIAIWPZ55MWIRR2M56A";
// AWS.config.secretAccessKey="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";
// AWS.config.region="us-east-1";

// var passportLocalMongoose=require("passport-local-mongoose");

// //AWS.config.update({ region: "us-east-1"});
// var num;
// User.countDocuments({},function(err,x){
//     if(err)
//         console.log(err);
//     else
//     {
//         //console.log(x+"^^^");
//         /*const wait = time => new Promise((resolve) => setTimeout(resolve, time));

//         wait(500).then(() => console.log("hello"));*/
//         var s3 = new AWS.S3();
//         User.find({},function(err,z){
//         if(err)
//             console.log(err);
//         else
//         {
//             //use z;
//             var i;

//             for(i=0;i<x;i++)
//             {    
//                 console.log(z[i].imagename+"\n");
//                 var params = {
//                 SimilarityThreshold: 90,
//                 SourceImage: {
//                          S3Object: {
//                                      Bucket: "shantanubck",
//                                      Name: "userimage/temp.jpeg"
//                                     }
//                         },
//                 TargetImage: {
//                          S3Object: {
//                                      Bucket: "shantanubck",
//                                      Name: "userimage/"+z[i].imagename
//                                     }
//                         }
//                 };
//             var rekognition = new AWS.Rekognition();
            
//             rekognition.compareFaces(params, function (err, data) {
//                       if (err) console.log(err, err.stack); // an error occurred
//                         else{ 
//                             if(data.FaceMatches.length!=0) //res.render("signup");
//                             {
//                                 shell.exec("s3cmd del s3://shantanubck/userimage/temp.jpeg");
//                                 console.log("Matched!");
//                                 this.flag=params.TargetImage.S3Object.Name;
//                                 console.log(this.flag);
//                                 res.render("dash");
//                             }
//                             //console.log(data);
//                         }   // successful response
//             });

//             }
            
//             console.log("SSDFSDFDS");
           
//         }
//     });
//     }
// });

});

    

//session function
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
app.get("/ec2-35-154-220-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa1");
});
app.get("/ec2-35-154-230-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa2");
});
app.get("/ec2-35-154-240-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa3");
});
app.get("/ec2-35-154-250-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa4");
});
app.get("/ec2-35-154-260-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa5");
});
app.get("/ec2-35-154-270-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa6");
});
app.get("/ec2-35-154-280-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa7");
});
app.get("/ec2-35-154-290-70.ap-south-1.compute.amazonaws.com/qa",function(req,res)
{  res.render("qa8");
});
app.get("/ec2-35-150-229-70.ap-south-1.compute.amazonaws.com/conclusion",function(req,res)
{  res.render("conclusion");
});
app.get("/ec2-35-160-229-70.ap-south-1.compute.amazonaws.com/conclusion",function(req,res)
{  res.render("conclusion1");
});
app.get("/ec2-35-170-229-70.ap-south-1.compute.amazonaws.com/conclusion",function(req,res)
{  res.render("conclusion2");
});
app.get("/ec2-35-180-229-70.ap-south-1.compute.amazonaws.com/conclusion",function(req,res)
{  res.render("conclusion3");
});
app.get("/ec2-35-190-229-70.ap-south-1.compute.amazonaws.com/conclusion",function(req,res)
{  res.render("conclusion4");
});


//testans

app.get("/dash",function(req,res) //isLoggedIn
{    
    
    console.log("Request body for dash"+req.user);
//     var first=req.query.username;
//     console.log(first);
    
   
//     var obj0={
//     "username" : first
    
//   }
   
//   console.log(obj0);
 
//   arr.push(obj0);
//   var obj={
//       "firstname":"Sirsh"
//   }
   //var res=JSON.parse(obj);
   //console.log(first+" "+last);
    res.render("dash",{obj:req.user});
    
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


//kyun?? qa has 2 functions which one to execute
app.post("/qa",function(req,res) //isLoggedIn
{
    
   // console.log(req.body);
 var answer= req.body.q_answer;
  console.log(answer);

request.post("http://doctalkapi-env.rvhwpsgzbm.ap-southeast-1.elasticbeanstalk.com/user/user1/",{
  json: {
    answer: answer
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body);
});

 request("http://doctalkapi-env.rvhwpsgzbm.ap-southeast-1.elasticbeanstalk.com/user/user2/",function(error,response,body){
        if(!error&&response.statusCode==200)
        {
            var parsedata=JSON.parse(body);
            console.log(parsedata);
           // res.render("qa",{obj:parsedata});
        }
        else
        {
            console.log(error);
        }
    });
    
    // var first=req.query.firstname+"Virus";
    // var last=req.query.lastname+"Mickey";
    
//     var obj0={
//     "q1" : "No rashes",
//     "q2"  : "Yes, I have rashes",
//     "q0" :"Do you have any rashes?"
//   }
  //console.log(obj0);
 
  //arr.push(obj0);
  
  //var res=JSON.parse(obj);
  //console.log(first+" "+last);
   // res.render("qa",{obj:obj0});
   
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
    //kyun??
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
///aws s3 upload
var base64Str=req.body.image;
    //console.log(req.body.image);
   var path="./userimage/";
    var optionalObj = {'fileName': req.body.firstname, 'type':'jpeg'};


    base64ToImage(base64Str,path,optionalObj); 
    
    //Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
    var imageInfo = base64ToImage(base64Str,path,optionalObj);
   //shell.exec("s3cmd put userimage/req.body.firstname+".jpeg" s3://doctalkbucket/");
   //var my_url= "s3cmd put userimage/"+req.body.firstname+".jpeg s3://doctalkbucket/" ;
   
    
    //===========================
    
    //AWS.config.loadFromPath('./cred.json');
    //var s3 = new AWS.S3();
    //var rekognition = new AWS.Rekognition();
    var name=req.body.firstname+".jpeg";
   shell.exec("s3cmd sync userimage s3://shantanubck/",function(err,x){
       if(err)
       {
           console.log(err);
       }
       else
        shell.exec("s3cmd sync userimage s3://shantanubck/");
    });
    
    //shell.exec("s3cmd sync userimage s3://shantanubck/").then(shell.exec("s3cmd sync userimage s3://shantanubck/"));
   //=============================
 User.register(
 new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dob:req.body.dob,
        gender:req.body.gender,
        phoneno:req.body.phone,
        username:req.body.username,
        password:"",
        imagename:req.body.firstname+".jpeg",//kyun?? was username changed to firstname
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
app.get("/setting",function(req,res)
{
    res.render("setting");
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
    failureRedirect:"/login",
    failureFlash: "Invalid username or password"
}),function(req,res)
{
   
});
// function isUser(req,res,next)
// {    var i=0;
//     passport.authenticate("local")(req,res,function()
//   {
//      if(req.isAuthenticated())
//      { console.log("Yes redirecting to dash");
     
//          return next();
//      }
     
     
     
//   });
  
    
// }
// app.post("/login",function(req,res)
// { 
//     var obj={
//     "firstname":"Sirsh"
// };
//   res.render("dash",{obj:obj});
// });

//logout
//====================
app.get("/logout",function(req,res)
{
    req.logout();
    console.log("Logged out");
    res.redirect("main");
});
//=========================
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
