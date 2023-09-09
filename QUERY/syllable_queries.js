// THU 11-MAY-23
// SIZE QUERY
// TUE 23-MAY-23
		// SEPARATE SCRIPT
		// (!)ALSO USING GLOBAL SUBSTITUTION-CONSTANTS
// FRI 26-MAY-23
		// UNITTEST SYLLABLES





console.log("#SYLLABLE_QUERIES# FRI 26-MAY-23\n\n");
// RETURNS TOTAL 2243 OF 2260 (MINUS 17 MEHRWORT) // 26-MAY-23

// SEE EXAMPLE "SICH UM·ZIE·HEN" IN QUERY "3 SYLLABLES"
// "ICH_BIN" IN "1 SYLLABLE"
console.log(
`    __________________________________________________________
   |                           MEMO                           |
   |    QUERIES "SYLLABLES" PARSE PROP "SYLLS" EX PARTICLES   |
   |  LISTING IS BOTH "PRTCL" AND "PAYLD" BY ALPHA OF PAYLOAD |
   |__________________________________________________________|

`);






// (UNITTEST)
var particlearray = [];


// ———————————————————————————————————————————————————————————————————————————————–––––––––––––––
function sizeQuery(arg) {

console.log("NEW SIZE QUERY \"", arg, "\"");
// CLEAR SEARCHAFFIX FOR ANY NEXT CASE
searchaffix = "";
// IS NOT A STRING-QUERY
qtype = "";

let matchstr = "";																																	// VARIABLE ALSO USED FOR LOG
let results = 0;
let msg = "";


// "NONE" // NO SELECTION (RE)SET
	if (arg === "none") {
		displayResults([], "", "NO SELECTION", []);																			// FUNCTION IN FILE "QUERY_INTERFACE" EXPECTS RESULTS #ARRAY#(!)
	}
																	


// (UNITTEST)
for (const key of Lexicon.keys()) {
let ptcl = Lexicon.get(key).MINIFLEX.particle;
	if (ptcl) {
		particlearray.push([Lexicon.get(key).SYLLS, Lexicon.get(key)]);
	}
}
// RETURNS 143 // 26-MAY-23
//console.log(particlearray);





// --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
// OPTIONS "SHOW SYLLABLES"
// SYLLABLE COUNT 1 TO 3 AND LARGER ("4")

	if (arg === 'syll1') {
		let syll1arr = [];
		for (const key of Lexicon.keys()) {
  		if (key.includes(' ')) { 																											// DO NOT SEARCH MEHRWORTAUSDRUCK
  			continue;
  		} else {
				let num = Lexicon.get(key).SYLLS; 																					// COUNT IS	GENERATED FROM TAGS BY OBJ-METHOD
  			if (num === 1) {
					let match = Lexicon.get(key).lex;
					if (match.includes("_")) {
						let split = match.split("_");
						syll1arr.push(new Result(split[0], split[1], SYLLTOVIEW, key)); // SUBS FOR VIEW
					} else {
						syll1arr.push(new Result("", match, SYLLTOVIEW, key));
					}
  			}
  		}
  	} // FOR
		let msg = 'UNITTEST LOG "particlearray"';
		let rescount = syll1arr.length;
		displayResults(syll1arr, rescount, msg, [ZERO, ZERO, ZERO]);
	}

	if (arg === 'syll2') {
		let syll2arr = [];
		for (const key of Lexicon.keys()) {
  		if (key.includes(' ')) { 																										// NOT MEHRWORT
  			continue;
  		} else {
				let num = Lexicon.get(key).SYLLS;
  			if (num === 2) {
					let match = Lexicon.get(key).lex;
					if (match.includes("_")) {
						let split = match.split("_");
						syll2arr.push(new Result(split[0], split[1], SYLLTOVIEW, key));
					} else {
						syll2arr.push(new Result("", match, SYLLTOVIEW, key));
					}
  			}
  		}
  	} // FOR
		let msg = 'UNITTEST LOG "particlearray"';
		let rescount = syll2arr.length;
		displayResults(syll2arr, rescount, msg, [ZERO, ZERO, ZERO]);
	}

	if (arg === 'syll3') {
		let syll3arr = [];
		for (const key of Lexicon.keys()) {
  		if (key.includes(' ')) { 																										// NOT MEHRWORT
  			continue;
  		} else {
				let num = Lexicon.get(key).SYLLS;
  			if (num === 3) {
					let match = Lexicon.get(key).lex;
					if (match.includes("_")) {
						let split = match.split("_");
						syll3arr.push(new Result(split[0], split[1], SYLLTOVIEW, key));
					} else {
						syll3arr.push(new Result("", match, SYLLTOVIEW, key));
					}
  			}
  		}
  	} // FOR
		let msg = 'UNITTEST LOG "particlearray"';
		let rescount = syll3arr.length;
		displayResults(syll3arr, rescount, msg, [ZERO, ZERO, ZERO]);
	}

	if (arg === 'syll4') {
		let syll4arr = [];
		for (const key of Lexicon.keys()) {
  		if (key.includes(' ')) { 																										// NOT MEHRWORT
  			continue;
  		} else {
				let num = Lexicon.get(key).SYLLS;
  			if (num > 3) {
					let match = Lexicon.get(key).lex;
					if (match.includes("_")) {
						let split = match.split("_");
						syll4arr.push(new Result(split[0], split[1], SYLLTOVIEW, key));
					} else {
						syll4arr.push(new Result("", match, SYLLTOVIEW, key));
					}
  			}
  		}
  	} // FOR
		let msg = 'UNITTEST LOG "particlearray"';
		let rescount = syll4arr.length;
		displayResults(syll4arr, rescount, msg, [ZERO, ZERO, ZERO]);
	}


} // ALL QUERIES SYLLABLES


