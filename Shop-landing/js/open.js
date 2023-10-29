$(document).ready(function() {
    $('.menu-burger').click(function() {
        $('.menu-burger').toggleClass('open-menu');
        $('.menushka').toggleClass('open-menu');
        $('body').toggleClass('fixed-page');
    });
});