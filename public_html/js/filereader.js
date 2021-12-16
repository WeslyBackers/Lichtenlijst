/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//open JSON file
var openFileJSON = function(event) {
    lights = [];
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        var bestanden = input.files;

        //console.log(bestanden);
        var fileModified = bestanden[0].lastModifiedDate;
        var fileName = bestanden[0].name;
        var fileSize = bestanden[0].size;

        lights = JSON.parse(text);
        //console.log(lights);

        $(".tbody").remove();
        $(".table caption").remove();
        sortFeaturesJSON(lights);

        /** CHECKEN VOOR COMBINATIELICHTEN */
        checkSectorlights(lights);


        /** Zones bepalen uit de lijst uit llzone */
        lights.features.forEach(getZonesJSON);
        zonelist.sort();
        addZones(zonelist);

        //lights = newlights;

        //console.log(lightsC);

        /** Toevoegen van lichten in de html in correcte tabel */
        lightsC.forEach(addLightsJSON);
        var datenow = new Date();
        /** display van informatie van ingelezen data */
        $(".choosefileJSON").toggle();
        $(".div--fileInfo").empty();
        $(".div--fileInfo").append("<p id='p--fileInfo' class='p--fileInfo'><b>Bestandsgegevens</b></p>Bestandsnaam: " +
            fileName + "<br>Laatst aangepast: " + fileModified + "<br>Bestandsgrootte: " +
            fileSize + " Bytes<br>Lichtobjecten: " + lights.length);
        $(".div--infodate").empty();
        $(".div--infodate").append("<h3 class='ml-2 warning'>Bijgewerkt tot " + fileModified.getDate() + "." + (fileModified.getMonth() + 1) + "." + fileModified.getFullYear() + "</h3><h3 class='ml-2 warning'>Opgemaakt op " + datenow.getDate() + "." + (datenow.getMonth() + 1) + "." + datenow.getFullYear() + "</h3>");
        $(".div--llinfodate").empty();
        $(".div--llinfodate").append("<p3 class='ml-2 warning'>Bijgewerkt tot " + fileModified.getDate() + "." + (fileModified.getMonth() + 1) + "." + fileModified.getFullYear() + " en opgemaakt op " + datenow.getDate() + "." + (datenow.getMonth() + 1) + "." + datenow.getFullYear() + "</p><hr>");

    };

    reader.readAsText(input.files[0]);
};

//open GML file and convert to GEOJSON
var openFileGML = function(event) {
    lights = {
        "type": "FeatureCollection",
        "features": []
    };
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {
        var text = reader.result;
        parser = new DOMParser();
        gmlColl = parser.parseFromString(text, "text/xml");
        var elements = gmlColl.getElementsByTagName("LIGHTS");

        //convert to GEOJSON format
        //console.log(elements);
        for (let item of elements) {
            var lightObj = new Object({
                "type": "Feature",
                "properties": {},
                "geometry": { "type": "Point", "coordinates": [] }
            });


            for (x = 0; x < item.children.length; x++) {
                var item_name = item.children[x].localName;
                //console.log(item_name)
                var value = item.children[x].textContent;
                //console.log(value)
                if (item_name == "GEOM") {
                    //remove spaces from string
                    value = value.trim();
                    //split to separate E en N coordinates
                    var coordinates = value.split(",");
                    var eastingX = parseFloat(coordinates[0]);
                    var northingY = parseFloat(coordinates[1]);
                    //add coordinates
                    lightObj.geometry.coordinates.push(eastingX);
                    lightObj.geometry.coordinates.push(northingY);
                } else {
                    //add propertie
                    lightObj.properties[item_name] = value;
                }
            };
            lights.features.push(lightObj);
        }

        var bestanden = input.files;

        var fileModified = bestanden[0].lastModifiedDate;
        var fileName = bestanden[0].name;
        var fileSize = bestanden[0].size;
        $("tbody").remove();

        $(".table caption").remove();
        sortFeaturesJSON(lights);
        /** CHECKEN VOOR COMBINATIELICHTEN */
        checkSectorlights(lights);

        lights.features.forEach(getZonesJSON)
        zonelist.sort();
        addZones(zonelist);
        console.log(lights);

        lights.features.forEach(addLightsJSON);
        $(".choosefileGML").toggle();
        $(".div--fileInfo").empty();
        $(".div--fileInfo").append("<p id='p--fileInfo' class='p--fileInfo'><b>Bestandsgegevens</b></p>Bestandsnaam: " + fileName + "<br>Laatst aangepast: " + fileModified + "<br>Bestandsgrootte: " + fileSize + " Bytes<br>Lichtobjecten: " + lights.features.length);
        $(".navbar-logo").hide();
        $(".div--infodate").empty();
        $(".div--infodate").append("<p class='ml-2'> (Bijgewerkt tot: " + fileModified.getDate() + "/" + (fileModified.getMonth() + 1) + "/" + fileModified.getFullYear() + ")</p>");
    };
    reader.readAsText(input.files[0]);

};