var login = function(){
    var username = $('#username').val();
    var password = $('#password').val();

    //alert(userName + ':' + password);
    $.ajax({
        type: 'GET',
        url: serverUrl + 'sign/login',
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
        },
        success: function(data){
            alert(data);
            console.log(data);
        },
        error: function(xhr,status,error){
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
     });
};