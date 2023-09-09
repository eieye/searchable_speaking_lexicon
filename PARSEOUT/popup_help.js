// 04-DEZ-21 (FRAGMENT) // SELECT-SWITCH WIDGET // "DARK MODE"
// MON 04-APR-22 (FRAGMENT) // "BEZIER DEMO // STEPPER OPTIONS APP"
// 28-JAN-23 (FRAGMENT) // TEMPLATE FOR HELP POP-UP
// 02-FEB-23
// ADAPTATION FOR QUERY-INTERFACE // LOAD HELP-TXT FROM SCRIPT
// 01-MAR-23
// REMOVED "DONT SHOW AGAIN" MECHANISM
// 12-MAR-23
// NEW HELP FOR "DISTRIBUTIONS" OPTION-GROUP
// SAT 13-MAY-23
// FETCH (HTTP-REQUEST) DATA-CSV TO BLOB
			// 16-MAR-23
			// ##TBD## POP-UP CAN PUSH "OK"-BUTTON OUT OF VIEW IN NARROW WIDTH
			// MAKE POP_UP BOX SCROLLABLE (OR SHOW OVERFLOW)
// SAT 20-MAY-23
			// PERMALINK NAME FOR IMPORT

// ________________________________________ #TBD# LEGAL ___________________________________________
// |                                                                                               |
//      For general info see repository "pattern-based instruction" at 
//      <a href="https://github.com/eieye" target="_blank">github.com/eieye</a>
//      Reference for Standard German Pronunciation and syllable hyphenation is
//      <a href="https://www.dwds.de/" target="_blank">DWDS</a> Many thanks for exc/obs-essive use!
//      The spoken items were custom generated on the aws cloud with text-to-speech service 
//      <a href="https://docs.aws.amazon.com/polly/index.html" target="_blank">"Polly"</a>.
//      The audio files are copyright free under any license.
// |                                                                                               |
// ————————————————————————————————————————————————————————————————————————————————————————————–––——





// TEMP
console.log("#SEARCH_HELP# TUE 30-MAY-23\n\n");




// PASS LINK-VAL

const syllablehelp = document.getElementById('syllablehelp');
syllablehelp.addEventListener('click', () => writeHelp('syllable'));

const distribhelp = document.getElementById('distribhelp');
distribhelp.addEventListener('click', () => writeHelp('distrib'));

const phonetichelp = document.getElementById('phonetichelp');
phonetichelp.addEventListener('click', () => writeHelp('select'));

const stringhelp = document.getElementById('stringhelp');
stringhelp.addEventListener('click', () => writeHelp('string'));				// TBD // REPLACE WITH INLINE EV-HANDLER

const infolink = document.getElementById("infolink");
infolink.addEventListener('click', () => writeHelp('info'));

const textcontainer = document.getElementById('textcontainer');



// GET NAME FOR INFO-BOX "SOURCES"
function getFilename() {
	return loaded ? fileimport : "not loaded";
}

// PERMALINK
let permalink = "FULL_INVENTORY_310523.csv";


					 													// WRITE TEXT TO HELP-POPUP


function writeHelp(arg) {

	if (arg === 'syllable') {
																				// SYLLABLE QUERIES
		let distribstr =
'<span class="headline">SYLLABLES AND MULTI-PART ITEMS</span><br>'
+ 'List lexicon entries by number of syllables.<br>'
+ 'Syllables are indicated by \"·\" (middot) delimiter. Syllabic (long) vowels are separated by \":\" (colon) but do not represent an orthographic hyphenation.<br>'
+ '';
 // ##TEMP##
		textcontainer.innerHTML = distribstr;
		openHelp("OK");

	} else if (arg === 'distrib') {
																		// HELP DISTRIBUTION QUERIES
		let distribstr =
'<span class="headline">DISTRIBUTIONS AND SCHEMAS</span><br>'
+ 'Filter the Lexicon by source dictionary. Explore distributions of some phonetic and semantic patterns.<br>&nbsp;<br>'
+ 'Find conforming/nonconforming examples for the basic intuition of vowel length following pattern "ak ka kak" '
+ '(short/long/short) in most syllables (and thus words)... Discover the distribution of female resp. male words ending on "-e" (schwa)...<br>&nbsp;<br>'
// + "('a' standing in for any single vowel or umlaut and 'k' (most distinctive and unmutable plosive) for any consonant.<br>&nbsp;<br>"
+ 'A selection of composite words and short phrases is also available.<br>'
+ 'In "show all entries" nouns will be listed with their article (gender).<br>'
+ '';
 // ##TEMP##
		textcontainer.innerHTML = distribstr;
		openHelp("OK");

	} else if (arg === 'select') {
																			// HELP PHONETIC QUERIES
		let selectstr =
'<span class="headline">PHONETIC FILTERS</span><br>'
+ 'Get exact matches for specific phonetic and orthographic features with exclusive searches (i.e. "ch" not in "sch" not in "tsch").<br>&nbsp,<br>'
+ 'Patterns like ch sch tsch and schwa/tiefschwa (-e -er) and orthographic markers ("ie", "-h-") '
+ 'are pre-configured for exclusive matching: Find "-e" (but not "-ee"), "ie" (but not "i&euml;"), "st-" (but not "-st") and more ...'
+ '';
 // ##TEMP##
		textcontainer.innerHTML = selectstr;
		openHelp("OK");

	} else if (arg === 'string') {
																			// HELP STRING QUERIES
		let stringstr = 
// SIMPLE STRINGS
'<span class="headline">SEARCHING FOR PATTERNS</span><br>'
+ 'Explore phonetic/orthografic features or search for rhymes or "Minimalpaare" with simple or positional searches.<br>&nbsp;<br>'
+ 'Enter any single letter (e.g. ß ä ö ü), "mehr&shy;teilige Basis&shy;grapheme" (au ch ck ei ie ng qu sch ...), '
+ 'double vowels or consonants (aa ee ff pp ...) or orthographic markers (ah ts tz ph ...).&nbsp;'
+ 'Search for odd clusters (e.g. "mpfst") or specific words (e.g. "Beispiel").<br>&nbsp;<br>'
		// POSITIONAL
		// MEMO // "-ern" "-er" "-e" ARE EXCLUSIVE PER SE
+ 'For a positional search add a hyphen <i>after</i> the string to find words "starting with ..." (e.g. sch- sp- st-),&nbsp;'
+ 'add a hyphen <i>before</i> the string to find words "ending with ..." (e.g. -ig -em -tte).<br>'
+ 'This is useful for finding "Auslautverhärtung" (-b -d -g -s), affixes (e.g. be- ge- ver- -lich -ung), morphemes (e.g. -en -st) and some more (-and).<br>&nbsp;<br>'
+ 'The search is case in(!)sensitive.';

// ##TEMP##
		textcontainer.innerHTML = stringstr;
		openHelp("OK");

	} else if (arg === 'info') {
																						// SOURCES
	// https://www.schulentwicklung.nrw.de/cms/grundwortschatz-nrw/grundwortschatz/wortfilter/index.html
	// https://bildungsserver.berlin-brandenburg.de/deutsch-grundschule

		let infostr =
'<span class="headline">ABOUT THE LEXICON</span><br>'
+ 'The current Lexicon (' + getFilename() + ') is based on two sources: "<a href="https://www.schulentwicklung.nrw.de/cms/grundwortschatz-nrw/grundwortschatz/wortfilter/index.html" target="_blank">Schulentwicklung NRW Grundwortschatz</a>" (533 entries) '
+ 'and "<a href="https://bildungsserver.berlin-brandenburg.de/deutsch-grundschule" target="_blank">Grundwortschatz Berlin-Brandenburg Klasse 1-2 und 3-4</a>" (about 700 entries), with some overlap.<br>&nbsp;<br>'
+ 'It has been expanded by another 1000 entries specifically for German as a Second Language (DaZ), focusing on foundational schema-representative words (establishing vowel quality/length and \"Lautprinzip\") and derivatives (illustrating morphologic\/orthographic constancy or \"Stammprinzip\").<br>&nbsp;<br>'
+ 'As a guide, syllables that deviate from regular basic phonetic transcription are indicated by <i>kursive type</i>.<br>'
+ 'In the current distribution these constitute barely 10% of the inventory.';

		// ##TEMP## REPLACE "INNER_HTML" WITH PROPER APPEND
		// ##TBD## INTIAL LOAD OF HELP-BOX VERY SLOW (!?)
		textcontainer.innerHTML = infostr;
		openHelp("OK");

/*
// ADDING PARAGRAPHS
	txtcontainer.append(document.createElement('p'));
	txtcontainer.append(`string`);

// ADDING LINK(S)
	const link = document.createElement('a');
	link.append(autowords[i]);
	txtcontainer.append(link);
*/

	} else if (arg === 'init') {
																						// HELP INIT
																			// FETCH DATA DIRECT LINK 
		let initstr = '<span class="headline">HOW TO USE THIS UTILITY</span><br>'
+ `If you downloaded the package, locate the file "${permalink}" in the folder "DATA" on your computer and open it from the App with "Choose file".\n`
+ 'You can also <a href="https://www.jenskreitmeyer.de/alpha/lexicon/DATA/' + permalink + '">download it separately</a> or <a id="fetch" onclick="fetchDataCSV()">directly import the data</a>.&nbsp;'
+ 'The Lexicon source file can be re-imported into Excel and edited (with due caution).<br>&nbsp;<br>'
+ 'All Lexicon entries are "speak-able items". Click on a word in the list of results to play its (pre-recored) audio. Hold the alt-key and click, to open a pop-up with the full lexeme info.<br>&nbsp;<br>'
//+ 'If you want to work offline with the audio download the files <a href="https://www.jenskreitmeyer.de/alpha/lexicon/DATA/Archiv.zip">here</a> (12 MB).<br>&nbsp;<br>'
+ 'Results for any query can be downloaded to a plain text file.<br>&nbsp;<br>';
//+ 'For more instructions and help, click the respective text links in the user interface.<br>&nbsp;<br>';
// ##TEMP##
		textcontainer.innerHTML = initstr;
		openHelp("OK");

// ##TBD## // CHANGE TO PROPER APPEND SYNTAX
// 		headline.replaceChildren('');
// 		headline.append(inithead);
// 		bodycopy.replaceChildren('');
// 		bodycopy.append(initbody);
// 		openHelp();

	} // ELSE

} // WRITEHELP











// --------------------------------------------------------------------------------------------
					 									// FETCH DATA REMOTELY VIA HTTP-REQUEST
function fetchDataCSV() {

	let dataURL = "https://www.jenskreitmeyer.de/alpha/lexicon/DATA/" + permalink;
	const myRequest = new Request(dataURL); // (!)PERMALINK
	console.log("REQUEST", myRequest);
	let size;

	fetch(myRequest)
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error, status = ${response.status}`);
		}
		size = response.headers.get('content-length'); 
		return response.text(); // ("<VALUE>" OF PROMISE)
	})
	.then((myText) => {
		//console.log("TEXT", myText);

// PARSER STRIPS CSV FOR LEXEME-OBJECTS
  	parseFile(myText);
		let msg = `COOL !\n\nSuccessfully imported data from ${myRequest.url}`;
		alert(msg);

// GLOBAL VARS FROM SCRIPT "CSV_LOAD_TO_OBJ"
		loaded = true;
		let temp = dataURL.split('/');
		fileimport = temp[temp.length - 1];

// UPDATE FIELDS IN UI
		filestatus.replaceChildren('');
		filestatus.append(`Imported ${fileimport}`);
		filesize.replaceChildren('');
		filesize.append(`${returnFileSize(size)}`);

	})
	.catch((error) => {
			let msg = `Error: ${error.message}`;
			alert(msg);
			console.log(msg);

	});

} // FETCH











