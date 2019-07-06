var mongoose=require("mongoose");
var passport=require("passport");
var passportlocal=require("passport-local");
var passlocalmongoose=require("passport-local-mongoose");
mongoose.connect("mongodb://localhost/ShopGuroo");

var mongoose=require("mongoose");
mongoose.connect("mongodb://ShopGuroo:ShopGur00@ds235711.mlab.com:35711/shopguroo");
var passport=require("passport");
var passportlocal=require("passport-local");
var passlocalmongoose=require("passport-local-mongoose");
//mongoose model config
var shopguroosSchema=new mongoose.Schema(
    {
        username: String,
        password: String
        
    },{
        collection: 'users'
    });
    shopguroosSchema.plugin(passlocalmongoose);
    module.exports=mongoose.model("users",shopguroosSchema);