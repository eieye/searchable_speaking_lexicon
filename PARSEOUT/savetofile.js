/* (04-FEB-21) SAT 09-APR-22 */
// 30-JAN-23 // ADAPTED FOR LEXICON QUERY RESULTS SAVE-OUT
// 03-FEB-23 // REMOVED SPACE(S) IN "FILENAME.TXT"
// 12-MAR-23 // FOR *STRING*-QUERIES ADD "(string)" TO FILENAME






console.log("#SAVEOUT# TUE 16-MAY-23\n\n");








let exportfilename = "";

																			// WRITE TIMESTAMP
			// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// OPTIONAL ONLY
/*
function writeTimestamp() {
	let dat = new Date(); // RAW GMT+0200
	let options = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	let timestamp = new Intl.DateTimeFormat('de-DE', options).format(dat).toUpperCase();
	let re = /\.|,/g;
	timestamp = timestamp.replace(re, '');
	re = /:/g;
	timestamp = timestamp.replace(re, '-');
// REPLACE SELECTED SPACES
	let temp = timestamp.split(' ');
	let numday = temp[1].length < 2 ? "0" + temp[1] : temp[1]; // PADD DAY WHEN SINGLE DIGIT
	return timestamp = `${temp[0]}_${numday}${temp[2]}${temp[3]}_${temp[4]}`;
}
*/


																			// ASSEMBLE HTML PARTS
			// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// HTML FORMATTING ONLY
/*
let bodyprefix = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>"${exportfilename}"</title>

<style>
* {
  box-sizing: border-box;
  padding: 0;
	margin: 0;
}
body {
	background: rgba(240 240 240 / 0);
	color: gray;
	font: 1em / 1.5 'Menlo', system-ui, Arial, sans-serif;
	font-weight: 400;
	letter-spacing: 0.5px;
}
</style>

</head>
<body>`;

let bodypostfix = `</body>
</html>`;
*/


																				// IIFE EXPORT CONTENT
			// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
(function () {

var textFile = null,
  makeTextFile = function (text) {
		var data = new Blob([text], {type: 'text/plain'});
    		// SRC: "IF WE ARE REPLACING A PREVIOUSLY GENERATED FILE WE NEED TO
    		// MANUALLY REVOKE THE OBJECT URL TO AVOID MEMORY LEAKS"	
    if (textFile !== null) {
			window.URL.revokeObjectURL(textFile);
    }
			textFile = window.URL.createObjectURL(data);
    	return textFile;
		};

// LISTENER
		document.getElementById('savetofile').addEventListener('click', (e) => {
    	var link = document.createElement('a');
// COMPILE FILENAME
    	//link.setAttribute('download', `'${querystatus.innerText}'_${writeTimestamp()}.html`);
    	exportfilename = querystatus.innerText.replaceAll(' ', '_');
			exportfilename = exportfilename.replaceAll(':', ''); 														// REMOVE ":" (COLON) IN STRING "SELECTION STATUS"
			exportfilename = exportfilename.replaceAll('"', '');
			exportfilename.concat(`(${resnum})`);
			// ###   ###   ###   ###   ###   ###   ###   ###   ###   ###   ###   ###   ###   ###   ###
																		console.log(resnum);
    																console.log(exportfilename);

			link.setAttribute('download', `${exportfilename}.txt`);

																		// EXPORT RESULTS-LIST
			let body = "";
			if (loaded) {
				body = resultstxt.innerText;
			} else {
				body = `(no file has been searched)`;
			}
			//console.log(body);

// CONCATENATE FROM PART(S)
  	  //link.href = makeTextFile(bodyprefix + body + bodypostfix);
  	  link.href = makeTextFile(body);
  	  document.body.appendChild(link);

// SRC: "WAIT FOR THE LINK TO BE ADDED TO THE DOCUMENT"
   	 window.requestAnimationFrame(function () {
     	 var event = new MouseEvent('click');
     	 link.dispatchEvent(event);
     	 document.body.removeChild(link);
			});

  }, false); // EVENT

})(); // IFFY


