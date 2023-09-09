// 28-JAN-23 
// XFORK FOR QUERY-UTILITY APP 
// UNIT-TESTS AND DISPLAY IN HTML
// 30-JAN-23
// CONNECT WITH QUERY-MODULE/DISPLAY RESULTS
// WED 08-FEB-23
// SCRIPT SPLIT INTO "STRING QUERIES" AND "SELECT QUERIES"
// CALLING FUNCTION "FORMAT_RESULTS" IN FILE "QUERY_INTERFACE"
// MON 13-FEB-23
// ALL RESULTS (WORDS) MUST BE PUSHED TO "RESULTS"-ARRAY AS ARRAYS 
// TO AVOID SPREAD TO SEPARATE LTRS
// FRI 03-MAR-23
// NEW GROUPING SEARCHES 
// SUN 12-MAR-23
// FOR STRING-QUERIES IN LINE #144# IN HTML ID="QUERYSTATUS" 
// APPEND STRING-LIT "QTYPE" = "STRING-" 
// THU 11-MAY-23
		// ADDED SYLLABLE COUNTER
// MON 22-MAY-23
		// FIXED POSITIONAL SEARCH TO #NOT# SEARCH PREFIX
		// (RE)FORMATTING FOR ALL RESULTS-ARRAYS WITH REPLACEMENT-PAIRS
// FRI 26-MAY-23
		// REPLACING ARR WITH RESULT-OBJ





																		// PART "STRING_QUERIES"
console.log("#STRING_QUERIES# FRI 26-MAY-23\n\n");






// (STRING POSITION IN RESULTS HEADLINE)
let searchaffix = "";
let qtype = ""; // FOR STRING QUERIES																				
let msg = ""; 


													// RUN STRING-QUERIES FOR ARBITRARY PATTERNS
														// ALL STRING-VALUES ARE ##TO_LOWER_CASE##

// ==============================================================================================
function stringQuery(value) {

	console.log("NEW STRING QUERY \"", value, "\"");
	value = value.toLowerCase();

	let resultsarr = [];
	let startpos = false;
	let endpos = false;
	let valarr = Array.from(value);																										// THE ARG PASSED FROM INPUT-FIELD
	let testvalue = "";																																// THE ACTUAL STRING FOR COMPARISON
// RESET SEARCHAFFIX FOR ANY NEXT CASE
	searchaffix = "";
	msg = "";
// IS STRING-QUERY
	qtype = "string-";
			//console.log(valarr, testvalue);


// ..............................................................................................
																					// EMPTY STRING
// EXCLUDE "" FROM INPUT 
// "SHOW ALL" IS HANDLED BY SELECT-QUERY
	if (value === "") {
		//console.log("EMPTY STRING EXCLUDED");
		displayResults([], 0, "EMPTY STRING", []);
		return;
	}


// ..............................................................................................
																							// DIVIS
	if (value === "-") {
		//console.log('"-" DIVIS RETURNS ALL PRE(!)FIXES BUT NOT POSTFIXES');
		displayResults([], 0, 'USE "-STRING" OR "STRING-" INSTEAD', []);
		return;
	}


// ..............................................................................................
																		// POSITIONAL SEARCH-MODIFIER
// "X-" FOR "STARTS_WITH" AND "-X" FOR "ENDS_WITH"
// (IF NOTHING SPECIFIED MATCH AT #ALL# POSITIONS)
	if (value.endsWith('-') && value.length > 1) {																		// EXCLUDE "-" (DIVIS ONLY) QUERY

													// #############################################
														// ##TBD## "i-" AND "w-" RETURN PREFIXES ...

		startpos = true;
		valarr.pop();
		testvalue = valarr.join('');
// CHECK POSITION
// (UNITTEST)
//console.log(startpos, endpos, testvalue, "START");
	} else if (value.startsWith('-') && value.length > 1) {
		endpos = true;
		valarr.shift();
		testvalue = valarr.join('');
// (UNITTEST)
//console.log(startpos, endpos, testvalue, "END");
	} else {
		startpos, endpos = false;
		testvalue = value;
// (UNITTEST)
//console.log(startpos, endpos, testvalue, "NON-POS");
	}





// ..............................................................................................
															// FOR SEARCH "IE"/"I-E" IN ANY POSITION
															// ALLOW ALL "IE" BUT #EXCLUDE# PARTICLES
	if (value === 'ie') {																															// LINE ##89##
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).lex.toLowerCase();														// SEARCH IN "LEX"-PROP
			let returnable = key;

  		if (searchin.includes('_')) {
  			searchin = searchin.split('_')[1];
  			returnable = searchin;
			}

  		if (searchin.includes(value)) {
				//resultsarr.push([returnable]);
				resultsarr.push(new Result("", returnable, KEYTOVIEW, key));
  		}
  	} // FOR
	}



// ##MEMO##

// IN STRING QUERIES "SCHWA" AND "TIEFSCHWA" CAN BE SEARCHED POSITIONALLY
// -ERN -EL -EN -E -ER  WITH "-xx" (DIVIS) 
// SOME ERRS RETURNED AND WORKING ON #ENDINGS# ONLY (COMPOUNDS ONLY #LAST# PART)

// ALL LOGIC FOR CHS/CH/TSCH/SCH WAS REMOVED FRI 03-MAR-23
// AND 	#MUST# BE MERGED AND COVERED IN SCRIPT "INTERMEDIATE_PHONES"
// "NAKED" SEARCH FOR ABOVE STRINGS CAN ALWAYS BE PERFORMED // WITH CAVEATS IN "HELP"-TEXT






																					// ALL OTHERS
																			// NON-POSITIONAL SEARCH
// ..............................................................................................
	if ( startpos === false && endpos === false) {

					// 	### CODE CONTINUES HERE AFTER (RE)MOVED PART CHS/CH/TSCH/SCH LOGIC 03-MAR-23 ###
// DO NOT REPEAT LINE #89# FROM THIS SCRIPT
// DO NOT REPEAT LINE #171# FROM SCRIPT "SELECTION-QUERIES" 
		//} else {

			if (testvalue != "ie") {
				for (const key of Lexicon.keys()) {
// DIFF UC/LC																	
					let returnable;
					let searchin;
					key.includes('_') ? returnable = key.split('_')[1] : returnable = key;
					key.includes('_') ? searchin = key.split('_')[1] : searchin = key;
  				if (searchin.toLowerCase().includes(testvalue)) {
   					//resultsarr.push([returnable]);																			// IGNORE UC FOR SEARCH // RETURN UC FOR UC
   					resultsarr.push(new Result("", returnable, KEYTOVIEW, key));
  				}
				} // FOR
			} // NOT "IE"


	} // START/END




												// ALL "POSITIONAL" SEARCHES *MUST* STAY IN THIS SCRIPT
														// (NOT COVERED IN "PHONETIC INTERMEDIATE")

																	// POSITIONAL SEARCH AT START
// ..............................................................................................
// NO EXCLUSIONS NEEDED
	if ( startpos === true ) {
			let searchin;
			for (const key of Lexicon.keys()) {
												// EXCLUDING PARTICLES FROM SEARCH // 22-MAY-23 
				key.includes('_') ? searchin = key.split('_')[1].toLowerCase() : searchin = key.toLowerCase();
  			if (searchin.startsWith(testvalue)) {
  				//resultsarr.push([key]);
  				resultsarr.push(new Result("", key, KEYTOVIEW, key));
  			}
			}
		console.log("STARTING WITH");
		searchaffix = "(starting with)";
	} // END "IF START"




																	// POSITIONAL SEARCH AT END
// ..............................................................................................
// FOR "-CH" MUST EXCLUDE "-SCH" 
// (WHICH IN TURN EXCLUDES "-TSCH")
	if ( endpos === true ) {

		for (const key of Lexicon.keys()) {
			let item = key.toLowerCase();
			let varnum = "";																																	// (RECORD ONLY // NO NEED TO RE-ATTACH)
// STRIP VARNUM FOR SEARCH
			if (item.endsWith("1") || item.endsWith("2") || item.endsWith("3")) {							// ("ASSUMING" NO MORE THAN 3 VARS)
				varnum = item.slice(item.length-1, item.length);
				item = item.slice(0, item.length-1);	// REMOVE NUM
				//console.log("KEY", key, "ITEM", item, "NUM", varnum);
			}
// EXCLUSIVE SEARCH (AT END) DIS-ABLED 
// SUN 05-MAR-23
// #KEEP THIS BKUP#
/*
			if (testvalue === "ch") {
  			if (item.endsWith(testvalue) && item.endsWith("sch") === false) { 							// "-chs" IS EXCLUDED BY "-ch"
  				resultsarr.push([key]);
  			}
			}	else if (testvalue === "sch") {
  			if (item.endsWith(testvalue) && item.endsWith("tsch") === false) {
  				resultsarr.push([key]);
				}
// ALL OTHERS
			} else {
*/
			if (item.endsWith(testvalue)) {
				//resultsarr.push([key]);
				resultsarr.push(new Result("", key, KEYTOVIEW, key));
  		}

		} // END FOR
		console.log("ENDING WITH");
		searchaffix = "(ending with)";

	} // IF END






// =============================================================================================
																				// (RESULTS ALL STRINGS)
																				// PASS TO FORMATTER
	let rescount = resultsarr.length;
	displayResults(resultsarr, rescount, msg, [ZERO, ZERO, ZERO]);


} // ALL STRING_QUERIES




