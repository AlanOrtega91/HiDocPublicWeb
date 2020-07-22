$(function () {
    $('.nav-menu').on('click', toggleMenu);

    function toggleMenu(){
        $('.nav-menu .links').toggleClass('hidden');
    }
});
