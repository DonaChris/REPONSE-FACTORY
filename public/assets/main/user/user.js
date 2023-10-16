//vérification du formulaire de l'enrégistrement

$('#register').click(function () {
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm_password = $('#confirm_password').val();
    var passwordLength = passwordLength;
    var agreeTerms = $('#agreeTerms');

    if (firstname != "" && /^[a-zA-Z ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]+$/.test(firstname)) {
        $('#firstname').remove('is-invalid');
        $('#firstname').addClass('is-valid');
        $('#error-register-firstname').text("");
        if (lastname != "" && /^[a-zA-Z ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]+$/.test(lastname)) {
            $('#lastname').remove('is-invalid');
            $('#lastname').addClass('is-valid');
            $('#error-register-lastname').text("");
            if (email != "" && /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(email)) {
                $('#email').remove('is-invalid');
                $('#email').addClass('is-valid');
                $('#error-register-email').text("");
                if (passwordLength >= 8) {
                    $('#password').remove('is-invalid');
                    $('#password').addClass('is-valid');
                    $('#error-register-password').text("");
                    if (password == confirm_password) {
                        $('#confirm_password').remove('is-invalid');
                        $('#confirm_password').addClass('is-valid');
                        $('#error-register-confirm_password').text("");
                        if (agreeTerms.is('checked')) {
                            $('#agreeTerms').removeClass(is-invalid);
                            $('#error-register-agree-terms').text("");
                        }else{
                            $('#agreeTerms').addClass(is-invalid);
                            $('#error-register-agree-terms').text("You should agree our terms and conditions");
                        }
                    }else{
                        $('#confirm_password').addClass('is-invalid');
                        $('#confirm_password').remove('is-valid');
                        $('#error-register-confirm_password').text("Your password must be identical");
                    }
                }else{
                    $('#password').addClass('is-invalid');
                    $('#password').remove('is-valid');
                    $('#error-register-password').text("Your password must be at last 8 characters");
                }
            }else{
                $('#email').addClass('is-invalid');
                $('#email').remove('is-valid');
                $('#error-register-email').text("Your email address is not valid");
            }
        }else{
            $('#lastname').addClass('is-invalid');
            $('#lastname').remove('is-valid');
            $('#error-register-lastname').text("Last name is not valid");
        }
    }else{
        $('#firstname').addClass('is-invalid');
        $('#firstname').remove('is-valid');
        $('#error-register-firstname').text("First name is not valid");
    }
})
