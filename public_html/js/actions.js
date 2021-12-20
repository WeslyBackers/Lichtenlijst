/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//button to open GML file
$(".btn--getfileGML").click(function() {
    $(".choosefileGML").toggle();
    $('.title-top').remove();

});

//button to open JSON file
$(".btn--getfileJSON").click(function() {
    $(".choosefileJSON").toggle();
    $('.title-top').toggle();
});

//button to ...
$(".btn--list").click(function() {
    getList();
});

//button to initial view of webpage on load
$(document).ready(function() {
    /**AAN TE PASSEN BIJ RELEASE */

    //window.alert("DE LICHTENLIJST WORDT NIET MEER ALS VASTE PUBLICATIE IN BOEKVORM GEPUBLICEERD MAAR IS ENKEL NOG OP DEZE WEBSITE TE RAADPLEGEN EN TE DOWNLOADEN ");

    $(".navbar-inhoud").toggle();
    $(".div--title").hide();
    $(".div--introduction").hide();
    $(".div--notes").hide();
    $(".input--search").toggle();
    $(".header").toggle();
    $(".choosefileJSON").toggle();
    $(".choosefileGML").toggle();
    $(".div--fileInfo").toggle();
    $(".div--corresp-nrs").toggle();
    $("#mapid").toggle();
});


//Open search menu
$('.btn--openSearch').click(function() {
    $('.input--search').toggle();
});

//Open light information on click
$(".btn-map").click(function(lights) {
    $("#mapid").toggle();
    // console.log(lights);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
    var top = $(".div--map").top() + $(".div--map").height();
    $(".lltable").offset({top: top});
});

//show & hide section for print

$('.btn-print').click(function() {
    $(".div--introduction").show();
    $(".div--title").show();
    $(".div--index").show();
    $(".div--correcties").show();
    $(".div--notes").show();
    $(".header").toggle();
    $(".search").hide();
    $(".choosefileJSON").hide();
    $(".choosefileGML").hide();
    $(".btn-group").toggle();
    $(".div--corresp-nrs").toggle();
    $(".new-page").css("padding-top", "0");
    $(".imgzk").removeClass("w-50");
    $(".imgzk").addClass("w-100")
    $(".new-page").removeClass("card p-5 mt-5")
    makeIndex();
    window.print();
    $(".btn-group").toggle();
    $(".search").show();
    $(".choosefileGML").show();
    $(".choosefileJSON").show();
    $(".choosefileGML").toggle();
    $(".choosefileJSON").toggle();
    $(".div--corresp-nrs").toggle();
    $(".header").toggle();
    $(".new-page").css("padding-top", "200px");
    $(".imgzk").removeClass("w-100");
    $(".imgzk").addClass("w-50");
    $(".new-page").addClass("card p-5 mt-5");
    $(".div--title").hide();
    $(".div--correcties").hide();
    $(".div--index").hide();
    $(".div--introduction").hide();
    $(".navbar-inhoud").hide();
    $(".div--notes").hide();
});

//button to activate searchmenu (spyglass)
$('.btn--search').click(function() {
    filterTable();
});

//button to clear search filter
$('.btn--clear').click(function() {
    clearFilter();
});

// button to full screen view
$('.btn--expand').click(function() {

    if (maximized == 0) {
        openFullscreen();
        maximized = 1;
    } else {
        closeFullscreen();
        maximized = 0;
    }
});


//show all div for menu-navigation through "info"
$(".btn--info").click(function() {
    $(".navbar-inhoud").toggle();
    $(".div--introduction").toggle();
    $(".div--title").hide();
    $(".div--index").hide();
    $(".div--correcties").toggle();
    makeIndex();
});