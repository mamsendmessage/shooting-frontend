$('button.submit').disabled = true; // disable button on load

// Enable button 
function enable_submit() {
    $('button.submit').disabled = false;
    $('button.submit').addClass('not-disabled');
}

// Disable button
function disable_submit() {
    $('button.submit').disabled = true;
    $('button.submit').removeClass('not-disabled');
}

// Display feedback after rating 
$('.rating__input').on('click', function() {
    var rating = this['value'];
    $('.rating__label').removeClass('active');
    $(this).siblings('.rating__label').addClass('active');
    $('.feedback').css('display', "block");

    feedback_validate(rating);

});

// Run enable button function based on input
$('.feedback textarea').keyup(function() {
    if ($('.feedback textarea').val().length > 3) {
        enable_submit();
    }
});

// Enable or disable button by validation
function feedback_validate(val) {
    if (val <= 3) {
        disable_submit();

    } else if (val > 3) {
        enable_submit();
    }

}