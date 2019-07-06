var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/User"); 
var passportLocalMongoose=require("passport-local-mongoose");
var UserSchema=new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        dob:String,
        gender:String,
        phoneno:Number,
        username:String,
        password:String,
        //created:Date.now(),
        imagename:String
    }
    );
    //to add objects through mongo
    
    //User=database
    //users=collection
   /* var User=mongoose.model("User",UserSchema);
    User.create(
        {
           //PLEASE DO NOT MESS WITH THIS CODE
        firstname:"HVZ",
        lastname:"",
        dob:"",
        gender:"",
        phoneno:23,
        username:"",
        password:"",
        //created:Date.now(),
        imagename:"fdfdsf",
        },function(err,user){
            if(err)
                console.log(err);
            else
                console.log("New user added!");
        });*/
        //to add objects through server
    UserSchema.plugin(passportLocalMongoose);
    module.exports=mongoose.model("users",UserSchema);