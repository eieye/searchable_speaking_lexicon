// CUSTOM INPUT AND SEARCH INTERFACE // WED 01-FEB-23
// INTEGRATED WITH "TESTUNITS" DISPLAY
// THU 08-FEB-23 // (RENAMED) 
		// "FORMAT_RESULTS" CALLED FROM "STRING_QUERIES" AND "SELECTION_QUERIES"	
// SUN 12-MAR-23
		// #TBC# GENERATE LINK FOR ALL ITEMS IN LISTINGS TO LEX=INFO IN NEW POP-UP
		// NEW STYLE (NO UNDERLINE) FOR LINKS
		// #TBD# CLICK=AUDIO ONLY/OPTION-CLICK=STECKBRIEF 
// MON 13-MAR-23
		// IMPLEMENTED AUDIO-LINK GENERATION (INNER_HTML)
		// CONVERT UMLAUTE TO "XE" GER-B TO "&SZLIG;" FOR URL
// TUE 16-MAY-23
// FILE RENAMED "QUERY_FORMATTER" (WAS "QUERY_INTERFACE")
// FIXED REPLACEMENT GER ENTITIES (ÄÖÜß)
// MON 22-MAY-23
					// ##TBD## SPLIT AUDIOLINKS FOR PARTICLES AND PAYLOAD







console.log("#QUERY_FORMATTER# WED 31-MAY-23\n\n");

console.log(
`    __________________________________________________________
   |                           MEMO                           |
   |        HARDCODED XSAMPA #MUST# BE ADDED IN SOURCE        |
   |    ARBITRARY VALUE OF AMBIGUOUS LTRS IS UN-ALGORITHMIC   |
   |__________________________________________________________|

`);







// VARIABLE SPACERS VIEW FORMATTING
const ZERO = "0";
const SPACE = "x";
const TAB = "......";


																					// UI FIELDS
// ———————————————————————————————————————————————————————————————————————————————–––––––––––––––
// CONNECT DOM ELEMENTS
// LOAD (BUTTON) // INPUT TYPE=FILE
	const input = document.getElementById('btnload');
	input.style.opacity = 0;
	input.addEventListener('change', updateLoadStatus);															// ALSO HAS INLINE ONCHANGE "LOADFILE"
			// SELECT
			//const pulldown = document.getElementById('pulldown');											// HAS INLINE ONCHANGE "OPTSELECTION" AND "QCOPY"
			//const pulldowntwo = document.getElementById('pulldowntwo');
			// INPUT TYPE=TEXT
			//const txtinput = document.getElementById('txtinput');											// HAS INLINE ONCHANGE "TXTSEARCH" AND "QCOPY"
// SAVE (BUTTON)
	const savetofile = document.getElementById('savetofile');
// TEXT FIELDS
	const filestatus = document.getElementById('filestatus');
	const filesize = document.getElementById('filesize');
	const querystatus = document.getElementById('querystatus'); // HTML LINE #150#	// ALSO USED BY SCRIPT "SAVEOUT"
	const resnumui = document.getElementById('resnum');																// ALSO USED BY SCRIPT "SAVEOUT"
	const comment = document.getElementById('comment');
	const resultstxt = document.getElementById('resultstxt'); 											// DIV-ID // CONTAINS RESULTS-LIST


																			// CUSTOM INPUT TYPE=FILE

function updateLoadStatus() { 																									// LINE #46# // PARTS DUPLICATED IN "SEARCH_HELP" (IMPORT)
	const curFiles = input.files;

	if (curFiles.length === 0) {
		let status = "(No files opened)";
		filestatus.replaceChildren('');
		filestatus.append(status);
	} else {
		for (const file of curFiles) {
			if (validFileType(file)) {
				filestatus.replaceChildren('');
				filestatus.append(`${file.name}`);
				filesize.replaceChildren('');
				filesize.append(`Loaded ${returnFileSize(file.size)}`);
						// (ALSO OVERWRITE "NO FILE WAS SEARCHED")
						resnumui.replaceChildren('');
						resnumui.append(`(no entries)`);      																// #TBD# // ADD ALSO IN SAVE-OUT FILENAME
			} else {
				filestatus.replaceChildren('');
				filestatus.append(`(${file.name} is not a valid file type)`);         
			}
		}
	}
} // LOAD_STATUS

																		// ALLOWED FILE-TYPES
const fileTypes = [
	'text/plain',
	'text/csv'
];


function validFileType(file) {
	return fileTypes.includes(file.type);
}


function returnFileSize(number) {
	if (number < 1024) {
		return number + 'bytes';
	} else if (number > 1024 && number < 1048576) {
		return (number/1024).toFixed(1) + 'KB';
	} else if (number > 1048576) {
		return (number/1048576).toFixed(1) + 'MB';
	}
}

														// GET QUERY STRING (SELECTION OR INPUT)
function qcopy(qstring) {
	console.log("QUERY", qstring);
	querystatus.replaceChildren('');
	querystatus.append(`Results for ${qtype}query ${searchaffix} "${qstring}":`);
} // QCOPY

																	// INIT SEARCH STATUS FIELDS
// RESULTS
	resultstxt.replaceChildren('');
	resultstxt.append(`(nothing yet)`);

// FILE
	filestatus.replaceChildren('');
	filestatus.append(`(no file opened)`);
// FILESIZE
	filesize.replaceChildren('');
	filesize.append(`(file size)`);
// QUERY STRING
	querystatus.replaceChildren('');
	querystatus.append(`(no filter or search entered)`);
// RESULTS COUNT
	resnumui.replaceChildren('');
	resnumui.append(`(no entries)`);








																		// PARSE RESULTS TO VIEW
// ———————————————————————————————————————————————————————————————————————————————–––––––––––––––
function displayResults(resarr, rescount, msg, SPACER) {

// STATUS UPDATES
	if (loaded) {
		if (rescount > 0) {
			resnumui.replaceChildren('');
			if (rescount === 1) {
				resnumui.append(`${rescount} entry`);
			} else {
				resnumui.append(`${rescount} entries`);
			}
		} else {
			resnumui.replaceChildren('');
			resnumui.append(`no entries`);
			resultstxt.replaceChildren(''); // (RE)SET LIST
			msg = ""; // (RE)SET MSG // REF #165#
		}
	} else {
		resnumui.replaceChildren('');
		resnumui.append(`(no file has been searched)`);
		resultstxt.replaceChildren(''); // (RE)SET LIST
		msg = "";
		rescount = 0;
	}
// DISPLAY COMMENT
	comment.replaceChildren('');
	//comment.append(msg); // #TBD#


// SEE REF #165# // RESET FOR ZERO RESULTS
// (UNITTEST)
	console.log("DISPLAY", msg);
	comment.innerHTML = msg;


																				// ASSEMBLE LIST
	resultstxt.replaceChildren(''); 																									// STAYS EMPTY IF NO NEW RESULTS

// (UNITTEST) PASSING RESULTSARR
//console.log(typeof resarr, "ARRAY", Array.isArray(resarr));
// (UNITTEST)
// for (const item of resarr) {
// 	console.log("FLEXED_RES\n", item);
// 	console.log("PARTICLE", item.particle, "\nLINK", item.particlelink,
// 					"\nPAYLOAD", item.word, "\nLINK", item.wordlink, "\n\n");
// }

	for (const result of resarr) {
		resultstxt.append(assembleLine(result, SPACER)); // RETURNS "LINE" (INNER_HTML)
	}

} // END FORMAT










																// ASSEMBLE AND LINK RESULT-LINE
// ———————————————————————————————————————————————————————————————————————————————–––––––––––––––
function assembleLine(result, SPACER) {
		//console.log(result);
		//console.log(SPACER); 																											// (0, 1, 2 COLUMS)

	let resultline = ""; 																													// CONCAT ROW WITH TABS

// (UNITTEST) FORMATTING ARGS
// 	console.log("PARTICLE", row.particle, "\nLINK", row.particlelink,
// 					"\nPAYLOAD", row.word, "\nLINK", row.wordlink, "\n\n");

	const LINE = document.createElement('p');
																// SEQUENTIALLY ADD REQUIRED COLUMNS

// IN "RANK" ADD NUM-COLUMN
	if(result.rank) {
								// ======================= #TBD# EMPTY EVENT ==================== 
																// "a" IS ONLY FOR "HOVER"-EFFECT
																// (BUT GETS UNINTENDED EMPTY EVENT-HANDLER
																// AS E.G. IN PHONETIC QUERY "BE-")
		let l0 = document.createElement('a');
		l0.innerHTML = result.unpad(result.rank);
																				// EMBED AUDIO
																		 // "LEXKEY" MAY BE UNDEFINED 
														 // (AS IS E.G. IN PHONETIC QUERY "SCHWA")
		embedAudioLink(l0, result.ranklink, result.LEXKEY);
		LINE.append(l0);
		LINE.append(SPACER[1]);
	}


// FORMATS 2-COLUMN SEPARATE PRTCL AND PAYLD
	let l1 = document.createElement('a');																					// "a" IS ONLY FOR "HOVER"-EFFECT
	l1.innerHTML = result.particle;
																				// EMBED AUDIO
	embedAudioLink(l1, result.particlelink, result.LEXKEY);
	LINE.append(l1);

								// ======================= WEIRD #TBD# SPACER ==================== 
// FOR TWO-COLUM LIST ADD TAB BETWEEN PRTCL AND PAYLD
	if(!result.extra) {
		LINE.append(SPACER[1]);																											// (IN CSS) "WHITESPACE=PRE" TAB=16 SPACES
	} else {
		LINE.append(SPACER[0]);
	}


	let l2 = document.createElement('a');
	l2.innerHTML = result.word;
																				// EMBED AUDIO
					embedAudioLink(l2, result.wordlink, result.LEXKEY);
	LINE.append(l2);


// FOR THREE-COLUMN LIST ADD COLUMN
	if(result.extra) {
		LINE.append(SPACER[1]);
		let l3 = document.createElement('span');
		l3.innerHTML = result.extra;
		LINE.append(l3);
	}

	return LINE;

} // ASSEMBLE_LINE







																			// LINK AUDIO (PARTS)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
function embedAudioLink(link, src, lexkey) {

	link.addEventListener("click", (e) => {
		playAudio(src);
						// ##TBD## FUNCTION "PLAY_AUDIO" WILL NEED SOME SETTINGS (SPEED/VOICE)
		if (e.altKey) {
			//console.log("IT SEEMS ALT_KEY WAS DEARLY PRESSED");
			//alert("ALT_KEY WAS PRESSED");
			popupInfoObject(lexkey);
		}
	}); // EVENT

}




