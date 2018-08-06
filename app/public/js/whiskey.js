var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function() {
    var _id = getUrlParameter('id');
    console.log(_id + "hello");
    if (_id && $("#" + _id).length) {
        $('html, body').animate({
            scrollTop: $("#" + _id).offset().top
        }, 1000);
    }
});
