var url = "http://testlichtenlijst.api.afdelingkust.be/api/lights";

var datatopost =
   {
     "type": "string",
     "properties": {
       "colour": "string",
       "height": "string",
       "litchr": "string",
       "events": "string",
       "extlnk": "string",
       "llbesc": "string",
       "llintn": "test100",
       "llnatn": "test101",
       "llplts": "string",
       "lltobj": "string",
       "llzone": "string",
       "srtinf": "string",
       "llobjn": "string",
       "catlit": "string",
       "inform": "string",
       "nobjnm": "string",
       "objnam": "string",
       "sectR1": "string",
       "sectR2": "string",
       "siggrp": "string",
       "sigper": "string",
       "valnmr": "string",
       "llgebd": "string",
       "lumint": "string",
       "status": "string",
       "heisur": "string",
       "litvis": "string",
       "mltylt": "string",
       "orient": "string",
       "exclit": "string",
       "sigseq": "string",
       "ntxtds": "string",
       "txtdsc": "string",
       "verdat": "string"
     },
     "geometry": {
       "type": "string",
       "coordinates": [
         0
       ]
     }
   };

$.post(url,function(datatopost){

});

$.get( url, function( data ) {
   $( ".result" ).html( data );
   //alert( "Load was performed." );
   console.log(data);
 });