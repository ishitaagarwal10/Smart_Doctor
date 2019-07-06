var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/Cmed");
var CmedSchema=new mongoose.Schema(
    {
        conclusion:String,
        medication:[]
    }
    );
    var Cmed=mongoose.model("cm",CmedSchema);
    Cmed.create(
        {
           //PLEASE DO NOT MESS WITH THIS CODE
           conclusion:"HVZ",
           medication:["Fluticasone"]
        },function(err,user){
            if(err)
                console.log(err);
            else
                console.log("New cm added!");
        });