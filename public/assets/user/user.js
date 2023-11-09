//vérification du formulaire de l'enrégistrement des utilisateurs
$('#register').click(function () {
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm_password = $('#confirm_password').val();
    var agreeTerms = $('#agreeTerms');
    var passwordLength = passwordLength;

    if (firstname != "" && /^[a-zA-Z ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]+$/.test(firstname)) {
        $('#firstname').removeClass('is-invalid');
        $('#firstname').addClass('is-valid');
        $('#error-register-firstname').text("");

        if (lastname != "" && /^[a-zA-Z ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]+$/.test(lastname)) {
            $('#lastname').removeClass('is-invalid');
            $('#lastname').addClass('is-valid');
            $('#error-register-lastname').text("");

            if (email != "" && /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
                $('#email').removeClass('is-invalid');
                $('#email').addClass('is-valid');
                $('#error-register-email').text("");

                if (passwordLength >= 8) {
                    $('#password').removeClass('is-invalid');
                    $('#password').addClass('is-valid');
                    $('#error-register-password').text("");

                    if (password == confirm_password) {
                        $('#confirm_password').removeClass('is-invalid');
                        $('#confirm_password').addClass('is-valid');
                        $('#error-register-confirm_password').text("");

                        if (agreeTerms.is(':checked')) {
                            $('#agreeTerms').removeClass(is-invalid);
                            $('#error-register-agree-terms').text("");

                            //envoi et validation des données entrées dans le formulaire : $('#form-register').submit();
                            var res = existEmailjs(email);

                            /*if (res != exist) {
                                $('#form-register').submit()
                            } else {
                                $('#email').addClass('is-invalid'),
                                $('#email').removeClass('is-valid'),
                                $('#error-register-email').text("Your email address is not valid");
                            }*/

                            (res != exist) ? $('#form-register').submit()
                                        :
                                             ($('#email').addClass('is-invalid'),
                                             $('#email').removeClass('is-valid'),
                                             $('#error-register-email').text("Your email address is not valid"));
                        }else{
                            $('#agreeTerms').addClass(is-invalid);
                            $('#error-register-agree-terms').text("You should agree our terms and conditions");
                        }
                    }else{
                        $('#confirm_password').addClass('is-invalid');
                        $('#confirm_password').removeClass('is-valid');
                        $('#error-register-confirm_password').text("Your password must be identical");
                    }
                }else{
                    $('#password').addClass('is-invalid');
                    $('#password').removeClass('is-valid');
                    $('#error-register-password').text("Your password must be at last 8 characters");
                }
            }else{
                $('#email').addClass('is-invalid');
                $('#email').removeClass('is-valid');
                $('#error-register-email').text("Your email address is not valid");
            }
        }else{
            $('#lastname').addClass('is-invalid');
            $('#lastname').removeClass('is-valid');
            $('#error-register-lastname').text("Last name is not valid");
        }
    }else{
        $('#firstname').addClass('is-invalid');
        $('#firstname').removeClass('is-valid');
        $('#error-register-firstname').text("First name is not valid");
    }
})

//évènement concernant l'input (termes et conditions)
$('#agreeTerms').change(function () {
    var agreeTerms = $('#agreeTerms');

    if (agreeTerms.is(':checked')) {
        $('#agreeTerms').removeClass(is-invalid);
        $('#error-register-agree-terms').text("");
    }else{
        $('#agreeTerms').addClass(is-invalid);
        $('#error-register-agree-terms').text("You should agree our terms and conditions");
    }
})

//cette foncton vérifie si l'email existe déjà dans la BD
function existEmailjs(email) {
    var url = $('#email').attr('url-emailExist');
    var token = $('#email').attr('token');
    var res = "";

    $.ajax({
        type: 'POST',
        url: url,
        data: {
            '_token': token,
            email: email
        },
        success:function (result){
            res = result.response;
        },
        //rend les variables accessibles à l'extérieur de la fonction
        async: false
    });
    return res;
}
