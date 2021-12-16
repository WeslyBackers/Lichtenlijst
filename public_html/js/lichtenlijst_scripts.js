var zonelist = [];
var maximized = 0;
var lights = [];
//gesorteerde array van alle lichten met alle properties
var listNatn = [];
var ordenedLights = [];
var lightsC = []; //lijst van lichten, Alle lichten met zelfde natnr ondergebracht in 1 lijstobject
//var newlights=[];


// Get the table
var header = document.getElementById("table--head-ll");

// Get the offset position of the navbar



//aanmaken van de map
var mymap = L.map("mapid").setView([51.400, 3.25], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

var greenIcon = L.icon({
    iconUrl: './img/greenlight.png',
    iconSize: [16, 16],
    iconAnchor: [16, 0],
    popupAnchor: [0, 0]
});

var redIcon = L.icon({
    iconUrl: './img/redlight.png',
    iconSize: [16, 16],
    iconAnchor: [16, 0],
    popupAnchor: [0, 0]
});

var yellowIcon = L.icon({
    iconUrl: './img/yellowlight.png',
    iconSize: [16, 16],
    iconAnchor: [16, 0],
    popupAnchor: [0, 0]
});

var whiteIcon = L.icon({
    iconUrl: './img/whitelight.png',
    iconSize: [16, 16],
    iconAnchor: [16, 0],
    popupAnchor: [0, 0]
});

//elem to maximize app
var elem = document.documentElement;


/* get data from json-file */
/* call getList() through button class 'btn-list' */


//get all different zones of the lights from JSON
function getZonesJSON(feature) {

    if (zonelist.indexOf(feature.properties.llzone) < 0) {

        zonelist.push(feature.properties.llzone);
    }

}

//print zonelist to console
function printList(zonelist) {

    for (i = 0; i < zonelist.length; i++) {

        console.log(zonelist[i]);
    }
}


//sort all features in JSON(lights)

function sortFeaturesJSON(lights) {

    lights.features.sort(function(a, b) {

        var x = parseFloat(a.properties.llnatn);
        var y = parseFloat(b.properties.llnatn);

        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });

}


//Add zones to the table with own table
function addZones(zonelist) {

    for (x = 0; x < zonelist.length; x++) {

        $('.lltable').append('<tbody id=tbody tbody--' + x + ' class=tbody--' + x + ' my-5 text-uppercase><tr class="subtitle tbody__title text-left"><td class="tbody__title--' + x + '" colspan="8"><h5 class="pt-5">' + zonelist[x] + '</h5></td></tr><tr></tr></tbody>');
    }

}



function checkSectorlights(lights) {

    /**Merge individual light-objtects in 1 array. */

    //console.log(lights);

    for (x = 0; x < lights.features.length; x++) {

        var filterresult = lights.features.filter(obj => {
            return obj.properties.llnatn === lights.features[x].properties.llnatn;
        });

        lightsC.push(filterresult);

        /** Delete objects with 2 or more copies*/
        if (filterresult.length > 1) {
            filterresult.forEach(e => lights.features.splice(lights.features.findIndex(f => f.properties.llnatn === e.properties.llnatn), 1));
        }

    }

    //console.log(lightsC);
}

/** gebruikt om sector te sorteren van klein naar groot */
function getLightCombination(obj) {

    /** sort on SECTR1 attribute */
    if (obj[0].properties.SECTR1 != "") {

        obj.sort(function(a, b) {

            var x = parseFloat(a.properties.SECTR1);
            var y = parseFloat(b.properties.SECTR1);

            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });

    }
    return obj;
}


/** bepalen van de lichtsein-string voor sectorlichten */
function getLightsignal(feature) {

    var lichtsein = "";
    var catlitarray = [];

    /** if{}  enkel voor sectorlichten */
    if (feature.length > 1) {

        //console.log(feature+" : deze is een array");

        arrayShortlitchr = [];
        arrayShortSiggrp = [];
        arrayShortColours = [];
        arrayShortSigper = [];
        arrayShortCatlit = [];

        for (x = 0; x < feature.length; x++) {
            arrayShortlitchr.push(chooseLightchr(feature[x].properties.LITCHR));
            arrayShortSiggrp.push(feature[x].properties.SIGGRP);

            if (arrayShortColours.indexOf(chooseColour(feature[x].properties.COLOUR)) === -1) {
                arrayShortColours.push(chooseColour(feature[x].properties.COLOUR));
            }

            arrayShortSigper.push(chooseSigper(feature[x].properties.SIGPER));
            arrayShortCatlit.push(feature[x].properties.CATLIT);
        }
        //console.log(arrayShortCatlit);

        /**Maak combinatie van lichtenkleuren Sectorlicht */
        var colorcombi = "";

        if (arrayShortColours.indexOf('W.') > -1) {
            colorcombi = colorcombi + "W";
        }
        if (arrayShortColours.indexOf('R.') > -1) {
            colorcombi = colorcombi + "R";
        }
        if (arrayShortColours.indexOf('G.') > -1) {
            colorcombi = colorcombi + "G";
        }
        if (arrayShortColours.indexOf('Bu.') > -1) {
            colorcombi = colorcombi + "Bu";
        }

        if (arrayShortColours.indexOf('Y.') > -1) {
            colorcombi = colorcombi + "Y";
        }
        if (arrayShortColours.indexOf('Vi.') > -1) {
            colorcombi = colorcombi + "Vi";
        }

        lichtsein = arrayShortlitchr[0] +
            colorcombi +
            ". " +
            arrayShortSigper[0];

        /** Zoeken als CATLIT = Directional light => "Dir." bij lichtsein plaatsen */
        for (x = 0; x < arrayShortCatlit.length; x++) {
            if (arrayShortCatlit[x] !== undefined) {
                catlitarray = arrayShortCatlit[x].split(",");

                if (catlitarray.indexOf("1") > -1) {
                    lichtsein = "Dir." + lichtsein;
                    x = arrayShortCatlit.length;
                }
            }
        }
        //console.log(lichtsein);
    }

    /**in het geval het geen sectorlicht is */
    else {


        lichtsein = chooseLightchr(feature[0].properties.LITCHR, feature[0].properties.SIGGRP) +
            chooseColour(feature[0].properties.COLOUR) +
            " " +
            chooseSigper(feature[0].properties.SIGPER);
        //+ feature.properties.LITVIS;
        catlitarray = feature[0].properties.CATLIT;

        if (catlitarray !== undefined) {
            catlitarray = catlitarray.split(",");
            if (catlitarray.indexOf("1") > -1) {
                lichtsein = "Dir." + lichtsein;
            }
        }

    }
    //console.log(feature);
    //console.log(Array.isArray(arrayCatlit));
    return lichtsein;
}


// get light-information and add to the table
function addLightsJSON(lightsArray) {
    console.log(lightsArray)
    feature = lightsArray[0];
    console.log(feature);
    var COLOUR = chooseColour(feature.properties.COLOUR);

    var SIGGRP = feature.properties.SIGGRP;
    var SECTR1 = feature.properties.SECTR1;
    var SECTR2 = feature.properties.SECTR2;
    var SIGPER = chooseSigper(feature.properties.SIGPER);
    var SIGSEQ = feature.properties.SIGSEQ;
    var CATLIT = feature.properties.CATLIT;
    var HEIGHT = feature.properties.HEIGHT;
    var LITVIS = feature.properties.LITVIS;
    var ORIENT = feature.properties.ORIENT;
    var VALNMR = feature.properties.VALNMR;
    var beschr = feature.properties.llbesc;
    var gebied = feature.properties.llzone;
    //var events = feature.properties.events;
    var intnum = String(feature.properties.llintn);
    var natnumFull = chooseNatnumFormat(feature.properties.llnatn);
    var plaats = feature.properties.llplts;
    var landCode = chooseLandcode(gebied);
    var srtinf = feature.properties.srtinf;
    var vergeg = feature.properties.llverg;
    var objecttype = chooseObjecttype(feature.properties.lltobj);
    var objNaam = feature.properties.llobjn;
    var lumint = chooseLumintValue(feature.properties.lumint);
    var degE = parseInt(feature.geometry.coordinates[0]);
    var degN = parseInt(feature.geometry.coordinates[1]);

    //calculate decimal minutes N
    var minN = minFormat((((feature.geometry.coordinates[1] - degN) * 100) * (60 / 100)).toFixed(2));
    //calculate decimal minutes E
    var minE = minFormat((((feature.geometry.coordinates[0] - degE) * 100) * (60 / 100)).toFixed(2));




    //console.log(feature);

    var lichtsein = getLightsignal(lightsArray);

    /* parameter selections */

    if (HEIGHT === undefined) {
        HEIGHT = "";
    }


    if (LITVIS === undefined) {
        LITVIS = "";
    }


    if (ORIENT = "undefined") {
        ORIENT = "";
    }

    if (SIGSEQ = "UKNONWN") {
        SIGSEQ = "";
    }


    if (VALNMR === undefined) {
        VALNMR = "";
    }

    if (beschr === undefined) {
        beschr = "";
    }



    if (gebied === undefined) {
        gebied = "";
    }



    listNatn.push(natnumFull);


    if (plaats === undefined) {
        plaats = "";
    }


    if (vergeg == undefined) {
        vergeg = '';
    }


    if (objecttype == undefined) {
        objecttype = '';
    }

    if (objNaam == undefined) {
        objNaam = '';
    }


    /* tablefields */

    var tbl = zonelist.indexOf(gebied);

    /* make tablerow with feature data */

    var rowdata = "<tr class='item' ondblclick='gotoLight(this,lights)' value='" + natnumFull + "'>\n\
    <td class='td1 text-left text-break'>" + natnumFull +
        "<br><br>" + intnum + "</td><td class='td2'>" + objecttype + " " + objNaam +
        "<br>" + plaats +
        "<br>" + "<p class='p01'>" + landCode + "</p>" + "</td><td class='td3 text-right'>" +
        degN + "°" + minN + "'N" + "<br>" + '\n' + "00" + degE + "°" +
        minE + "'E</td><td class='td4 text-right'>" +
        lichtsein + "<br><i>" +
        lumint + "</i></br>" + "</td><td class='td5 text-center'>" +
        HEIGHT + "</td><td class='td6 text-center'>" +
        VALNMR + "</td><td class='td7'>" +
        beschr + "</td><td class='td8'>" +
        vergeg + "</td></tr>";

    var natnum_intnum;
    var intnum_natnum;
    rowdata = rowdata.replace("undefined", "");

    /* add to correct tbody-table */
    $(".tbody--" + tbl).append(rowdata);

    if (intnum !== 'undefined') {
        natnum_intnum = "<div class=''>" + natnumFull + "&nbsp&nbsp" + intnum + "</div>";
        $(".div--natnum-intnum-content").append(natnum_intnum);
    }


    if (intnum !== 'undefined') {
        intnum_natnum = "<div class=''>" + intnum + "&nbsp&nbsp" + natnumFull + "</div>";
        $(".div--intnum-natnum-content").append(intnum_natnum);
    }

    if (COLOUR === 'G.') {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: greenIcon, id: natnumFull }).addTo(mymap);
        marker._myId = natnumFull;
        marker.bindPopup(
            "<b>HPD Source Data</b>" + "<hr><b>CATLIT:</b>" + CATLIT +
            "<br><b>COLOUR:</b> " + COLOUR +
            "<br><b>HEIGHT:</b> " + HEIGHT +
            "<br><b>SIGGRP:</b> " + SIGGRP +
            "<br><b>LITCHR:</b> " + feature.properties.LITCHR +
            "<br><b>LITVIS:</b> " + LITVIS +
            "<br><b>ORIENT:</b> " + ORIENT +
            "<br><b>SECTR1:</b> " + SECTR1 +
            "<br><b>SECTR2:</b> " + SECTR2 +
            "<br><b>SIGPER:</b> " + SIGPER +
            "<br><b>SIGSEQ:</b> " + SIGSEQ +
            "<br><b>VALNMR:</b> " + VALNMR +
            "<br><b>llnatn:</b> " + natnumFull +
            "<br><b>llintn:</b> " + intnum +
            "<br><b>llbesc:</b> " + beschr +
            "<br><b>llobjn:</b> " + objNaam +
            "<br><b>lltobj:</b> " + objecttype +
            "<br><b>srtinf:</b> " + srtinf +
            "<br><b>llverg:</b> " + vergeg +
            "<br><b>llzone:</b> " + gebied);
    }
    if (COLOUR === 'R.') {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: redIcon, id: natnumFull }).addTo(mymap);
        marker._myId = natnumFull;
        marker.bindPopup("<b align='right'>HPD Source Data</b>" +
            "<hr><b>CATLIT: </b>" + CATLIT +
            "<br><b>COLOUR: </b> " + COLOUR +
            "<br><b>HEIGHT: </b> " + HEIGHT +
            "<br><b>SIGGRP: </b> " + SIGGRP +
            "<br><b>LITCHR: </b> " + feature.properties.LITCHR +
            "<br><b>LITVIS: </b> " + LITVIS +
            "<br><b>ORIENT: </b> " + ORIENT +
            "<br><b>SECTR1: </b> " + SECTR1 +
            "<br><b>SECTR2: </b> " + SECTR2 +
            "<br><b>SIGPER: </b> " + SIGPER +
            "<br><b>SIGSEQ: </b> " + SIGSEQ +
            "<br><b>VALNMR: </b> " + VALNMR +
            "<br><b>llnatn: </b> " + natnumFull +
            "<br><b>llintn: </b> " + intnum +
            "<br><b>llbesc: </b> " + beschr +
            "<br><b>llobjn: </b> " + objNaam +
            "<br><b>lltobj: </b> " + objecttype +
            "<br><b>srtinf: </b> " + srtinf +
            "<br><b>llverg: </b> " + vergeg +
            "<br><b>llzone: </b> " + gebied);
    }

    if (COLOUR === 'Y.') {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: yellowIcon, id: natnumFull }).addTo(mymap);
        marker._myId = natnumFull;
        marker.bindPopup("<b>HPD Source Data</b>" +
            "<hr><b>CATLIT: </b>" + CATLIT +
            "<br><b>COLOUR: </b> " + COLOUR +
            "<br><b>HEIGHT: </b> " + HEIGHT +
            "<br><b>SIGGRP: </b> " + SIGGRP +
            "<br><b>LITCHR: </b> " + feature.properties.LITCHR +
            "<br><b>LITVIS: </b> " + LITVIS +
            "<br><b>ORIENT: </b> " + ORIENT +
            "<br><b>SECTR1: </b> " + SECTR1 +
            "<br><b>SECTR2: </b> " + SECTR2 +
            "<br><b>SIGPER: </b> " + SIGPER +
            "<br><b>SIGSEQ: </b> " + SIGSEQ +
            "<br><b>VALNMR: </b> " + VALNMR +
            "<br><b>llnatn: </b> " + natnumFull +
            "<br><b>llintn: </b> " + intnum +
            "<br><b>llbesc: </b> " + beschr +
            "<br><b>llobjn: </b> " + objNaam +
            "<br><b>lltobj: </b> " + objecttype +
            "<br><b>srtinf: </b> " + srtinf +
            "<br><b>llverg: </b> " + vergeg +
            "<br><b>llzone: </b> " + gebied);
    }
    if (COLOUR === 'W.') {
        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: whiteIcon, id: natnumFull }).addTo(mymap);
        marker._myId = natnumFull;
        marker.bindPopup("<b>HPD Source Data</b>" +
            "<hr><b>CATLIT: </b>" + CATLIT +
            "<br><b>COLOUR: </b> " + COLOUR +
            "<br><b>HEIGHT: </b> " + HEIGHT +
            "<br><b>SIGGRP: </b> " + SIGGRP +
            "<br><b>LITCHR: </b> " + feature.properties.LITCHR +
            "<br><b>LITVIS: </b> " + LITVIS +
            "<br><b>ORIENT: </b> " + ORIENT +
            "<br><b>SECTR1: </b> " + SECTR1 +
            "<br><b>SECTR2: </b> " + SECTR2 +
            "<br><b>SIGPER: </b> " + SIGPER +
            "<br><b>SIGSEQ: </b> " + SIGSEQ +
            "<br><b>VALNMR: </b> " + VALNMR +
            "<br><b>llnatn: </b> " + natnumFull +
            "<br><b>llintn: </b> " + intnum +
            "<br><b>llbesc: </b> " + beschr +
            "<br><b>llobjn: </b> " + objNaam +
            "<br><b>lltobj: </b> " + objecttype +
            "<br><b>srtinf: </b> " + srtinf +
            "<br><b>llverg: </b> " + vergeg +
            "<br><b>llzone: </b> " + gebied);
    }

}



function gotoLight(element, lights) {
    //console.log(lights);
    var getnum = chooseNatnumFormat(parseFloat($(element).closest('tr').attr('value')));
    //  console.log(getnum);
    var index = jQuery.inArray(getnum, listNatn);
    // console.log(index);
    var latlng = [];
    latlng.push(lights.features[index].geometry.coordinates[1])
    latlng.push(lights.features[index].geometry.coordinates[0]);
    // console.log(latlng);
    mymap.setView(latlng, zoom = 15);
}



function filterTable() {
    // Declare variables 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("llTable");
    tr = table.getElementsByTagName("tr");
    var kol = document.getElementById("input-selectcol").selectedIndex - 1;


    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[kol];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function clearFilter() {
    document.getElementById("inputSearch").value = "";
    document.getElementById("input-selectcol").selectedIndex = 1;
    document.getElementById("input-selectcol").selectedIndex = 0;
    table = document.getElementById("llTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
    }
}



/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function mapLights(lights) {
    for (let i = 0; i < lights.features.length; i++) {
        var marker = L.marker([lights.features[i].geometry.coordinates[0],
            lights.features[i].geometry.coordinates[1]
        ]).addTo(mymap);

    }
}

mymap.on('popupopen', function(e) {
    //alert(e.popup._source._myId);
    var id = e.popup._source._myId;
    var elementPos = $("[value=" + CSS.escape(id) + "]").position();
    //console.log(elementPos);
    $(document).scrollTop(elementPos.top - window.innerHeight / 2);
});

function makeIndex() {
    var el = document.getElementsByClassName('div--voorwoord');
    console.log($(el).position());
}