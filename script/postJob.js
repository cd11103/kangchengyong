$('#startDate').on('dp.change', function(e){
    $("#endDate").data("DateTimePicker").minDate(e.date);
})
$(document).ready(function(){
    $("#startDate").datetimepicker({

        format: 'DD/MM/YYYY',
        minDate: moment()
        
    });

    $("#endDate").datetimepicker({

        format: 'DD/MM/YYYY',
        minDate: moment()
    });

    $("#startTime").datetimepicker({

        format: 'HH:mm',
        stepping: 30
    });
    $("#endTime").datetimepicker({

        format: 'HH:mm',
        stepping: 30
    });
    
     $.ajax({
            method: "POST",
            dataType: 'json',

            url: domain + "Locums/Hospital/gradeList.php",
            data: { orgType:orgType },

            success: function(result){  
                if(result.ReturnID=="100")
                {
                    for(var i=0;i<result.Results.length;i++)
                    {
                        $("#grade").append("<option value='"+result.Results[i].gradeId+"'>"+result.Results[i].grade+"</option>");
                    }
                }else {
                    console.log("Grade failed to retrieve");
                }
                
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
    });
    
    $.ajax({
            method: "POST",
            dataType: 'json',

            url: domain + "skillPositionList.php",
            data: { orgType:orgType },

            success: function(result){  
                if(result.ReturnID=="100")
                {
                    
                    for(var i=0;i<result.Results.length;i++)
                    {
                        $("#specialization").append("<option value='"+result.Results[i].field+"'>"+result.Results[i].skillPosition+"</option>");
                    }
                }else {
                    console.log("Specialization failed to retrieve");
                }
                
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
    });
    
    var orgId = window.localStorage.getItem("orgId");
    $.ajax({
            method: "POST",
            dataType: 'json',

            url: domain + "Locums/Hospital/retrieveJobs.php",
            data: { orgType:orgType, orgID:orgId },

            success: function(result){  
                console.log(result);
                if(result.ReturnID=="100")
                {
                    //debugger;
                    
                        var orgId = window.localStorage.getItem("orgId");
                        var pad = "0000000";
                        var jobId = orgId+"-"+(pad + parseInt(result.Results.length+1)).slice(-pad.length);
                        window.localStorage.setItem("jobId",jobId);
                        
                    
                }else {
                    console.log("Jobs failed to retrieve");
                }
                
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            }
    
    });
    
   

});
$("#header").load("./Layout.html");
$("#submit").click(function(){
    $("input").removeClass("errorClass");
    $("textarea").removeClass("errorClass");
    var valid = true;

    if($("#refID").val()==""){
        $("#refID").addClass("errorClass");
        valid = false;
    }
    
    if($("#specialization").val()==""){
        $("#specialization").addClass("errorClass");
        valid = false;
    }
    
    if($("#grade").val()==""){
        $("#grade").addClass("errorClass");
        valid = false;
    }
    
    if($("#startDate").val()==""){
        $("#startDate").addClass("errorClass");
        valid = false;
    }
    
    if($("#endDate").val()==""){
        $("#endDate").addClass("errorClass");
        valid = false;
    }
    
    if($("#startTime").val()==""){
        $("#startTime").addClass("errorClass");
        valid = false;
    }
    
    if($("#endTime").val()==""){
        $("#endTime").addClass("errorClass");
        valid = false;
    }
    
    if($("#rate").val()==""){
        $("#rate").addClass("errorClass");
        valid = false;
    }
    
    if($("#quantity").val()==""){
        $("#quantity").addClass("errorClass");
        valid = false;
    }

    if($("#description").val()==""){
        $("#description").addClass("errorClass");
        valid = false;
    }
    if(valid==true){
        var orgId = window.localStorage.getItem("orgId");
        var refId = $("#refID").val();
        var jobId = window.localStorage.getItem("jobId");
        var postDate = moment().format('YYYY-MM-DD HH:mm:ss');
        var postBy = window.localStorage.getItem("staffId");
        var specialization = $("#specialization option:selected").text();
        var grade = $("#grade option:selected").text();
        var eventDesc = $("#description").val();
        var eventStart = moment($("#startDate").datetimepicker("date")).format('YYYY-MM-DD') + " " + moment($("#startTime").datetimepicker("date")).format('HH:mm:ss');
        var eventEnd = moment($("#endDate").datetimepicker("date")).format('YYYY-MM-DD') + " " + moment($("#endTime").datetimepicker("date")).format('HH:mm:ss');
        var rate = $("#rate").val();
        var reqCount = $("#quantity").val();
        $.ajax({
            method: "POST",
            dataType: 'json',

            url: domain + "Locums/Hospital/checkRefID.php",
            data: { orgType:orgType, orgID: orgId, refID: refId },

            success: function(result){  
                debugger;
                if(result.ReturnID=="100")
                {
                    $.ajax({
                    method: "POST",
                    dataType: 'json',

                    url: domain + "Locums/Hospital/newJob.php",
                    data: { orgType:orgType, orgID: orgId, jobID: jobId, jobIntRef: refId, postDate: postDate, postBy: postBy, specialization: specialization, grade: grade, eventDesc: eventDesc, eventStart: eventStart, eventEnd: eventEnd, eventLoc: "",rate: rate, reqCount: reqCount },

                    success: function(result){  
                        debugger;
                        if(result.ReturnID=="100")
                        {
                            alert("New job created.");

                        }else {
                            alert("Add job failed.");
                        }


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    } 
                });
                    
                }else {
                    alert("There is a duplicate of ref id, please change other ref id.");
                }
                
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
        });
    }else {
        alert("Please fill in all information before proceed.");
    }

});