// FRI 03-MAR-23
// NEW GROUPING SEARCHES 
// NEW FUNCTION(NAME)
// THU 11-MAY-23
// ADDED SYLLABLE COUNTER/ SIZE QUERY
// DATA 2233 ENTRIES // 12-MAR-23
// TUE 16-MAY-23
// FIXED ERROR FOR QUERY "KVK SHORT VOWEL" // REF #310#
// QUERY "KVK LONG VOWEL" // REF #256#
		// DOES NOT INCLUDE ARTICLE "die" BECAUSE THAT IS #KVV# HAHA
// ==================================================================
// 23-MAY-23
// NEW APPROACH TO SPLIT LINKS
		// IN QUERIES DIRECTLY GENERATE PAIRS TXT-LINK
		// PATTERN IS "VAL/LINK VAL/LINK ..." (MAX 3 COLUMNS)
// WED 24-MAY-23
		// NEW APPROACH USE RESULT-OBJECT NOT ARRAY
// FRI 26-MAY-23
		// STRING-SUBSTITUTIONS SOLVED FOR ALl QUERIES
		// PROPERTY "LEXKEY" ADDED TO OBJECTS // PRESERVE ACCESS TO LEXEME FROM POP-UP
// TUE 30-MAY-23
		// (DISPLAYING "TEMP DISABLED" MSG FOR QUERIES IN PROGRESS)
// WED 31-MAY-23
		// EXTERNALIZED CLASS "RESULT"






console.log("#DISTRIBUTION_QUERIES# WED 31-MAY-23\n\n");






// (INTERMEDIATE RESULT IN "SORT BY ENDING")
let femarr = [];

// UNITTEST
var irrexclusion = []; // (FROM "LERNWÖRTER")
var excludedvowpos = []; // (FROM "KVK SHORT VOWEL")








// =========================================================================================
function distributionQuery(arg) {

	console.log("NEW DISTRIBUTION QUERY \"", arg, "\"");
	// CLEAR SEARCHAFFIX FOR ANY NEXT CASE
	searchaffix = "";
	// IS NOT A STRING-QUERY
	qtype = "";
	// RESET COUNTER/MSG
	let results = 0;
	let msg = "";
	let rescount = "";





// ..........................................................................................
// (0) "NONE" // NO SELECTION (RE)SET
	if (arg === "none") {
							// RES-ARR | COUNT | MSG | SPACER-ARR
		displayResults([], "", "NO SELECTION", []);
	}




// ..........................................................................................
// ..........................................................................................
// (7) "100 MOST"

	if (arg === "rank") {
		let ranking = [];
		for (const key of Lexicon.keys()) {																								// (NOTE) "VALUES" ALSO ITERATES
			let rankval = Lexicon.get(key).rank; // PROP "RANK"
  		if (rankval) {
				if (key.includes('_')) {
					let split = key.split('_');
					ranking.push(new Rank(split[0], split[1], Lexicon.get(key).lex, rankval, SYLLTOVIEW, key));
				} else {
					ranking.push(new Rank("", key, Lexicon.get(key).lex, rankval, SYLLTOVIEW, key));
				}
  		}
		} // FOR
// ORDER NUMERICALLY
		ranking.sort((a, b) => a.rank - b.rank);																						// #MUST# SORT BY PADDED (=3-DIGIT) NUM
// (UNITTEST)
//console.log(ranking);
																			// TO QUERY FORMATTER (UI)
		rescount = ranking.length;
		let gaps = 100 - rescount;
		if (gaps > 0 && loaded) {
			msg = gaps + " items were dropped WTF ..." + "/n";
		} else {
			msg = 'Numbers are speak-able.<br>Person given for flexed verbs. Syllables "·" and <i>irreg spelling</i> marked in 3rd column.';
		}
		displayResults(ranking, rescount, msg, [SPACE, TAB, ZERO]);
	} // RANK








// ..........................................................................................
// ..........................................................................................
// INVENTORIES

// (UNITTEST)
/*
let bbdbls = [];
for (const key of Lexicon.keys()) {
	Lexicon.get(key).dictnrw ? nrw = "NRW" : nrw = "---";
	Lexicon.get(key).dictbb12 ? bb12 = "B12" : bb12 = "---";
	Lexicon.get(key).dictbb34 ? bb34 = "B34" : bb34 = "---";
	console.log(nrw, bb12, bb34);
	if (bb12 != "---" && bb34 != "---") {
		bbdbls.push(key);
	}
}
console.log(bbdbls); // WORDS BOTH IN BB12 AND BB34
*/

																		// GET TAG-VALUE OF INVENTORY
	function matchInventory(inventory, matchstr) {
		let match = [];
		for (const key of Lexicon.keys()) {

			if (Lexicon.get(key)[inventory] === matchstr) { 														// PROP DEFINED FOR INVENTORY T/F
				if (key.includes("_")) {
					let split = key.split("_");
					match.push(new Result(split[0], split[1], KEYTOVIEW, key));
				} else {
					match.push(new Result("", key, KEYTOVIEW, key));
				}
			}
		} // FOR
		return match;
	} // MATCH_INVENTORY



																				// QUERY INVENTORIES
// (2) INVENTORY "NRW"
	if (arg === "statnrw") {
		let inventory = "dictnrw";
		let matchstr = "NRW";
		let dictnrw = matchInventory(inventory, matchstr);
		results = dictnrw.length; // RETURNS 533 // 12-MAR-23
		msg = "";
		displayResults(dictnrw, results, msg, [ZERO, ZERO, ZERO]); // UFO BEFORE "PAYLD" // DEFINE/OVERRIDE SPACERS HERE



// (3) INVENTORY "BB 12"
	} else if (arg === "statbb12") {
		let inventory = "dictbb12";
		let matchstr = "BB12";
		let dictbb12 = matchInventory(inventory, matchstr);
		results = dictbb12.length; // RETURNS 322 // 12-MAR-23
		msg = "";
		displayResults(dictbb12, results, msg, [ZERO, ZERO, ZERO]);



// (4) INVENTORY "BB 34"
	} else if (arg === "statbb34") {
		let inventory = "dictbb34";
		let matchstr = "BB34";
		let dictbb34 = matchInventory(inventory, matchstr);
		results = dictbb34.length; // RETURNS 414 // 12-MAR-23
		msg = "";
		displayResults(dictbb34, results, msg, [ZERO, ZERO, ZERO]);



// (5) INVENTORY "COMMON"
	} else if (arg === "common") {
		let common = [];

		for (const key of Lexicon.keys()) {
			const nrw = Lexicon.get(key).dictnrw === "NRW";     // FLAG IS TRUE/FALSE
			const bb12 = Lexicon.get(key).dictbb12 === "BB12";
			const bb34 = Lexicon.get(key).dictbb34 === "BB34";

			if ( (nrw && bb12) || (nrw && bb34) ) {
				if (key.includes("_")) {
					let split = key.split("_");
					common.push(new Result(split[0], split[1], KEYTOVIEW, key));
				} else {
					common.push(new Result("", key, KEYTOVIEW, key));
				}
			}
		} // FOR

		results = common.length; // RETURNS 225 // 12-MAR-23
		msg = "überlappender Grundwortschatz NRW und BBB";
		displayResults(common, results, msg, [ZERO, ZERO, ZERO]); // UFO SPACE

	} // INVENTORIES








// ..........................................................................................
// ..........................................................................................
// (1) "SHOW ALL"
// 3-COLUMN "PARTICLE" "PAYLOAD" "(GENDER PLU)"

	if (arg === 'all') {
		let allarr = [];

		for (const key of Lexicon.keys()) {
			if (key.includes('=')) {
				console.log("UAAAHHH !", key); 																									// (ALERT) MISSED REMOVE HARDCODE XSAM
			}

				if (key.includes("_")) {
					let split = key.split("_");
					allarr.push(new Rank(split[0], split[1], "", "", KEYTOVIEW, key));
				} else {
					allarr.push(new Rank("", key, "", "", KEYTOVIEW, key));
				}

								// ############################################
										// RE-BUILD GENDER INFO FOR PLU NOUNS LATER

//   			let gender = Lexicon.get(key).ARTICLE;
//   			if (!gender) {
//   				allarr.push(new Rank("", key, "", "", KEYTOVIEW, key)); // 1-1-0
//   			} else if (gender) {
//   				if (Array.isArray(gender)) { // PLURALS ARE SPLIT "PLU M/F/N"
//   					allarr.push(new Rank(gender[0], key, "<i>"+gender[1]+"</i>", "", KEYTOVIEW));
//   				} else {
//   					allarr.push(new Rank(gender, key, "", "", KEYTOVIEW, key)); // 1-1-0
//   				}
//   			}

  	} // FOR


// (UNITTEST)
// allarr.forEach(entry => {
// 	console.log(entry.particle, entry.payload, entry.extra);
// });


		msg = '#IN PROGRESS# show artices (#TBD# gender shown for plural nouns with "die")';
		rescount = allarr.length;  // RETURNS 2233 // 12-MAR-23

		displayResults(allarr, rescount, msg, [ZERO, SPACE, ZERO]);
	} // ALL






// ..........................................................................................
// ..........................................................................................
// (10) "LERNWÖRTER "(IRREG VOWEL LENGTH)


	if (arg === "irregular") {
		let payload;
		let irregsarr = []; // ACTUAL RESULTS DISPLAY

		for (const key of Lexicon.keys()) {
  		if (Lexicon.get(key).IRRSPELL) {
  			payload = Lexicon.get(key).IRRSPELL; // PROP "IRRSPELL"

								// ##################### CONTINUE ####################
								// FOR EXCLUSION USE FULL PARAMETERS FROM "KVK LONG VOWEL"
  											// OMIT 3-LTR KVK LONG FROM THIS LIST
  											// (DONT LIST THESE AS IRREG TWICE)

  			if (payload.startsWith('(') && payload.endsWith(')')) { // EXCLUDE KVK LONG
					 // (UNITTEST)
  				irrexclusion.push(payload);
  				continue;
// ##TBD##
// EXCLUDE ALL "*"
// EXCLUDE ALL MEHRWORT "&"
  			} else {

									// ##################### EXCEPTION ####################
									// REMOVE FULL TAGGING FOR QUERIES "IRREG" AND "SYLL"
									// MOD METHOD OR ADD ARG "..." "USE_KEY"


					irregsarr.push(new Result("", payload, LEXTOVIEW, key));
				}
			}
		} // FOR

// (UNITTEST)
// irregsarr.forEach(entry => {
// 	if (entry.particle) {
// 		alert(`${entry} HAS A PARTICLE !`);
// 	}
// });

		msg = 'Words with "irregular" (non-naïve) vowel length ' 
			+ '#IN PROGRESS# UNITTEST print "irrexclusion".';
		rescount = irregsarr.length; // RETURNS 239 // 12-MAR-23
		displayResults(irregsarr, rescount, msg, [ZERO, ZERO, ZERO]);

	}




// ..........................................................................................
// (8) KVK LONG VOWEL ("GESPANNTER VOKAL")

	if (arg === 'KVK') {
		let kvkarr = [];
																// ############################
																// #CONTINUE# REBUILD LATER
/*
		for (const key of Lexicon.keys()) {
			let temp = Lexicon.get(key).lex;

// USE FOR IRREG ALSO>
			if (temp.length === 5) {
								// (ASSUMING ALL ARE TAGGED AS "IRREGULAR" WITH "(...)" PARENTHESIS)
				if (temp.startsWith('(') && temp.endsWith(')')) {
					if (temp.includes('aa') || temp.includes('oo')) {
						//console.log("NOT KVK", temp); // OK
						continue; 																														// (NEXT ITERATION)
// <USE FOR IRREG ALSO

					} else {
					 	temp = temp.replace('(', '<i>');
					 	temp = temp.replace(')', '</i>');
			 			kvkarr.push([temp]); // 1-0-0
			 			//console.log("KVK", temp)
			 		}
			 	}
			}
  	} // FOR
*/

		//msg = "3-letter words (CVC) with long vowel";				// (HAHA) THIS DOES NOT INCLUDE "die" BECAUSE IT IS KVV
		rescount = kvkarr.length;  // RETURNS 43 // 12-MAR-23
		msg = "(WORK IN PROGRESS) #TEMP# DIS-ABLED";
		//displayResults(kvkarr, rescount, msg, [ZERO, ZERO, ZERO]);
															// ###MUST HAVE AT LEAST 1 RESULT TO DISPLAY MSG###
		displayResults([], 1, msg, [ZERO, ZERO, ZERO]);
	}





// ..........................................................................................
// (9) KVK SHORT VOWEL ("UNGESPANNTER VOKAL")

	if (arg === 'san1ti3') { // = "KVK SHORT"
		let threebodyarr = [];
		let tempkey = "";
																// ############################
																// #CONTINUE# REBUILD LATER
/*
		for (const key of Lexicon.keys()) {
// EXCLUSIONS
			if (key.includes('*')) {
				continue;
			} else if (Lexicon.get(key).IRRSPELL) {
				continue;
			} else {
				tempkey = key; // (PRESERVE LTR CASE FOR LISTING)
			}
// TRIM VERSION NUMBERS
			if (tempkey.length === 4) {
				if (tempkey[3] === "1" || tempkey[3] === "2" || tempkey[3] === "3") {
					let nonum = tempkey.slice(0, 3);
					let numkey = tempkey; // (INDEX3 IS TYPE NUM)
																		 // ##REVIEW##
					//threebodyarr.push([nonum, Lexicon.get(numkey).lex]);
					//threebodyarr.push([numkey]);
					threebodyarr.push(new Result("", numkey, KEYTOVIEW, key));

				}
			} else if (tempkey.length === 3) { 																									// (MUTATION IMMEDIATE?)
				if (tempkey[2] === "1" || tempkey[2] === "-") {																		// EXCLUDE 2-LTR VERSIONS OR PREFIXES
					continue;
				} else {
																		 // ##REVIEW##
					//threebodyarr.push([tempkey, Lexicon.get(key).lex]);
					//threebodyarr.push([tempkey]);
					threebodyarr.push(new Result("", tempkey, KEYTOVIEW, key));
				}
			}
		} // FOR

// EXCLUDE DBL VOWELS
		let threebodydblvow = []; // INTERMEDIATE RESULTS ARRAY
		let exdblv = ["aa", "ee", "ie", "oo", "eu", "au", "äu", "ai"]; 												// ("ÄU" NOT IN 3-LTR WORDS)

		for (const el of threebodyarr) {
			let item = el[0].toLowerCase(); // EL IS TYPE ARRAY
			let exeddblv = false;
			//let testchar = "";
			for (const testchar of exdblv) {
				if (item.includes(testchar) === true) {
					exeddblv = true;
					// (UNITTEST) EXCLUDED WORDS
					excludedvowpos.push([testchar, item]);
					break;
				} 
			} // FOR
			if (!exeddblv) {
				threebodydblvow.push([el[0], el[1]]); // INTERMEDIATE RESULTS ARRAY
			}
		} // FOR

// FILTER FOR ALL "REGULAR" FORMS 
// (= SHORT VOWEL IS IN THE MIDDLE) 
		let threebody = [];
		let exclude = ["a", "e", "i", "o", "u", "ä", "ö", "ü"];															// (VOWEL NOT IN THE MIDDLE)

		for (const el of threebodydblvow) {
			let item = el[0].toLowerCase(); // EL IS (SINGLE WORD)ARRAY
			let excluded = false;
			//let testchar = "";
			for (const testchar of exclude) {
				if (item.startsWith(testchar) === true || item.endsWith(testchar) === true) {
					excluded = true;
					// (UNITTEST) EXCLUDED WORDS
					excludedvowpos.push([testchar, item]);
					break;
				} 
			} // FOR TESTCHAR
			// ALSO EXLUDE -H ("DEHUNGS-H") AS REGULAR SPELLING
			if (!excluded && item.endsWith('h') === false) {
				//threebody.push([el[0], el[1]]);
						 										// ##REVISION## RESULTS ARRAY	
				threebody.push([el[0]]);			
				//console.log("NOT EX", testchar, item) ;
			} // FOR
		} // FOR
*/

// #TEMP# (DISABLED DISPLAY)
		let threebody = [];
// PRINT TO RESULTSLIST
		//msg = '3-letter words (CVC) with short vowel. (UNITTEST PRINT "excludedvowpos")';
		msg = "(WORK IN PROGRESS) #TEMP# DIS-ABLED";
		rescount = threebody.length; // RETURNS 19 // 12-MAR-23
		//displayResults(threebody, rescount, msg, [ZERO, ZERO, ZERO]);
															// ###MUST HAVE AT LEAST 1 RESULT TO DISPLAY MSG###
		displayResults([], 1, msg, [ZERO, ZERO, ZERO]);
	}




// ..........................................................................................
// ..........................................................................................
// (6) "ANLAUTWÖRTER" (PGK FOR XSAM/SOURCEBOOK)
// 3-COLUMN "PHONEME XSAM" "ANLAUTWORD" "SOURCEBOOK"

	if (arg === "anlaute") {
		let anlaute = [];
													// USING COLUMN/PROPERTY "FLAG" TO FILTER CONTENT
													// FORMAT IS "<SOURCE><LATIN>=<XSAMPA>" // "ALMAäu=OY"
		let flag;
		const ALMA = "<i>Alphamar</i>";
		const APLU = "<i>Alphaplus</i>";
		const SCHPA = "<i>Schritte Plus Alpha</i>";

		for (const key of Lexicon.keys()) {
			flag = Lexicon.get(key).flag;
			if (flag.includes('ALMA') || flag.includes('APLU') || flag.includes('SCHPA')) {

				flag = flag.split(' '); // (FOR CLONING)
				flag.forEach( item => {
					// SPLIT SOURCE AND PHONETIC // KEY IS "ANLAUT"WORD
					if (item.includes('ALMA')) { anlaute.push(new Rank(item.split('ALMA')[1], key, ALMA, "", KEYTOVIEW, key)) }
					if (item.includes('APLU')) { anlaute.push(new Rank(item.split('APLU')[1], key, APLU, "", KEYTOVIEW, key)) }
					if (item.includes('SCHPA')) { anlaute.push(new Rank(item.split('SCHPA')[1], key, SCHPA, "", KEYTOVIEW, key)) }
				});

			}
		} // FOR

// (UNITTEST)
// anlaute.forEach(item => {
// 	console.log("ANLAUTE", item);
// });


// SOURCE-SYMBOLS ORDER IS AS ENTERED IN CSV-COLUMN // NOT ALPHA (RE)SORTED
// (!) LEXICON IS #NOT# ALPHA SORTED BY MAP-IMPORT // ORDERED AS ENTERED/SORTED IN CSV


		rescount = anlaute.length; // RETURNS 132 (DBLS AND TRPLS) // 25-MAY-23
		msg = '"Anlautwörter" (key phonemes) from Alphamar (Klett), Schritte Plus Alpha kompakt (hueber), Alpha Plus (Cornelsen). ' 
				+ 'Differentiated long and short vowel only in Alphamar. Left column showing Latin to X-SAMPA.';
		displayResults(anlaute, rescount, msg, [TAB, TAB, ZERO]);
	}





// ..........................................................................................
// (11) FEMININE WORDS (UNSORTED)

	if (arg === 'fem') {
	femarr = [];
// FIND BY PROP "ARTICLE"
		for (const key of Lexicon.keys()) {																									// SEARCH PROP "ARTICLE" 
			let art = Lexicon.get(key).ARTICLE;																								// FOR ALL PLURALS IS ["X", "(X PLU)"]
			if (art === "die") {																															// WILL SKIP TWO-EL ARRAYS
			 	femarr.push(new Result(art, key, KEYTOVIEW, key));
			}
		} // FOR
		msg = '(TO SEE THESE RESULTS SORTED USE QUERY "FEM SORT BY ENDINGS" )';
		rescount = femarr.length;  // RETURNS 423 // 12-MAR-23
// INTERMEDIATE RESULT
		displayResults(femarr, rescount, msg, [SPACE, ZERO, ZERO]);

	} // FEMININE (ALL)






// ..........................................................................................
// (12) FEMININE WORDS (SORTED BY ENDING)

// PULL FROM RESULT "FEMININE WORDS (UNSORTED)"
// CALL QUERY IF NOT YET RUN
	if (arg === 'femsorted') {
		if (femarr.length === 0) {
			distributionQuery('fem');
		}

// SCHWA("-E")-ENDING VERSUS OTHERS
		let others = [];
		let femsorted = [];

/*
		for (const item of femarr) {
			//console.log("FEMARR", item);
										// #REVISION# REMOVED "&& item.payload.endsWith("ie") === false"
										// ALLOW "-IE" ALS KIND-OF-SCHWA
			if (item.payload.endsWith("e") && item.payload.endsWith("ee") === false) {
				femsorted.push(item); // "SCHWA" // RETURNS 235 // 12-MAR-23
			} else {
				others.push(item); // (OTHERS)
			}
		} // FOR
*/

// (UNITTEST)
// femsorted.forEach(item => {
// 	console.log(item);
// });
// others.forEach(item => {
// 	console.log(item);
// });


																// ############################
																	// #CONTINUE# REBUILD LATER
																
/*
// 		console.log(femarr[0], femarr[0][0], femarr[0][1]);																// FORMAT IS ["", ""]
// ADD A "SUBHEAD" FOR EACH GROUP
		let femsortednum = femsorted.length;
// ###TBD### AVOID FORMAT BOLD ITAL FOR "(schwa)"
		femsorted.unshift([`\t-e (schwa) ` + "(" + femsortednum + ")"]); 										// INSERT AT FRONT

// SUB-SORT "OTHERS"
		let infix = [];
		let iefix = [];
		let ungfix = [];
		let keitfix = [];
		let heitfix = [];
		let rest = [];
		for (const item of others) { 																												// ITEMS ARE ["", ""]
			if (item[1].endsWith("in") && item[1].endsWith("ein") === false) {
				infix.push(item);
			} else if (item[1].endsWith("ie")) {
				iefix.push(item);
			} else if (item[1].endsWith("ung")) {
				ungfix.push(item);
			} else if (item[1].endsWith("keit")) {
				keitfix.push(item);
			} else if (item[1].endsWith("heit")) {
				heitfix.push(item);
			} else {
				rest.push(item);
			}
		}

// COPY ALL ENTRIES TO COMMON ARRAY (AFTER SCHWA-ENDING)
// -IN
		let innum = infix.length;
			// "SUBHEAD"										// ###TBD### // ESCAPE "(" AND ")"
		femsorted.push(["\n\t-in " + "(" + innum + ")"]);
		infix.forEach(el => femsorted.push(el));																						// EL IS ["", ""]
// -UNG
		let ungnum = ungfix.length;
		femsorted.push(["\n\t-ung " + "(" + ungnum + ")"]);
		ungfix.forEach(el => femsorted.push(el));
// -KEIT
		let keitnum = keitfix.length;
		femsorted.push(["\n\t-keit " + "(" + keitnum + ")"]);
		keitfix.forEach(el => femsorted.push(el));
// -HEIT
		let heitnum = heitfix.length;
		femsorted.push(["\n\t-heit " + "(" + heitnum + ")"]);
		heitfix.forEach(el => femsorted.push(el));
// -IE 																																									// (STILL "KIND-OF-LIKE" SCHWA)
		let ienum = iefix.length;
		femsorted.push(["\n\t-ie " + "(" + ienum + ")"]);
		iefix.forEach(el => femsorted.push(el));
// ALL OTHERS // RETURNS 132 // 12-MAR-23
		let restnum = rest.length;
		femsorted.push(["\n\tothers " + "(" + restnum + ")"]);
		rest.forEach(el => femsorted.push(el));
*/


// PRINT FINAL RESULT (SORTED)
// 		msg = `SCHWA ${femsorted.length} OTHERS ${others.length}`;
// 		msg = "SCHWA " + femsorted.length + " OTHERS " + others.length;
// 		console.log(msg);
																				// ######################## 
																				// #TEMP# PRINT-OUT
		//msg = 'most (2/3) feminine words end on schwa "-e" (not counting those with explicit fem. affixes "-in" "-ung" "-keit" "-heit")';
		// DEBUGGING
		rescount = femsorted.length;
		msg = 'SORT BY ENDING "-E" "-IN" "-UNG" "-KEIT" "-HEIT"<br>(WORK IN PROGRESS) #TEMP# DIS-ABLED'; //  "-E" "-IN" "-UNG" "-KEIT" "-HEIT"
		//msg = '(IN PROGRESS) only showing results for "ending in schwa"';
		//results = femsortednum + innum + ungnum + keitnum + heitnum + ienum + restnum; // (7 SUBHEADS)
		//displayResults(femsorted, results, msg, [SPACE, ZERO, ZERO])
															// ###MUST HAVE AT LEAST 1 RESULT TO DISPLAY MSG###
		displayResults([], 1, msg, [ZERO, ZERO, ZERO]);

	} // FEM SORTED






// ..........................................................................................
// ..........................................................................................
// (13) MASCULINE WORDS ENDING ON SCHWA

	if (arg === 'masc') {
		let mascarr = [];
															// FILTER RESULTS BY "ARTICLE" AND "-E"
		for (const key of Lexicon.keys()) {		
			let art = Lexicon.get(key).ARTICLE;																								// FOR ALL PLURALS IS TWO EL ARRAY ("GEN" "PLU")
			if (art === "der" && key.endsWith('e') && key.endsWith('ee') === false) {
			 	mascarr.push(new Result(art, key, KEYTOVIEW, key));																						// "ART" IS PRTCLE
			}
		}
// (UNITTEST)
		for (const item of mascarr) {
			console.log("MASC SCHWA\n", item);
			console.log("PARTICLE", item.particle, "\nLINK", item.particlelink,
						"\nPAYLOAD", item.payload, "\nLINK", item.payloadlink, "\n\n");
		}

		msg = 'few masculine words end on "-e" (schwa)';
		rescount = mascarr.length;  // RETURNS 19 // DATA 05-MAR-23
		displayResults(mascarr, rescount, msg, [ZERO, ZERO, ZERO]);

	} // MASC SCHWA







// ..........................................................................................
// ..........................................................................................
// (14) FLEXED FORMS

	if (arg === "flexed") {
		let flexed_res = [];
																	// FILTER RESULTS BY "_"
		for (const key of Lexicon.keys()) {
  		if (key.includes('_')) { 																										// FILTER IS JUST THAT
				let split = key.split('_'); 																							// PARTICLE_PAYLOAD
				flexed_res.push(new Result(split[0], split[1], KEYTOVIEW, key));
  		} // NO ELSE
  	}
// (UNITTEST)
// 		for (const item of flexed_res) {
// 			console.log("FLEXED_RES\n", item);
// 			console.log("PARTICLE", item.particle, "\nLINK", item.particlelink,
// 						"\nPAYLOAD", item.payload, "\nLINK", item.payloadlink, "\n\n");
// 		}

		msg = "";
		rescount = flexed_res.length; // RETURNS 140 // 12-MAR-23
		displayResults(flexed_res, rescount, msg, [TAB, TAB, ZERO]);
	} // FLEXED









// ..........................................................................................
// ..........................................................................................
// (15) KOMPOSITA

	if (arg === 'compound') {
		let comparr = [];
																	// FILTER RESULTS BY "+"
		for (const key of Lexicon.keys()) {
			let search = Lexicon.get(key).lex.toLowerCase();														// SEARCH PROP "LEX(EME)"
			if (search.includes('+')) {
  			if (key.includes('_')) { 																									// (REDUNDANT FOR COMPOUNDS)
					let split = key.split('_'); 																						// PARTICLE_PAYLOAD
					comparr.push(new Result(split[0], split[1], key));
  			} else {
  				comparr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
  	}

// (UNITTEST)
// 		for (const item of comparr) {
// 			console.log("COMPS\n", item);
// 			console.log("PARTICLE", item.particle, "\nLINK", item.particlelink,
// 						"\nPAYLOAD", item.payload, "\nLINK", item.payloadlink, "\n\n");
// 		}

		msg = "";
		rescount = comparr.length;  // RETURNS 72 // 12-MAR-23
		displayResults(comparr, rescount, msg, [ZERO, ZERO, ZERO]);
	} // COMPOUND




// ..........................................................................................
// ..........................................................................................
// (16) MEHRWORTAUSDRUCK

	if (arg === 'mehrwort') {
		let mehrarr = [];
																	// FILTER RESULTS BY " " (SPACE)
		for (const key of Lexicon.keys()) {
  		if (key.includes(' ')) {
  			mehrarr.push(new Result("", key, KEYTOVIEW, key));																	// (NO PARTICLES POSSIBLE)
  		}
  	} // FOR

// (UNITTEST)
// 		for (const item of mehrarr) {
// 			console.log("MEHRWORT\n", item);
// 			console.log("PARTICLE", item.particle, "\nLINK", item.particlelink,
// 						"\nPAYLOAD", item.payload, "\nLINK", item.payloadlink, "\n\n");
// 		}

		msg = "";
		rescount = mehrarr.length;  // RETURNS 15 // 12-MAR-23 
		displayResults(mehrarr, rescount, msg, [ZERO, ZERO, ZERO]);
	}



} // QUERY DISTRIBUTION






