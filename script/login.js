if(window.localStorage.getItem("staffId")!=undefined){
     window.location.href="PostJob.html";
}

$(document).keypress(function(e) {
    if(e.which == 13) {
       $("#submit").click();
    }
});

$("#submit").click(function(){
    //alert(localhostdomain);
    $("input").removeClass("errorClass");
    var valid = true;

    if($("#username").val()==""){
        $("#username").addClass("errorClass");  
        alert("Please key in username");
        valid = false;
    }

    if($("#password").val()==""){
        $("#password").addClass("errorClass");  
        alert("Please key in password");
        valid = false;
    }

    if(valid==true){
        var staffId = $("#username").val();
        var pw = $("#password").val();
        
        $.ajax({
            method: "POST",
            dataType: 'json',

            url: domain + "Locums/Hospital/staffAuthentication.php",
            data: { orgType:orgType, staffId: staffId, pw: pw },

            success: function(result){  
                //console.log(result);
            if(result.ReturnID=="100"){
                window.localStorage.setItem("addrCtry",result.Results[0].addrCtry);
                window.localStorage.setItem("countryDesc",result.Results[0].countryDesc);
                window.localStorage.setItem("firstName",result.Results[0].firstName);
                window.localStorage.setItem("lastName",result.Results[0].lastName);
                window.localStorage.setItem("locId",result.Results[0].locId);
                window.localStorage.setItem("orgId",result.Results[0].orgId);
                window.localStorage.setItem("orgName",result.Results[0].orgName);
                window.localStorage.setItem("regionDesc",result.Results[0].regionDesc);
                window.localStorage.setItem("staffEmail",result.Results[0].staffEmail);
                window.localStorage.setItem("staffId",result.Results[0].staffId);
                window.location.href="PostJob.html";
            } else {
                alert("Login failed");
            }
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
        });
    }

});