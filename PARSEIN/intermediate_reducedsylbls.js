// (EXTERNAL SCRIPT) // 22-JAN-23
// EARLY (IMMEDIATE) XSAMPA CONVERSIONS MAY BE DIFFICULT TO FILTER LATER
// STICK WITH GRAPHEME BRACKETING ONLY // USE COMMON PATTERN LIKE "=er=-"/"=Er=-"
// 25-JAN-23
// ALL GRAPHEMES ARE NOW ONLY TESTED IN #LOWERCASE#
// (UPERCASE IS STORED IN LEXEME-OBJ)
																					// ##TBD##
// ##VOK-R## COUNT // CHECK RESULTS FOR INITIAL VOWELS-PLUS-R
																				 // ##OPEN##
// LAST REDUCED-SYLLABLES (ENDINGS) ARE TBD ("-EL" AND OTHERS)
// OTHER POSTFIXES ("-LING" "-LICH" ETC) TO BE DECIDED
// EASY TO FILTER OR PROP IN SOURCE // NO DIRECT/ADDITIONAL EFFECT ON PHONETICS EXCEPT FOR "-IG"
// "-IG" SHOULD BE HANDLED AS PART OF ENDING CONSONANT MUTATION (AUSLAUTVERHÄRTUNG/WEICHUNG)
// 20-FEB-23
// REVISION OF QUERY-PATTERNS INCLUDED IN THIS SCRIPT
// (ALL OTHERS ARE IN "INTERMEDIATE_PHONETIC")
// 02-MAR-23
// INCOMING ARRAY "GRPHMS" ENTRIES ARE [KEY, INTERPHON]
// "INTERPHON" = "GRPHMS[i][1]" ALREADY HAS ALL PHONEMES TAGGED #EXCEPT# "R"-VARIANTS
// FURTHER PROCESS INTERPHON
	// (1) SEPARATE PARTICLES FROM ALL OTHER ENTRIES
	// (2) TAG SHORT WORDS
	// (3) TAG REMAINING "R" IN PARTICLES ("E=R=" "WI=R=" "IH=R=" "DE=R=" )
	// PROCESS "BASE" LEXEME AS USUAL
// 05-MAR-23
	// FINE-TUNING PHON "SCHWA" // EXCLUDE UNIQUE INSTANCE "je" // Q-CHECK
	// COMPLETE REBUILD OF REDUCED-SYLLABLE TAGGING
// 10-MAR-23 // MEMO
// ALL BASIC GRAPHEME-TAGS ARE EXECUTED "REPLACE_ALL" ON FULL STRING (REGARDLESS OF PARTS OF WORD)
// PHONETIC TAGS FOR REDUCED SYLLABLES (ALL "R"-VARIANTS) REQUIRE PER PART SPLITTING
// 12-MAR-23
// TAG CHANGED IN "INTERMEDIATE PHONETICS" FROM "=...=" TO "<...>" FOR "zw" TO AVOID EDGE-CASES 
// "=zw=e=ck=" (MISREAD AS INNER SCHWA "=e=") AND "=zw=er=ch=fell" (MISREAD AS INNER "=er=")

// THU 11-MAY-23
// CNTD ADD SYLLABLE COUNTER





console.log("#INTERMEDIATE_REDUCEDSYLBLS# MON 15-MAY-23\n\n");
									// ### ALL INTERMEDIATE TRANSCRIPTIONS IN "GRPHMS" ARE COPIED 
											// TO PROP "INTERPHON" IN SCRIPT "TTS_XSAMPA" ###

// DEBUGGING ONLY
let compoundslist = [];
let shortvokrlist = [];
let numvarschwalist = [];



																		// TAG LEXEMS FOR XSAMPA
											// GET PARTICLES AND BASE-LEXEME SINGLE OR COMPOUND
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ("GRPHMS" NOW NEEDED AS ARG)

function tagReductions(grphms) {
	console.log("\n\n");
	console.log("*** RUNNING ***");
	console.log("TAG_REDUCTIONS");

	for (let i = 0; i < grphms.length; i++) {
		let item = grphms[i][1];																												// "INTERPHONE" (LOWERCASE AND NO PAREN)

// PROCESS FLEXED WORD (HAS PARTICLES) 
		if (item.includes("_")) {
																	// PROCESS PARTICLE
			let particle = preProcess(item.split("_")[0]);																// (UNDEF FOR "NAKED" LEXEME)
			let lexbase = item.split("_")[1];
			if (lexbase.includes("+")) {
																		// PROCESS COMPOUND
				item = processCompound(lexbase)
			} else {
																		// PROCESS SIMPLE
				item = processWord(lexbase);
			}
																	// RE-CONSTITUTE FLEXED			
			grphms[i][1] = particle.concat("_".concat(item));

// PROCESS NON-FLEXED
		} else {
			if (item.includes("+")) {
																		// PROCESS COMPOUND
				grphms[i][1] = processCompound(item);
			} else {
																		// PROCESS SIMPLE
				grphms[i][1] = processWord(item);
			}

		}

	} // FOR



// MUST BE OUTSIDE OF LOOP
	runCorrections(grphms);


	console.log("= = = = = = = = COMPOUNDS  = = = = = = = =");
	console.log(compoundslist);
	console.log("= = = = = = SHORT VOK-R WORDS  = = = = = =");
	console.log(shortvokrlist);
	console.log("= = = = = = = NUM SCHWA VARS = = = = = = =");
	console.log(numvarschwalist);



} // TAG_REDUCTIONS
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^








																			// TAG PARTICLES
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// MATCHES "E=R=" "WI=R=" "IH=R=" (VERB) "DE=R=" (NOUN)
function preProcess(particle) {
	if (particle.includes("r")) {
		particle = particle.replaceAll("r", "=r="); 
	}
	return particle;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






																		// PROCESS COMPOUNDS WORD-WISE																// LINE #136#
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function processCompound(item) {
	let taggedcomp = "";


	let parts = item.split("+"); // ARRAY

																// STRING-UP COMPOUND PARTS
	for (let i = 0; i < parts.length; i++) {
		//parts[i] = processWord(parts[i]).concat('+');															// RE-TAG "+" // MUTATION UNSURE
		let temp = processWord(parts[i]).concat('+');
		//taggedcompound += parts[i];
		taggedcomp += temp;
	}

// WRITE TO RETURN-VAL
	item = taggedcomp.slice(0, taggedcomp.length-1);															// REMOVE LAST "+" TAG

// #####TEMP##### // TRACK OCCURRENCES
	compoundslist.push(item);

	return item;
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^








																				// PROCESS WORD
															// (FOR COMPOUNDS CALLED PER EACH PART)
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function processWord(item) {

																	// SHORT WORDS "VOK-R"

// (DEFINED BY XSAMPA AS "NON-SYLLABIC REDUCED R")
// 3 IS MINIMUM LENGTH FOR CLOSED SYLLABLE (PLUS NUMERAL)
	if (item.length <= 4) {
						// (CANNOT MATCH ALREADY TAGGED (AND LONGER) "=QU=ER" "H=IE=R" "V=IE=R")
						// "INCLUDES('ER')" MATCHES "ER" "DER1" "DER2" "WER" "HER"
		if (item.endsWith("rr") === false) {																						// LETS "R1" ET AL PASS // LINE #192#
			if (item.endsWith("r") || item.endsWith("r1") || item.endsWith("r2")) {				// RARE 3-LTR HOMOGRAPHS

// ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====
				// ### TBD ### // MUST REPLACE *LAST* "R" ONLY // EDGE CASE "F=R=OR"
				item = item.replace("r", "=r=");
// ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====

				// ### DEBUGGING ### TRACKER
				shortvokrlist.push(item); // RETURNS 31 (10-MAR23)
			}
		}

	} // LENGTH


																		// SPLIT PREFIXES IN WORD
														// (NONE OF THE SHORT WORDS CAN HAVE "-")
	if (item.includes("-")) {															
		let prefix = item.split("-")[0];
		let root = item.split("-")[1];

													// VOK-R IN PREFIX (UNSTRESSED SYLLABLE)
													// MATCHES "ER-" "HER-" "VER-" "VOR-" "ZER-" "UR-"
			if (prefix.endsWith("r")) {
				prefix = prefix.replace("r", "=r=-");																					// (RE-TAG WITH DIVIS ALSO)
				item = prefix.concat(root);

													// MATCHES SCHWA IN PREFIX "BE-" AND "GE-"
													// TAG CHANGED TO "<e>" TO EXCLUDE PREFIXES FROM SCHWA "=e=" SEARCH
			} else if (prefix.endsWith("e")) {
				prefix = prefix.replace("e", "<e>-");																					// (RE-TAG WITH DIVIS ALSO)
				item = prefix.concat(root);
			}

	} // PREFIX




																					// "-E" "SCHWA

// (WILL NOT MATCH "-IE" WHICH WAS ALREADY TAGGED "=IE=" IN INTERMEDIATE_PHONETICS)
// FOR CORRECTING "-E=E=" TO DBL VOWEL "-EE" SEE LINE #367#

// NUMBERED VARIANTS // TEMP REMOVE NUM
	if (item.endsWith("e1") || item.endsWith("e2") || item.endsWith("e3")) {
		const varnum = item.slice(item.length-1, item.length);
		const torso = item.slice(0, item.length-2);
		item = torso.concat("=e=".concat(varnum));																	// REPLACE (BUT ONLY LAST "E")

// ### DEBUGGING ###
// LOG VARIANTS WITH SCHWA
		numvarschwalist.push(item); 																													
	}

// NON-VARIANTS
	if (item.endsWith("e")) {																															
		const torso = item.slice(0, item.length-1);
		item = torso.concat("=e=");																									// REPLACE (BUT ONLY LAST "E")
	}



																					// "-ER" TSCHWA

// SHORT WORDS EXCEPTED IN LINE #64#
// (ALREADY TAGGED "-E=R=")

// VARIANTS TEMP REMOVE NUM
	if (item.endsWith("er1") || item.endsWith("er2") || item.endsWith("er3")) {
		const varnum = item.slice(item.length-1, item.length);
		const torso = item.slice(0, item.length-3);
		item = torso.concat("=er=".concat(varnum));																	// REPLACE (BUT ONLY LAST "ER")

// ### DEBUGGING ###
// LOG VARIANTS WITH TSCHWA
		numvarschwalist.push(item); 		
	}

// NON-VARIANTS
	if (item.endsWith("er")) {
		const torso = item.slice(0, item.length-2);
		item = torso.concat("=er=");																								// REPLACE (BUT ONLY LAST "ER")
	}



																							// "-ERN"

// EXCLUDE ALL MONO-SYLLABIC WORDS // 01MAR23
// HYPHENATION/BREAK MARKER "·" (MIDDOT) IN SOURCE BECOMES #CRITICAL#
// WITHOUT SYLL-BREAK ALWAYS IS JUST VOK-R
// ("KERN" "STERN" "GERN" ETC)

	if (item.endsWith("ern") && item.includes("·")) {
		const torso = item.slice(0, item.length-3);
		item = torso.concat("=ern=");
	}



// ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====
																	// VOK-R AT WORD ENDINGS
																// VANILLA TEST "ENDS_WITH('R')"
// ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====    ====

	if (item.endsWith("r")) {
		const tempstr = item.slice(0, item.length-1);
		item = tempstr.concat('=r=');																							// ATTENTION // "-ER" *MUST* TO BE TAGGED ALREADY
	}


	return item;


} // PROCESS_WORD

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^











																	// ### TBD CHECK CASES ####
// (T)IER (V)IER (H)IER		// HAS EARLIER "=IE="-TAG
// (L)E=ER= EER						// "EER" (RE-)MATCHED WITH CORRECTIONS
// 4-LTR WORDS
// (KL)AR (H)AAR (D)IR (T)=IE=R (V)OR (M)OOR (N)UR ##UR-##
// (W)AHR (M)EHR IHR UHR OHR
// (M)ÄR ÖHR 
// (L)ÄR(M) (W)AR(M) (W)ÄR(MEN)
// INNER ER
// (W)ER(T) (SCHW)ER(T) (H)ER(D) // ER(D)-(BEERE) (L)ER(NEN)





// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function runCorrections(grphms) {

	console.log("\n\n");
	console.log("*** RUNNING ***");
	console.log("CORRECTIONS");
	//console.log("\n\n");

// TRACK CASES
let corrtracker_ee = [];
let corrtracker_er = [];
let corrtracker_rr = [];
let corrtracker_p1 = [];



	for (let i = 0; i < grphms.length; i++) {

// "JE" SINGULAR INSTANCE 																														// NOW MUTATED TO "J=E="
		if (grphms[i][1] === "j=e=") {
			grphms[i][1] = "je";
			corrtracker_ee.push(grphms[i][1]);
		}

// RE-FORMAT POSSIBLE "-EE"-ERRORS (FOR SCHWAS) 																			// LINE #367#
		if (grphms[i][1].endsWith("e=e=")) {
			const revert = grphms[i][1].slice(0, grphms[i][1].length-4);
			grphms[i][1] = revert.concat("ee");
			corrtracker_ee.push(grphms[i][1]);
		}


																	// (BASED ON EXCEPTIONS LIST)
					// ________________________________________________________________________
														// RE-FORMAT MIS-MATCHED "-ER" TO VOK-R

// ####TBD#### 
// SPLIT COMPOUNDS FIRST
// EXCEPT "HIER+HER"

		if (grphms[i][1].endsWith("h=er=")) {																								// ###### TEMP #####
									// DIFF AGAINST OTHER "w=er=" // Schwert Schwerst...
			grphms[i][1] = "he=r=";																														// PRESERVE (EARLIER) "sch"
			corrtracker_er.push(grphms[i][1]);
		}

		if (grphms[i][1].endsWith("=sch=w=er=")) {																					// ###### TEMP #####
									// DIFF AGAINST OTHER "w=er=" // Schwert Schwerst...
			grphms[i][1] = "=sch=we=r=";																											// PRESERVE (EARLIER) "sch"
			corrtracker_er.push(grphms[i][1]);
		}
		if (grphms[i][1].endsWith("qu=er=")) {
			grphms[i][1] = "=qu=e=r=";
			corrtracker_er.push(grphms[i][1]);
		}
		if (grphms[i][1].endsWith("e=er=")) {
			grphms[i][1] = grphms[i][1].replaceAll("e=er=", "ee=r=");													// (NO KNOWN REALISTIC MULTI INSTANCES)
			corrtracker_er.push(grphms[i][1]);
		}


					// ________________________________________________________________________
															// RE-FORMAT MIS-MATCHED "R=R=" TO "RR"
															// FOR 4-LTR WORDS // CORRECTED IN LINE #192#
													// ##TBD## REVIEW IF ANY KNOWN INSTANCES
													
		if (grphms[i][1].endsWith("r=r=")) {																								// MISMATCHED DBL-R ENDING
			grphms[i][1] = grphms[i][1].replaceAll("r=r=", "rr");
			corrtracker_rr.push(grphms[i][1]);
		}

					// ________________________________________________________________________
										// RE-FORMAT MIS-MATCHED SCHWA "E=E=" TO DBL VOW "EE-"
										// ##TBD## REVIEW IF ANY KNOWN INSTANCES IN FIRST PARTIAL 
																	// 11-MAR-23

		if (grphms[i][1].includes("-")) {
			let split = grphms[i][1].split("-");
								    						// UNDO POSSIBLE "-EE"-ERRORS
			if (split[0].endsWith("e=e=")) {
				const revert = split[0].slice(0, split[0].length-4);
				//console.log(revert);
				grphms[i][1] = revert.concat("ee-").concat(split[1]);
				corrtracker_p1.push(grphms[i][1]);
			}
		}


	} // FOR GRPHMS



	console.log("= = = = = = TRACKER EE = = = = = =");
	console.log(corrtracker_ee);
	console.log("= = = = = = TRACKER ER = = = = = =");
	console.log(corrtracker_er);
	console.log("= = = = = = TRACKER RR = = = = = =");
	console.log(corrtracker_rr);
	console.log("= = = = = = TRACKER P1 = = = = = =");
	console.log(corrtracker_p1);







// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
																// ### REVIEW COMPLETELY ###
																// ### DO NOT SPLIT AGAIN ###
/*
	let tracker_inner_er = [];
	let tracker_anlaut_vokr = [];

								    		// FIND #INNER# "-ER-" STILL NOT CODED "-ER" OR "-R"

	for (let i = 0; i < grphms.length; i++) {

		// DO NOT MATCH IN PARTICLES
		let testitem = "";
		grphms[i][1].includes('_') ? testitem = grphms[i][1].split('_')[1] : testitem = grphms[i][1];
		//console.log(testitem);
		if (testitem.includes("er")) {
			if (testitem.includes("=er=") === false && testitem.includes("=ern=") === false) {
				tracker_inner_er.push(testitem);																									// PUSH "INNER -ER-"
			}
		}

		// REPLACED "OR" (||) WITH LOOP-ARRAY // 19-FEB-23
		let anlautr = ["ar", "ahr", "ir", "ihr", "or", "ohr", "ur", "uhr"]; 									// ("Ä" "ÄH" ETC LIKELY SYLLABIC)
		let copyr = false;
		for (const testchar of anlautr) {
			if (testitem.startsWith(testchar) === true) {
				copyr = true;
				break;
			} 
		}
		if (copyr && testitem.includes("ir·r") === false) {
			tracker_anlaut_vokr.push(testitem);																									// PUSH ANLAUT "VOK-R"
			//console.log("COPY", testitem);
		}
	} // FOR GRPHMS



	console.log("= = = = = = TRACKER INNER-ER = = = = = =");
	console.log(tracker_inner_er);
	console.log("= = = = = = TRACKER ANLAUT VOK-R = = = = = =");
	console.log(tracker_anlaut_vokr);
*/




					// __________________________________________________________________________
																						// LAST CALL 
										// MOVED AFTER ALL REDUCTIONS AND CORRECTIONS ARE COMPLETED
// ("GRPHMS" NOW NEEDED AS ARG) // FUNC NAME CHANGED 20-MAY-23
		formatToXSAM(grphms);



} // END CORRECTION-RUN
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





