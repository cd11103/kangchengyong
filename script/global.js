var domain = "http://localhost/Locum/";
//var domain = "https://ess.knowledgetouch.com/";

var orgType = "DEMO";
//var SUCCESS = "100";

function logout(){
    var logout = confirm("Are you sure you want to logout?");
    if (logout == true) {
        window.localStorage.clear();
        window.location.href='index.html';
    } 
    
}