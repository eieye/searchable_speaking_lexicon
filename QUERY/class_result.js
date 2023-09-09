// WED 31-MAY-23
// SEPARATED COMMON CLASS QUERY RESULTS





															// STRING SUBSTITUTIONS IN QUERIES
// =========================================================================================
														// ########## TEMP ########## // REF #87#
									// IF POSSIBLE DONT PERMANENTLY SAVE "SUBS" IN OBJECT // JUST PARSE THE STRING
									// #CONTINUE# FIND MAXIMUM COMMON FORMAT FOR ALL RESULT-TYPES 
									// (FOR PARSING "WORD" FROM DIFFERENT PROPERTES)

// SHORT PARSING FROM KEY TO HTML
	const KEYTOVIEW = [
		["1", "<sup>1</sup>"],
		["2", "<sup>2</sup>"],
		["3", "<sup>3</sup>"],
		["(", "<i>"],
		[")", "</i>"],
		["-", ""],		// HYPHEN AFFIX REMOVE
		["*", "-"],		// HYPHEN COMPOUND PRESERVE
		["_", " "] 		// LODASH (REMOVE AFTER SPLIT)
	];


// FULL PARSING FROM LEXEME TO HTML
// IN "IRREGULAR" "SYLLABLES"
	const LEXTOVIEW = [
		["_", " "], 	// LODASH (REMOVE AFTER SPLIT)
		["-", ""],		// AFFIXED (MORPHEME)
		["+", ""],		// COMPOUND NOUN
																// #TBD# // USE COMMON LEX/SYLL
		["|", ""],									// #TBD# ADD IN METHOD // SYLLABIC VOWEL (INITIAL)
		["·", ""],									// #TBD# ADD IN METHOD // SYLLABLE-BREAK
		["&", " "],		// MEHRWORT
		["*", "-"], 	// ISOLATED AFFIX (KEEP HYPHEN)
		["'", ""],		// HIAT-TAG (NOW ")'")
// STYLE ITALIC
		["(", "<i>"],
		[")", "</i>"],
// TO_SUPERSCRIPT
		["1", "<sup>1</sup>"],
		["2", "<sup>2</sup>"],
		["3", "<sup>3</sup>"]
	];


// LIKE "LEXTOVIEW" BUT KEEP SYLL-TAGS
	const SYLLTOVIEW = [
		["_", " "], // LODASH REMOVE AFTER SPLIT
		["-", "·"], // AFFIX-TO-SYLLABLE
		["+", "·"],
		["&", " "],
		["*", "-"],
		["'", "·"], // HIAT/TREMA-TO-SYLLABLE
// STYLE ITALIC
		["(", "<i>"],
		[")", "</i>"],
// TO_SUPERSCRIPT
		["1", "<sup>1</sup>"],
		["2", "<sup>2</sup>"],
		["3", "<sup>3</sup>"]
	];







// 2-COLUMN (SINGLE ITEM) "PARTICLE" "PAYLOAD"
												// ADDED "LEXKEY"=KEY TO PRESERVE ACCESS TO LEX
										// KEY NEEDS "_" AND UPPER_CASE FOR GETTER "LEXICON_GET('')"
// =========================================================================================

						// ##FOR LATER REVIEW## CONSTRUCTOR COULD ALSO PASS FULL LEXICON-OBJ BY KEY
						// AND DRAW ON PROP "MINIFLEX" FOR "PARTICLE"/"FLEXED FORM"/"PARENT"

class Result {
  constructor(particle, word, SUBS, LEXKEY) {
    this.SUBS = SUBS;
    this.LEXKEY = LEXKEY; 																											
    this.particle = particle;
    this.particlelink = this.detagpartlink(particle);
    this.word = this.toView(word);
    this.wordlink = this.detagwordlink(word);
  }

	toView(word) {
		let reform = word;
		this.SUBS.forEach(pair => { // REF #87# // EXTERNALLY DEFINED SUBSTITUTIONS ARE USED ON EACH WORD
			if (reform.includes(pair[0])) {
				reform = reform.replaceAll(pair[0], pair[1]);
			}
		});
// REMOVE XSAMPA (ONLY IN QUERIES "SYLLS" AND "IRREG")
		if(reform.includes('=')) {
			reform = stripNonAlpha(reform); 																								// EXT FUNCTION IN "CSV_LOAD_TO_OBJ" REF #429#
		}
		return reform;
	}

  detagpartlink(particle) {
  	if(particle) {																																		// NO PARTICLE ARG MAY BE PASSED
  		let temp = particle;
			const PRTCLSUBS = [
				["/" , "-"], // REPLACE
				[" " , "-"], // MEHRWORT (FROM KEY WITH " ")
				["*", ""] // ISOLATED PREFIX
			];
			PRTCLSUBS.forEach(pair => {
				if (temp.includes(pair[0])) {
					temp = temp.replaceAll(pair[0], pair[1]);
				}
			});
			//console.log(`./DATA/PARTICLES/${temp}.mp3`);
			return `./DATA/PARTICLES/${temp}.mp3`;
		}
  }

	detagwordlink(string) {
		let temp = string.toLowerCase();																									// REDUNDANT FOR VERBS BUT MAKES CLONE
		const PAYLDSUBS = [
// GER ENTITIES
			["ä", "ae"],
			["ö", "oe"],
			["ü", "ue"],
			["ß", "ss"],
// RARE
			["+", ""], 	//COMPOUNDS
			["-", ""], 	// REMOVE HYPHENATED				 																				// RARE NOUNS ("U-BAHN")
			["*", ""], 	// ISOLATED PREFIX
			[" ", "-"],	// MEHRWORT (FROM KEY WITH " ")
									// ###TBD### // THIS IS NOT IN (MAJORITY) "KEY"-QUERIES
															// MOVE TO ADDITIONAL METHOD FOR EXCEPTIONS (?)
 // LEXEME-TO-LINK
			["·", ""],
			["|", ""],
			["'", ""],
			["(", ""],
			[")", ""]
		];
// (UNITTEST)
// (##TBD## CAN OR CAN NOT BE ISOLATED)
// if (temp.includes("·")) {
// 	console.log("DETAGWORDLINK", temp)
// }

		PAYLDSUBS.forEach(pair => {
			if (temp.includes(pair[0])) {
				temp = temp.replaceAll(pair[0], pair[1]);
			}
		});
// REMOVE XSAMPA FROM LINK (ONLY IN QUERIES "SYLLS" AND "IRREG")
		if(temp.includes('=')) {
			temp = stripNonAlpha(temp); 																										// EXT FUNCTION IN "CSV_LOAD_TO_OBJ" REF #429#
		}
		//console.log(`./DATA/AUDIO/${temp}.mp3`);
		return `./DATA/AUDIO/${temp}.mp3`;
	}

} // RESULT






// 4-COLUMN "RANK" "PARTICLE" "PAYLOAD" "EXTRA (SYLLABLES)"
// FORMAT "100 MOST FREQUENT"
													// ALSO USED FOR "SHOW ALL"
// =========================================================================================

class Rank extends Result {

	constructor(particle, word, extra, rank, SUBS, LEXKEY) {
		super(particle, word, SUBS, LEXKEY);
		this.extra = this.extraform(extra); 																							// (NO LINK ON EXTRA)
		this.rank = rank;
		this.ranklink = `./DATA/NUMBERS/num${this.unpad(rank)}.mp3`;
		//this.SUBS = SUBS; // DBL USE
	}

	extraform(extra) {
		this.SUBS.forEach(pair => { // SYLLTOVIEW
			if (extra.includes(pair[0])) {
				extra = extra.replaceAll(pair[0], pair[1]);
			}
		});
		return extra;
	}

	unpad(rank) {
		if (rank) {								// ##TEMP## USING OBJ ALSO FOR 3-COLUMN "ANLAUTE"
			let num = rank.toString(); // (CLONE)
			while (num[0] === '0') {
				num = num.replace('0', '');
			}
			return num;
		}
	}

} // RANK


