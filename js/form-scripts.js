$("#contactForm").validator().on("submit", (event) => {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Please fill all required fields!");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


var submitForm => (){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
        success : (text) => {
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

var formSuccess = () => {
    $("#contactForm");
    submitMSG(true, "Message Sent!")
}

var formError(){
    $("#contactForm").removeClass().addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    var msgClasses = (valid) ? "h3 text-center fadeIn animated text-success" : "h3 text-center text-danger" ;
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
