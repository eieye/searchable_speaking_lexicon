// WED 08-FEB-23
// SCRIPT SPLIT INTO "STRING QUERIES" AND "SELECT QUERIES"
// CALLING FUNCTION "FORMAT_RESULTS" IN FILE "QUERY_INTERFACE"
// MON 13-FEB-23
// ALL FILTER-FUNCTIONS ARE "ON-DEMAND" (AND STILL PRETTY FAST)
// FRI 03-MAR-23
// NEW GROUPING SEARCHES 
// ALL "DISTRIBUTION QUERIES" MOVED TO NEW SCRIPT-FILE
// THU 11-MAY-23
// CNTD ADD SYLLABLE COUNTER
// FRI 26-MAY-23
		// (NEW PROP "KEY" ALL OBJECTS)





																	// PART "PHONETIC_QUERIES"

console.log("#PHONETIC_QUERIES# WED 31-MAY-23\n\n");
// DATA 2233 ENTRIES // 12-MAR-23

// UNITTEST
	var rejected_vokr = [];









function phoneticQuery(arg) {
	console.log("NEW PHONETIC QUERY \"", arg, "\"");

// IS NOT A STRING-QUERY
qtype = "";

// ..............................................................................................
																					// NO SELECTION
// (RE)SET
// FUNCTION IN SCRIPT "QUERY_INTERFACE" EXPECTS #ARRAY# (OF RESULT-OBJS)
	if (arg === "none") {
		displayResults([], "", "NO SELECTION", []);
	}


// ..............................................................................................
																		// PHONETICS: MTBG: (1) CH
																		// (XSAMPA "C" ICH "x" ACH)
	if (arg === "ch") {
		let charr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=ch="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;  				// (DONT SEARCH IN PARTICLES)
  		if (searchin.includes('=ch=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				charr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				charr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = charr.length; // RETURNS 187 // 12-MAR-23
		displayResults(charr, rescount, msg, [ZERO, SPACE, ZERO]);
	}
// STRING-QUERY "CH" WILL RETURN 379 // 12-MAR-23



// ..............................................................................................
																		// PHONETICS: MTBG: (2) SCH
	if (arg === "sch") {
		let scharr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=sch="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;
  		if (searchin.includes('=sch=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				scharr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				scharr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = scharr.length; // RETURNS 164 // 12-MAR-23
		displayResults(scharr, rescount, msg, [ZERO, SPACE, ZERO]);
	}



// ..............................................................................................
																		// PHONETICS: MTBG: (3) TSCH
	if (arg === "tsch") {
		let tscharr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=tsch="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;
  		if (searchin.includes('=tsch=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				tscharr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				tscharr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = tscharr.length; // RETURNS 17 // 12-MAR-23
		displayResults(tscharr, rescount, msg, [ZERO, SPACE, ZERO]);
	}



// ..............................................................................................
																		// PHONETICS: MTBG: (4) CHS
	if (arg === "chs") {
		let chsarr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=chs="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;
  		if (searchin.includes('=chs=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				chsarr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				chsarr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = chsarr.length; // RETURNS 20 // 12-MAR-23
		displayResults(chsarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}


// ..............................................................................................
															// PHONETICS: REDUKTION: (5) SCHWA
																		// (IPA ROTATED "e")
	if (arg === "schwa") {
		let schwaarr = [];
		for (const key of Lexicon.keys()) {
// EXCLUDE SCHWA "<e>" OF PREFIXES
			if (Lexicon.get(key).INTERPHON.includes('=e=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				schwaarr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				schwaarr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '("be-" and "ge-" not included as schwa)';
		let rescount = schwaarr.length; // RETURNS 400 // 12-MAR-23
		displayResults(schwaarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}



// ..............................................................................................
																		// PHONETICS: REDUKTION: (6) TIEFSCHWA
																		// (IPA ROTATED "a")
	if (arg === "tschwa") {
		let tschwaarr = [];
		for (const key of Lexicon.keys()) {
			if (Lexicon.get(key).INTERPHON.includes('=er=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				tschwaarr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				tschwaarr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}

		let msg = '';
		let rescount = tschwaarr.length; // RETURNS 123 // 12-MAR-23
		displayResults(tschwaarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}



// ..............................................................................................
																		// PHONETICS: REDUKTION: (7) -ERN
																		// (IPA ROTATED "a"n)
	if (arg === "ern") {
		let ernarr = [];
		for (const key of Lexicon.keys()) {
			if (Lexicon.get(key).INTERPHON.includes('=ern=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				ernarr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				ernarr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}

		let msg = '';
		let rescount = ernarr.length; // RETURNS 20 // 12-MAR-23
		displayResults(ernarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}



// ..............................................................................................
														// PHONETICS: REDUKTION: (8) VOKR // "Kern"
														// (NICHT-SILBISCHES) VOKALISIERTES "R"
															// (IPA FLIPPED "R")
															// PULL FROM INTERPHON // DONT SEARCH IN PARTICLE

															// ###########################################
															// ##TBD## // QUERY RESTURNS DBLS FOR
// "bevor" "Gefahr" "ungefähr" "Verkehr" "(ich/er/sie/es) verlor")

	if (arg === "vokr") {
		let vokrarr = [];
		let interphon;
		let searchpart;
		let payload;

		for (const key of Lexicon.keys()) {
			interphon = Lexicon.get(key).INTERPHON;
			if (interphon.includes('=r=')) {
				payload = key;
				searchpart = interphon;

// NO SEARCH IN AFFIXES
				if (interphon.includes("-")) {
													// REMOVE ALL REPEAT OCCURRANCES OF PREFIXES
													// BUT INCLUDE PREFIX ITSELF
														// "er" "her" "ur" "ver" "vor" "zer"
					searchpart = interphon.split('-')[1];
					if (searchpart) { // HAS SECOND PART
						if (searchpart.includes('=r=')) {
							vokrarr.push(new Result("", key, KEYTOVIEW, key)); 																													// FULL WORD IF SECOND PART MATCHES
						}
					} else {
						vokrarr.push(new Result("", key, KEYTOVIEW, key)); // NAKED PREFIX
					}
				}

// NO SEARCH IN PARTICLE
				if (interphon.includes('_')) {
					searchpart = interphon.split('_')[1];
					payload = key.split('_')[1];
				}

																		// #TBD# REVIEW 200523
																		// SOME SLIP THRU
				if (searchpart.includes('=r=')) {
					//vokrarr.push([payload]);
					vokrarr.push(new Result("", payload, KEYTOVIEW, key));
				} else {
					rejected_vokr.push([interphon]); // (ELSE NOTHING) ##UNITTEST##
				}
  		}
		}

		let msg = `PREFIXES (er- her- ur- ver- vor- zer-) ARE DELIBERATELXY NOT MATCHED.<br><br>
UNITTEST CHECK VAR "rejected_vokr"`; // ###TBD## ADD LF IN FORMATTER
		let rescount = vokrarr.length;
		displayResults(vokrarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}






// ..............................................................................................
																	// PHONETICS: PREFIX: BE- (SCHWA)
	if (arg === "be") {
		let bearr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=chs="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;
  		if (searchin.includes('b<e>-')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				bearr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				bearr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = bearr.length; // RETURNS 21 // DATA 12-MAR-23
		displayResults(bearr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// NEW // MON 06-MAR-23
// ..............................................................................................
																	// PHONETICS: PREFIX: BE- (SCHWA)
	if (arg === "ge") {
		let gearr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=chs="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;
  		if (searchin.includes('g<e>-')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				gearr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				gearr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = gearr.length; // RETURNS 36 // DATA 12-MAR-23
		displayResults(gearr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// ..............................................................................................
														// PHONETICS: PGK/ORTHO: (10) DBL VOWEL (NOT "IE")
														// CUSTOM SORTING AND FORMATTING INCLUDED
	if (arg === "dblvowel") {
		console.log("\n\n\n");
		console.log("DBL VOWEL (NOT IE)");
		let dblvowarr = [];
// GET MATCH IN LEXEME
		for (const key of Lexicon.keys()) {
			let search = Lexicon.get(key).lex.toLowerCase();														// SEARCH PROP "LEX" // PATTERN "AA" "EE" "OO"
  		if (search.includes('aa')) {

																														// #######################################
																															// ##CONTINUE## REPLAY ARR WITH OBJ
  											// REMOVED FIRST INDEX (SEARCH STRING)
  			//dblvowarr.push(['aa', key]);
  			dblvowarr.push(new Result("aa", key, KEYTOVIEW, key));
  		}
  		if (search.includes('ee')) {
  			//dblvowarr.push(['ee', key]);
  			dblvowarr.push(new Result("ee", key, KEYTOVIEW, key));
  		}
  		if (search.includes('oo')) {
  			//dblvowarr.push(['oo', key]); // ALL CASES // COL 1-1-0
  			dblvowarr.push(new Result("oo", key, KEYTOVIEW, key));
  		}
		}





// #TBD# // SORT WORDS BY ALPHA ONLY #IGNORE# CASE
// (MUST BE CONVERTED TO ALL LC FOR SORTING THEN CASE-RESTORED)

// SNIPPET MDN
/*
// sort by name
items.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
*/

		dblvowarr.sort();
		let msg = '(not showing "ie" and there is no "uu" in German)';
		let rescount = dblvowarr.length;  // RETURNS 34 // 12-MAR-23
		displayResults(dblvowarr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// ..............................................................................................
																	// PHONETICS: PGK/ORTHO: (11) LONG "IE"
// FROM "INTERPHON"-PROP
	if (arg === "longie") {
		let longiearr = [];
		for (const key of Lexicon.keys()) {
			let searchin = Lexicon.get(key).INTERPHON;																								// SEARCH PROP PATTERN "=IE="
			searchin.includes('_') ? searchin = searchin.split('_')[1] : searchin = searchin;  				// EXLUDE PARTICLES
  		if (searchin.includes('=ie=')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				longiearr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				longiearr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		//longiearr.sort(); 																													// ##TBD## IF SORT THEN BY WORD (NOT PARTICLE)
		let msg = '(eigentl. Schreibung für "ii")';
		let rescount = longiearr.length;  // RETURNS 127 // 12-MAR-23
		displayResults(longiearr, rescount, msg, [ZERO, SPACE, ZERO]);
	}




// ..............................................................................................
												// PHONETICS: PGK/ORTHO: (12) GETRENNTES "IE" (HIAT)
																	// TAGGED WITH "i)'e" IN DATA SOURCE
	if (arg === "hiatie") {
		let hiatiearr = [];
								// (MATCH IN "LEX" TO EXCLUDE (RARE) SYLL-SPLIT OF VOWELS "I-E")
		for (const key of Lexicon.keys()) {
			let search = Lexicon.get(key).lex.toLowerCase();														// SEARCH PROP "LEX" // PATTERN "I'E"
  		if (search.includes("'e")) {
  			// (NEVER IN PARTICLES)
				if (key.includes('_')) {
					let split = key.split('_');
  				hiatiearr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				hiatiearr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		hiatiearr.sort();
		let msg = 'GETRENNT GESPROCHENES "IE" (SILBISCH)';
		let rescount = hiatiearr.length;  // RETURNS 20 // 12-MAR-23
		displayResults(hiatiearr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// ..............................................................................................
													// PHONETICS: PGK/ORTHO: (13) SILBENTRENNENDES H
// #TBD# // NEW TAG IN DATA SOURCE ("|h|" PIPE?)
// USE EXISTING "·" (?)

	if (arg === "hiath") {
		let hiatharr = [];
/*
		for (const key of Lexicon.keys()) {
  		if (Lexicon.get(key).INTERPHON.includes('=h=')) {			// NOT YET IMPLEMENTED IN PARSER
				if (key.includes('_')) {
					let split = key.split('_');
  				hiatharr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				hiatharr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
*/
		let msg = '#TBD# SILBENTRENNENDES "H"';
		let rescount = hiatharr.length;
		displayResults(hiatharr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// ..............................................................................................
																		// PHONETICS: PGK/ORTHO: Sp
	if (arg === "sp") {
		let sparr = [];
		for (const key of Lexicon.keys()) {
  		if (Lexicon.get(key).INTERPHON.includes('<sp>')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				sparr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				sparr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = sparr.length; // RETURNS 42 // 12-MAR-23
		displayResults(sparr, rescount, msg, [ZERO, SPACE, ZERO]);
	}





// ..............................................................................................
																		// PHONETICS: PGK/ORTHO: ST
	if (arg === "st") {
		let starr = [];
		for (const key of Lexicon.keys()) {
  		if (Lexicon.get(key).INTERPHON.includes('<st>')) {
				if (key.includes('_')) {
					let split = key.split('_');
  				starr.push(new Result(split[0], split[1], KEYTOVIEW, key));
  			} else {
  				starr.push(new Result("", key, KEYTOVIEW, key));
  			}
  		}
		}
		let msg = '';
		let rescount = starr.length; // RETURNS 93 // 12-MAR-23
		displayResults(starr, rescount, msg, [ZERO, SPACE, ZERO]);
	}




} // ALL PHONETIC_QUERIES







