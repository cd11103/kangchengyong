$("#submit").click(function(){
    $("input").removeClass("errorClass");
    var valid = true;

    if($("#email").val()==""){
        $("#email").addClass("errorClass");  
        alert("Please key in your email address");
        valid = false;
    }

    if(valid==true){
        var staffId = $("#email").val();
        
        
        /*$.ajax({
            method: "POST",
            dataType: 'json',

            url: "http://localhost/Locums/Hospital/staffAuthentication.php",
            data: { orgType:"LOCUMS", staffId: staffId, pw: pw },

            success: function(){  
                alert('success');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
        });*/
    }

});