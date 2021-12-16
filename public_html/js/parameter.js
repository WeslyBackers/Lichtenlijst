//choose Landcode
function chooseLandcode(gebied) {

  landCode = "";
  if (gebied.includes("FRANKRIJK")){   
      landCode = "(F)";
  }
  if (gebied.includes("NEDERLAND")){   
      landCode = "(N)";
  }
    return landCode;

}


//Signal Period
function chooseSigper(sigper) {

    if (sigper > 0) {
        sigper = sigper + 's';
    } else {
        sigper = '';
    }
    return sigper;
}


//National number format
function chooseNatnumFormat(natnum) {

    natnum = parseFloat(natnum);
    if (natnum < 10) {
        natnum = "000" + natnum;
    } else if (natnum < 100 && natnum > 9) {
        natnum = "00" + natnum;
    } else if (natnum < 1000 && natnum > 99) {
        natnum = "0" + natnum;
    }
    return natnum;

}

//kleur licht bepalen
function chooseColour(kleur) {

    switch (kleur) {

        case '1':
            colorch = 'W.';
            break;
        case '2':
            colorch = '';
            break;
        case '3':
            colorch = 'R.';
            break;
        case '4':
            colorch = 'G.';
            break;
        case '5':
            colorch = 'Bu.';
            break;
        case '6':
            colorch = 'Y.';
            break;
        case '7':
            colorch = '';
            break;
        case '8':
            colorch = '';
            break;
        case '9':
            colorch = 'Y. Am.';
            break;
        case '10':
            colorch = 'Vi.';
            break;
        case '11':
            colorch = 'Y. Or.';
            break;
        case '12':
            colorch = '';
            break;
            
        default:
            colorch = '';
            break;
    }
    return colorch;
}

//lichtkarakter bepalen
function chooseLightchr(LITCHR,SIGGRP) {

    switch (LITCHR) {

        case '1':
            lightchr = 'F';
            break;
        case '2':
            lightchr = 'Fl';
            break;
        case '3':
            lightchr = 'LFl';
            break;
        case '4':
            lightchr = 'Q';
            break;
        case '5':
            lightchr = 'VQ';
            break;
        case '6':
            lightchr = 'UQ';
            break;
        case '7':
            lightchr = 'Iso';
            break;
        case '8':
            lightchr = 'Oc';
            break;
        case '9':
            lightchr = 'IQ';
            break;
        case '10':
            lightchr = 'IVQ';
            break;
        case '11':
            lightchr = 'IUQ';
            break;
        case '12':
            lightchr = 'Mo';
            break;
        case '13':
            lightchr = 'FFl';
            break;
        case '14':
            lightchr = 'Fl+LFl';
            break;
        case '15':
            lightchr = 'AlOc Fl';
            break;
         case '16':
            lightchr = 'FLFl';
            break;
        case '17':
            lightchr = 'AlOc';
            break; 
        case '18':
            lightchr = 'AlLFl';
            break;
        case '19':
            lightchr = 'AlFl';
            break; 
        case '20':
            lightchr = 'Al';
            break;
        case '21':
            lightchr = '';
            break;
        case '22':
            lightchr = '';
            break;
        case '23':
            lightchr = '';
            break;
        case '24':
            lightchr = '';
            break;  
        case '25':
            lightchr = 'Q+LFl';
            break;
        case '26':
            lightchr = 'VQ+LFl';
            break;
        case '27':
            lightchr = 'UQ+LFl';
            break;
        case '28':
            lightchr = 'Al';
            break;
        case '29':
            lightchr = 'AlF Fl';
            break;
        default:
            lightchr = '';
            break;
    }
    
    if (SIGGRP === "(1)" || SIGGRP === undefined || SIGGRP === "UNKNOWN"){
        
        lightchr = lightchr+".";
    }
    else {
        
        lightchr = litchrDivide(lightchr, SIGGRP); 
        
        //lightchr = lightchr+SIGGRP+".";
    }
    
    return lightchr;
}


//checken of litchr meerdere lichtkarakters heeft (door middel van '+')

function litchrDivide(lightchr, SIGGRP){
    
    arrayLitchr = lightchr.split("+");
    newlightchr = "";
    if (arrayLitchr.length > 1){    
        arraySiggrp = SIGGRP.split(")(");
        for (let x = 0; x < arrayLitchr.length; x++){
            if (x === 0){
                newlightchr = newlightchr + arrayLitchr[x] + arraySiggrp[x] + ")"; 
            }
            else{
                newlightchr = newlightchr +"+" + arrayLitchr[x] + "(" + arraySiggrp[x];
            }
        }
         newlightchr = newlightchr + ".";
    }
    else{
        newlightchr = lightchr + SIGGRP+".";
    }
    
   
    return newlightchr;
    
}

//type object bepalen
function chooseObjecttype(object) {

    switch (object) {

        case '1':
            object = 'Boei';
            break;
        case '2':
            object = 'Baken';
            break;
        case '3':
            object = 'Lichtschip';
            break;
        case '4':
            object = 'Meetpaal';
            break;
        case '5':
            object = 'Geleidelicht';
            break;
        case '6':
            object = 'Hoog licht';
            break;
        case '7':
            object = 'Laag Licht';
            break;
        case '8':
            object = 'Gericht Licht';
            break;
        case '9':
            object = 'Sectorlicht';
            break;
        case '10':
            object = 'Mast';
            break;
        case '11':
            object = '';
            break;
        case '12':
            object = 'Paal';
            break;
        case '13':
            object = 'Windturbine';
            break;
        default:
            object = '';
            break;
    }
    return object;
}

function chooseLumintValue(lumint) {

    if (lumint > 0){
    lumint = lumint;
    }
    else {
        lumint = '';
    }

    return lumint;
}

//bepalen van het formaat voor coordinaat minuut-weergave
function minFormat(minutes) {

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes;
}



