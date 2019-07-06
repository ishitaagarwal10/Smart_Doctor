 //alert("PASSWORD doesnt match!!  Re-Enter Password");
     $(document).ready(function()
{
    $("#button").hover(function()
    {
     $("#password").attr("type","text");
    },function()
    {
     $("#password").attr("type","password");
    })
});
          