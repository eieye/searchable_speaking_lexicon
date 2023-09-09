// READ OBJECT POROERTIES FOR "INFO" POP-UP
// 20-MAY-23
// 26-MAY-23
		// FIRST DEMO (ALERT POP-UP)
// 30-MAY-23
		// LINKING POP-UP FOR LEXEME-INFO





console.log("#POPUP_OBJECTINFO# WED 31-MAY-23\n\n");









// VARS "HELP"-OVERLAY
	const cl = document.getElementById('overlay').classList;
	const closeel = document.getElementById('btnclosehelp');
	closeel.addEventListener('mouseup', closeHelp); 														// ### FUNCTION CALL "CLOSE HELP" ###
	let lbl = "";  // ###DEFAULT### 

// BTN IN HELP-BOX
	function closeHelp(lbl) {
		closeel.innerHTML = lbl;
		cl.add('hide');
		console.log(`clicked CLOSE help`);
		 							// ####### TEMP ######## // REMOVE FUNCTION ARG
		//console.log("(LABEL)", lbl); //  IS MOUSEUP-EVENT
	}

// TEXT-LINKS IN UI
	function openHelp(lbl) {
														// ### TBD ### SET BTN LABEl ("OK" OR "CLOSE")
		closeel.innerHTML = lbl;
		cl.remove('hide');
		console.log(`clicked OPEN help`);
		console.log("(LABEL)", lbl); // IS STRING
	}






											// (ADDED PROPERTY "KEY" TO ACESS LEXICON-OBJECT ITSELF)
// --------------------------------------------------------------------------------------------
function popupInfoObject(key) {

	let prolog = `INFO FOR ENTRY "${key.toUpperCase()}"<br><br>`;
	let msg = "";
	let prop;
	let proparr = [];
	let lexentry;
	const INFOTAB = "-----"; // #TEMP# DIFF FROM CONST "TAB"


// EXCLUDE PARTICLES (MORE THAN ONE) OR MEHRWORT
	if (key.includes('/') || key.includes(' ')) {
		msg = ""; // (MSG MAY HAVE STRING FROM LAST ALERT)
		msg = "Try searching the words separately !";
	} else {
		lexentry = Lexicon.get(key);
	}

	Object.keys(lexentry).forEach(prop => {
		if (lexentry[prop]) { // NOT EMPTY

			if (prop === "LANG") {
				msg += pad(prop) + "<br>";
				let obj = lexentry[prop];
				Object.keys(obj).forEach(item => {
					//console.log("PROP", item);
					msg += INFOTAB + item + INFOTAB + obj[item].toString() + "<br>";
				});

			} else if (prop === "MINIFLEX") {
				msg += pad(prop) + "<br>";
				let obj = lexentry[prop];
				Object.keys(obj).forEach(item => {
					//console.log("PROP", item);
					msg += INFOTAB + item + INFOTAB + obj[item].toString() + "<br>";
				});

			} else if (prop === "PLUBILD") {
				msg += pad(prop) + "<br>";
				let obj = lexentry[prop];
				Object.keys(obj).forEach(item => {
					//console.log("PROP", item);
					msg += INFOTAB + item + INFOTAB + obj[item].toString() + "<br>";
				});

			} else {
				msg += pad(prop) + INFOTAB + lexentry[prop].toString() + "<br>";
			}
		}
	});


/*
													// FORMAT PROPERTIES SELECTED FOR DISPLAY
	let complex_props = [
		"LANG", 				// { de: "", en: "", fas: "", arb: "", ukr: ""}
		"MINIFLEX", 		// { particle: "", flexedform: "", parent: "" }
		"PLUBILD"				// { umlaut: "", postfix: "" }
	];

 let main_props = [
		"lex",
		"INTERPHON",
		"XSAMPA",
		"SYLLS"
	];
	
	let computed_props = [
		"speechpart",		// if (m, f, n) { = NOUN } ... VERB ADJ
		"gender",				// m="masculine"/der f="feminine"/die n="neutrum"/das
		ARTICLE
	];

	let optional_props = [
		"dictbb12",
		"dictbb34",
		"dictnrw",
		"didactic",

		"etymo",
		"flag",

		"hint",
		"morph",
		"parent"	
	];
*/

		msg = prolog + msg;
		//return msg;

		textcontainer.innerHTML = msg;
		openHelp("CLOSE"); // BTN LABEL

} // POPUP






																		// (UTILITY FORMAT WHITE-SPACE)
// --------------------------------------------------------------------------------------------
function pad(str) {
	let width = 14;
	while (width - str.length > 0) {
		str += " ";
	}
	str += "\t";
	return str;
}









