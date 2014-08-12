$(document).ready(function() {
    //higlightjs
    
    //select
    $('.select').each(function (){
        var select = $(this);
        select.find ('.select-btn span.text').html(select.find('select :selected').text());
        select.find ('.select-btn').click (function (){
            console.
            $(this).closest('.select').find('select').trigger('click');    
        });
        select.find ('select').change(function() {
            var a = $(this).closest('.select').find('.select-btn');
            a.find('span.text').html($(this).find(':selected').text());   
        });
    });

    //$('.select .select-btn').find('span.text').html($('.select select').find(':selected').text());
    // $('.select .select-btn').click (function (){
    //     console.log ('select clicado');
    //     $(this).closest('.select').find('select').click();
    // });
    // $('.select select').change(function() {
    //     var a = $(this).closest('.select').find('.select-btn');
    //     a.find('span.text').html($(this).find(':selected').text());
    // });


    //note
    $('.close-btn').click(function() {
        $(this).closest('.note.close').slideUp('fast');
    });
    //switch
    $('.switch').click(function() {
        $(this).toggleClass('on');
        $(this).toggleClass('off');
    });
    //sidebar
    $('.docs-sidebar .tree .group .title').click(function (){
        $(this).closest('.group').toggleClass('open');
        $(this).next('.itens').slideToggle();
    });

    $('.docs-top .bt-menu').click(function (){
        $('.docs-sidebar').slideToggle();
    });


});
