										// PHONEME TO INTERMEDIATE ("INTERPHON") TRANSCRIPTION
// ALL #MULTI#-CHAR GRAPHEMES ARE REPLACED IN THIS SCRIPT
// ALL #SINGLES# IN SCRIPT "TOXSAMFORMAT"


// 21-JAN-23
					// TAGGING
					// ALL #AFFIXES# (PREFIXES) MUST BE MANUALLY TAGGED IN SOURCE (UN BE GE VER ZER ÜBER ...)
							// EG "UN-" NOT IN "UND"!
					// EXEMPT ARE ALL #ENDINGS# ON PARTIAL OR SIMPLE NOUN (UNG HEIT KEIT -E -ER ...)
// 22-JAN--23
					// EXPANDING IMPORT TO PRESERVE ALL ASSOCIATED LEXEM-INFO IN OBJ
					// SEPARATE FILE "SPREADSHEET_LOAD.JS"
// 23-JAN-23
					// RUNNING TRANSCRIPTION ON NEW MAP-KEYED OBJECTS
					// ALL INITIAL LTRS CONVERTED UC TO LC AT BEGINNING OF SCRIPT
					// LTR-CASE IS SAVED TO OBJ-PROP "UPPER" (Y/N)
// 25-JAN-23 // OPEN TBD
					// LINE ##138## // "tie" "tien" AND "tion" MUST RUN BEFORE "ie" AND "-e"
// 30-JAN-23
					// #TBD# LINK TO NEW QUERY-MODULE
// 20-FEB-23
					// REVISION QUERIES // MERGING
					// QUERIES INCLUDED ARE AS FROM LINE #59#
// 04-MAR-23
					// REMOVE TEMP STATISTIC COUNTERS
					// TBD PULLED FROM "INTERPHON"
// 11-MAR-23
					// FIXED MISSING "ST-" AND "SP-" IN 2ND PART OF COMPOSITES
					// (TAG "-" HAD NOT BEEN CHANGED TO "+" FOR COMPOUNDS LINE #317#)
					// ADDED "-" FOR PREFIXED PARTS LINE #296#
// 12-MAR-23
					// TAG CHANGED FROM "=...=" TO "<...>" FOR "zw" TO AVOID EDGE-CASES 
					// "=zw=e=ck=" (MISREAD AS INNER SCHWA "=e=") AND "=zw=er=ch=fell" (MISREAD AS INNER "=er=")
// THU 11-MAY-23
					// ADDED SYLLABLE COUNTER
// SAT 20-MAY-23
					// RE-TAGGED "=sp=" "=st=" with <sp> <st>
					// BECAUSE OF OVERLAP WIT "=ei=" AND "=au="
// SUN 21-MAY-23
					// ##TBD## HARDCODE LONG VOW "Ä" IN SOURCE (MARKER MAY CHANGE)





														// PART INTERMEDIATE CONVERSION TO PHONETICS

console.log("#INTERMEDIATE_PHONETICS# SAT 20-MAY-23\n\n");
										// ALL INTERMEDIATE TRANSCRIPTIONS IN "GRPHMS" ARE COPIED 
											// TO PROP "INTERPHON" IN SCRIPT "TEXTTOSPEECH_XSAMPA"
console.log(
`    __________________________________________________________
   |                           MEMO                           |
   | ARRAY "GRPHMS" IS USED TO GENERATE INTERMEDIATE PHONETIC |
   | MARK-UP PRODUCING PAIRS "LEXEM"-TO-"INTERPHON" FOR THE   |
   |  LEXICON THAT CAN BE SEARCHED QUICKER AND CONVERTED TO   |
   |           XSAMPA MORE EASILY (HUMAN READABLE)            |
   |__________________________________________________________|

`);

// UNITTESTS // REGISTERING HOMOGRAPHS
let tracker_variants = [];
let tracker_spstprefixed = [];
let tracker_spstsecpart = [];










function graphemeFormat() {

// ("GRPHMS" IS DE-SCOPED TO LOCAL) // KEEP GLOBAL FOR UNITTEST
// 		let grphms = [];
		console.log("....RUNNING....");
		console.log("GRAPHEME_FORMAT");

					// __________________________________________________________________________
															// PRE-PROCESS FOR KEY AND LEXEME
	for (const key of Lexicon.keys()) {																								// (NOTE) "LEXICON.VALUES" ALSO ITERATES BUT HAS NO MENTION ON MDN
  	//console.log(key);
  	let lexitem = Lexicon.get(key).lex;

								// IN LEXEME-PROP #KEEP# PARANTHESES (TAG = IRREG)
		lexitem = lexitem.replaceAll('(', '');
		lexitem = lexitem.replaceAll(')', '');
		lexitem = lexitem.toLowerCase();																								// (FOR PHONETIC TRANSCRIPTION) INITIAL TO LOWERCASE
															// COPY TO INTERMEDIATE ARRAY
  	grphms.push([key, lexitem]); 																										// KEEP FIXED KEY/VAL PAIRING
  	
// TEMP DEBUGGING // "RAW" VARIANT-COUNT
		if (lexitem.endsWith("1") || lexitem.endsWith("2") || lexitem.endsWith("3")) {
			tracker_variants.push(lexitem);
		}

  }

	//console.log("PRE-PROCESS GRPHMS", grphms) // WILL BE MUTATED



					// __________________________________________________________________________
														// TAG MULTI-CHAR GRAPHEMES 
														// WITH #INTERMEDIATE# PHONETIC MARKUP
														// FOR TRANSCRIPTION TO XSAMPA

																			// UNAMBIGUOUS 																// LINE #59#
// ai 	// UCLC																																			// IS CURRENTLY HARDCODED IN SOURCE
// au 	// UCLC
// äu 	// (UC)LC
// ei 	// UCLC
// eu 	// UCLC

// (NEVER INITIAL)
// ie 	// LC
// ck 	// LC
// ng 	// LC
// nk 	// LC

// qu 	// UCLC
// pf 	// UCLC
// ph 	// UCLC
// zw 	// UCLC // CHANGED "=...=" TO "<...>"

// POSITIONAL (INITIAL)
												// ###TBD### TAGGING OVERLAP(!) IN INTERPHON // REF #121# // SEE REF #302#
														// TYPE "=st=r=ei=·ten" WITH "=ei=
														// TYPE "=st=r=au==ch=" WITH "=au="
														// TYPE "=sp=r=ei=zen"WIT "=ei=" 															// (CURRENTLY NOT IN DISTRIBUTION)
													// USE "<>" (LIKE FOR <zw>)

													// REDO
													// "früher" (INTERPHON ZERSCHOSSEN)
													// "Unt<er>nehm<er>" (BOTH T-SCHWA)
// sp 	// UCLC
// st 	// UCLC
// POSITIONAL (ENDING)
// tie tien tion // LC

																				// NESTED
// ch 	// UCLC
// chs 	// LC
// sch 	// UCLC
// tsch // UCLC



// FIND MTBG AND BRACKET WITH MARKER "=...="
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^															
	for (let i = 0; i < grphms.length; i++) {

// 		if (grphms[i][1].includes('1') || grphms[i][1].includes('2') || grphms[i][1].includes('3')) {
// 			tracker_variants.push(grphms[i][1]);
// 		}

// "ei"																																								// (HARDCODE RARE "ai" IN SOURCE)
		if (grphms[i][1].includes('ei')) {
			grphms[i][1] = grphms[i][1].replaceAll('ei', '=ei=');
		}
// "eu"
		if (grphms[i][1].includes('eu')) {
			grphms[i][1] = grphms[i][1].replaceAll('eu', '=eu=');
		}


// "tie" "tien" "tion"
		if (grphms[i][1].endsWith('tie')) {
			//console.log(grphms[i][1]);
			grphms[i][1] = grphms[i][1].replaceAll('tie', '=tie=');												// "Tsi:@"
		}
		if (grphms[i][1].endsWith('tien')) {
			//console.log(grphms[i][1]);
			grphms[i][1] = grphms[i][1].replaceAll('tien', '=tien=');											// "Tsi:En"
		}
		if (grphms[i][1].endsWith('tion')) {
			//console.log(grphms[i][1]);
			grphms[i][1] = grphms[i][1].replaceAll('tion', '=tion=');											// "Tsi:o:n"
		}


// "ie"
// RUN #AFTER# "tie" WITH "AND NOT =tie"																						// RE-USE "ie"-MATCH IN SELECT-QUERY
		if (grphms[i][1].includes('ie')) {
			//console.log(grphms[i][1]);
			grphms[i][1] = grphms[i][1].replaceAll('ie', '=ie=');
		}

// "ck"
		if (grphms[i][1].includes('ck')) {
			grphms[i][1] = grphms[i][1].replaceAll('ck', '=ck=');
		}
// "au"
		if (grphms[i][1].includes('au')) {
			grphms[i][1] = grphms[i][1].replaceAll('au', '=au=');
		}
// "äu"
		if (grphms[i][1].includes('äu')) {
			grphms[i][1] = grphms[i][1].replaceAll('äu', '=äu=');
		}
// "qu"
		if (grphms[i][1].includes('qu')) {
			grphms[i][1] = grphms[i][1].replaceAll('qu', '=qu=');
		}

// "ng"
		if (grphms[i][1].includes('ng')) {
			grphms[i][1] = grphms[i][1].replaceAll('ng', '=ng=');
			//console.log(grphms[i][1]);
		}
// "nk"
		if (grphms[i][1].includes('nk')) {
			grphms[i][1] = grphms[i][1].replaceAll('nk', '=nk=');
			//console.log(grphms[i][1]);
		}

// "pf"
		if (grphms[i][1].includes('pf')) {
			grphms[i][1] = grphms[i][1].replaceAll('pf', '=pf=');
			//console.log(grphms[i][1]);
		}
// "ph"
		if (grphms[i][1].includes('ph')) {
			grphms[i][1] = grphms[i][1].replaceAll('ph', '=ph=');
			//console.log(grphms[i][1]);
		}
// "zw" // (PHONETIC SOFT "Ts[u]w")
		if (grphms[i][1].includes('zw')) {
			grphms[i][1] = grphms[i][1].replaceAll('zw', '<zw>');
			//console.log(grphms[i][1]);
		}


	} // END FOR
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




														// MUST BE PROCESSED IN THIS ORDER 
														// CH SCH CHS TSCH (DSCH)

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	for (let i = 0; i < grphms.length; i++) {

// "ch"
		if (grphms[i][1].includes('ch')) {
			grphms[i][1] = grphms[i][1].replaceAll('ch', '=ch=');														// "REPLACE_ALL" MUTATES LIVE ARRAY
		}

																	// ON SECOND PASS COMBINE
// "sch" // NOT "ssch"
		if (grphms[i][1].includes('s=ch')) {
			if (grphms[i][1].includes('ss=ch') === false) { 																// FIX "ssch" ("BIS=SCH=EN" -> "BISS=CH=EN")
				grphms[i][1] = grphms[i][1].replaceAll('s=ch', '=sch');
			}
		}


// "chs" // (NEVER (INITIAL) UPPERCASE)
// EXCLUDE PATTERN "CHST" 
		// FOR MONO-SYL "MACHST" "SPRICHST" "WACHST" (VERB "WACHEN") 
		// FOR ODD CASE "NÄCHS·TE"
		if (grphms[i][1].includes('ch=s') && grphms[i][1].includes('ch=st') === false && grphms[i][1].includes("ch=s·") === false) { // LINE #290#
			grphms[i][1] = grphms[i][1].replaceAll('ch=s', 'chs=');
		}

// IGNORE HYPHENATION // (PREVIOUSLY MISSED)
		// ("ACH·SE" ET AL) // (19-FEB-23)
		if (grphms[i][1].includes('ch=·s')) {
			grphms[i][1] = grphms[i][1].replaceAll('ch=·s', 'chs=');
		}

// RE-TAG SKIPPED EXCEPTIONS (LINE #290#) FROM ""CH=S" TO "CHS"
		// (DU/ER/SIE/ES) "WACHST2" (IHR) "WACHST22" (to wax)
		// (IHR) "WACHST1" (DU/ER/SIE/ES) "WÄCHST" (to grow)
		if (grphms[i][1].includes('wa=ch=st2') || grphms[i][1].includes('wa=ch=st1') || grphms[i][1].includes('wä=ch=st')) {
			//console.log("\\/\\/\\/\\/\\/\\/", grphms[i][1]);
			grphms[i][1] = grphms[i][1].replace("ch=s", "chs=");
		}


// "tsch"
		if (grphms[i][1].includes('t=sch')) { 																						// FIX "stsch" ("A=NG=S=TSCH=W=EI=ß" -> "A=NG=ST=SCH=W=EI=ß")
			if (grphms[i][1].includes('st=sch') === false) {
				grphms[i][1] = grphms[i][1].replaceAll('t=sch', '=tsch');
			}
		}
// IGNORE HYPHENATION // (PREVIOUSLY MISSED)
// "t·=sch"
// GRAPHEME VERSUS HYPENATION // SAT 04-MAR-23
		if (grphms[i][1].includes('t·=sch')) { 																						// PATTERN "ZWIT·SCHERN" "KLAT·SCHEN"
			grphms[i][1] = grphms[i][1].replace('t·=sch', '=tsch');													// (NO MULTIPLES ASSUMED)
		}


// TBD (RE-)COMBINE
// "D=SCH= -> ""=DSCH=" // INITIAL ONLY(?)

	} // END FOR
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^






														// POSITIONAL AT BEGINNING OF WORD // REF #302#
																					// SP ST

											// ###TBD### TAGGING OVERLAP(!) IN INTERPHON // SEE REF #121#

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	for (let i = 0; i < grphms.length; i++) {

// INITIAL CHECK FOR "INCLUDES SP/ST" (YES/NO)
// TO REDUCE TEST FREQUENCY
// # # # # # # # # # # # # # # # # # # # # # # # #
		if (grphms[i][1].includes('sp') || grphms[i][1].includes('st')) {
// # # # # # # # # # # # # # # # # # # # # # # # #

														// SIMPLE WORDS (PATTERN "WES·PE" IS EXCLUDED BY DOT)
											// INITIALLY MISSES "SP" IN COMPOUNDS ("BEI+=SP=IEL") // LINE ##282##
// "sp"
			if (grphms[i][1].startsWith('sp')) {
				grphms[i][1] = grphms[i][1].replaceAll('sp', '<sp>');															// (REPLACE_ALL) // NO KNOWN MULTIS SO FAR ("=SP=ASS=SP=UK")
			}
									//  (INITIALLY)MISSES "ST" IN COMPOUNDS ("FRÜH+=ST=Ü=CK=")
// "st"
			if (grphms[i][1].startsWith('st')) {										
				grphms[i][1] = grphms[i][1].replaceAll('st', '<st>');															// (REPLACE_ALL) // NO KNOWN MULTIS SO FAR ("=ST=ERN=ST=UNDE")
			}

																	// AFTER (ANY) PREFIX
			if (grphms[i][1].includes('-')) {																										// LINE #296#
				let splitn = grphms[i][1].split('-');

				if (splitn[1].startsWith('sp')) {
					grphms[i][1] = splitn[0].concat(splitn[1].replace('sp', '-<sp>'));							// RE-TAG AS PREFIX
					tracker_spstprefixed.push(grphms[i][1]);
				}
				if (splitn[1].startsWith('st')) {
					grphms[i][1] = splitn[0].concat(splitn[1].replace('st', '-<st>'));
					tracker_spstprefixed.push(grphms[i][1]);
				}
			} // IF PREFIX

											// POSITIONAL IN SECOND PART OF COMPOUND WORD
																			// #QUICKFIX# 
										// ASSUMING NO COMPS HAVE PREFIX IN SECOND PART
// FOR EXHAUSTIVE TREATMENT ADD "SP"/"ST" TO TEST-PATTERNS 
// IN SCRIPT "INTERMEDIATE_REDUCEDSYLBLS" FROM LINE #136# FF

			if (grphms[i][1].includes('+')) {																											// LINE #317#
				let splitn = grphms[i][1].split('+');

				if (splitn[1].startsWith('sp')) {
					grphms[i][1] = splitn[0].concat(splitn[1].replace('sp', '+<sp>'));								// RE-TAG AS COMPOSITE PART
					tracker_spstsecpart.push(grphms[i][1]);
				}
				if (splitn[1].startsWith('st')) {
					grphms[i][1] = splitn[0].concat(splitn[1].replace('st', '+<st>'));
					tracker_spstsecpart.push(grphms[i][1]);
				}
			} // IF COMPOUND

// # # # # # # # # # # # # # # # # # # # # # # # #
		} // IF INCLUDES SP/ST
// # # # # # # # # # # # # # # # # # # # # # # # #

	} // FOR
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



	console.log("= = = = = = = NUM VARS (IN PHONETICS) = = = = = = = =");
	console.log(tracker_variants);
	console.log("= = = = = =  PREFIX SP/ST (IN PHONETICS)  = = = = = =");
	console.log(tracker_spstprefixed);
	console.log("= = = = = = 2ND PART SP/ST (IN PHONETICS) = = = = = =");
	console.log(tracker_spstsecpart);


					// __________________________________________________________________________
																			// NEXT CALL
// RUN ALL R-REDUCTIONS
// "GRPHM" IS NOW POPULATED WITH (MOST) INTERMEDIATE TRANSCRIPTIONS
// "TAG_REDUCTIONS" RUNS THE MORE DIFFICULT "R"-VARIANTS AND ENDINGS
// ("GRPHMS" NOW NEEDED AS ARG)
		tagReductions(grphms);


					// __________________________________________________________________________
													// NEXT CALL // MOVED AFTER "TAG_REDUCTIONS"
// TRANSCRIBE MARKUP TO X-SAMPA FORMAT
// ##TEMP## (PASSING TRHU)
// CONVERT THE "INTERPHON"-MARKUP TO PROPER X-SAMPA FOR PHONETIC TTS
// (EG "=-e=" TO "@" FOR SCHWA)
		//Xformat(grphms);

	

} // END FORMAT_GRAPHEMES

																				// END FUNCTION

