															// PHONEME TO X-SAMPA TRANSCRIPTION
// ALL #MULTI#-CHAR GRAPHEMES (MTBG) ARE CONVERTED IN "GFORMAT"
// ALL #SINGLES# (DEFAULTS) ARE CONVERTED IN SCRIPT "XFORMAT"


// 22-JAN-23
// THIS IS A SEPARATE LOAD-SCRIPT TO IMPORT FULL LEXEM-DATA INTO "WORD"-OBJECT
// 25-JAN-23
// TEMPORARY FORK FOR VANILLA AND IRREGULAR PRONUNCIATION ("LERNWÖRTER")
// "IRREGULARS" TO BE PARSED SEPARATELY (AND LATER)
// 30-JAN-23
// NEW DEFINITION FOR SOME OBJ-FIELDS
// ADAPTED EXCEL-SOURCE (30-JAN-23)
						// USE ";" (",") IF EXPORTED FROM EXCEL (MAC)
						// ("SAVE AS KOMMAGETRENNTE WERTE (CSV)" GETS SAVED WITH ";")
						// RETURNS MUST BE SET (FROM "WESTERN MAC_OS ROMAN") TO "UNIX/LF" ("\n") 				// BBEDIT
						// ENCODING MUST BE SET (FROM "MAC_OS LEGACY") TO "UTF-8" 											// BBEDIT
// TUE 07-FEB-23
						// FOR MAP-KEYS #STRIPPING# ALL NON-ALPHA CHARS BUT SAVING #WITH# PARTICLES
						// EXCLUDED PARTICLES IN (SELECT) QUERY "ALL" 
						// DIS-ABLE (INPUT) QUERY "" (EMPTY STRING)
// SAT 11-FEB-23
						// ADDED FIELD "GEN(DER)NUM(ERUS) TO CLASS
// SUN 12-FEB-23
						// (TEST PERFORMED WITH CORRUPTED COLUMS)
						// UNDER CERTAIN CONDITIONS HANGS UP ON "COL 21 = UNDEF" (IF ONLY LATER CELLS >21 ARE DESTROYED?)
									// PROBABLY B/C FUNCTION "TO_LOWER_CASE" CANNOT RETURN ANYTHING
						// IF EARLIER CELLS (<21) ARE MISSING SEEMS FAULT TOLERANT
// ##TBD## (FUTURE) 
// ADD AT LEAST AN ERROR TEST FOR IMPORT-ROW HAS CORRECT LENGTH
// (NUMBER OF COLS COULD BE STATED IN FILENAME OR IN FIRST LINE OF SPREADSHEET)

// THU 11-MAY-23
// ADDED SYLLABLE COUNTER
// SUN 14-MAY-23
// DIRECTLY IMPORT DATA PER FETCH-REQUEST
// MON 15-MAY-23
// PREVENT MULTIPLE LOAD OF LEXICON DATA
// (FROM INFO-BOX AND UI)
// SUN 21-MAY-23
// SPLIT FUNCTION "STRIP_NON_ALPHA" TO MOVE PART TO
		// NEW DEFERRED "REMOVE_DELIMITERS" TO PRESERVE FOR QUERY "SYLLABLE MARKERS"
		// HARDCODED LONG (IRREG) VOW "Ä=E:" IN SOURCE (MARKER MAY CHANGE)
// FRI 26-MAY-23
		// ##TBD## RE-CODE "STRIP_NON_ALPHA"
		// (HARDCODED XSAMPA IN LEXEME) // REF #429#






console.log("#CSV_LOAD_TO_OBJ# FRI 26-MAY-23\n\n");


// GLOBAL
	var loaded = false;
	var fileimport = "";
  let csv_import_raw;

	let Lexicon = new Map(); 																															// LEXICON ENTRIES
				//console.log(Lexicon.size); // ZERO
	var lexentries = "(not loaded)";
// 			INTERMEDIATE CONVERSION TO PHONETICS
	var grphms = [];
			// UNITTEST // LOG STRAY COMMENTS (EMPTY ROWS)
	let straycom = [];








																				    // CLASS
// ==============================================================================================
// "LEXEME"
	class Lexeme {
																				// COMPUTED DATA
// ==============================================================================================
// SAVE ORIGINAL CAPITALIZATION
		UPPER;																																						// 1=UPPER 0==LOWER
// METHOD "SET_ARTICLE" 																															// EXPAND FROM (SHORTHAND) PROP "SPEECHPART"
		ARTICLE;
																			// ##TEMP## TO BE CONTINUED
// STORE (FINAL XSAMPA) TRANSCRIPTION FOR TTS
		XSAMPA;
// STORE (INTERMEDIATE PHONETIC) GRAPHEME-TAGGING
		INTERPHON;
															// #TEMP# (ADD ALSO FROM PROP "SPEECHPART")
// FLEX-TABLE 																																				// ADD. GRAMMATICAL SCHEMAS FROM COL21
		MINIFLEX = {
			particle: "",
			flexedform: "",
			parent: ""
		};
// ROOM FOR TRANSLATION(S) // #TBD# ADD COLUMNS
		LANG = {
			de: "",
			en: "",
			fas: "",																																				// FARSI/DARI
			arb: "",																																				// MOD. STAND. ARABIC
			ukr: ""																																					// UKRAINIAN
		};
// ### NEW FIELD ### // 11-MAY-23
		SYLLS;
// PARTS TAGGED WITH PARENTH PROCESS TO HTML-TAGS FOR ITALIC STYLE
		IRRSPELL;
															// #TBD# (FUTURE EXTENSION) DAZ-A1 LEVEL
// PLURALBILDUNG
		PLUBILD = {
			umlaut : "", // EG "U->Ü" (Hüte)
			postfix : ""	// EG "-N" (FEMALE ON "_E") // "-ER" (MASK)
		}


																					// CONSTRUCTOR
// ==============================================================================================
		constructor(data) {
// ALPHA-SORT
			this.basechar = data[0]; 																			 									// AUTO BY "MAP" DATA-TYPE
					//  _______________________________________________________________________
					// | 																 																 			 |
																				// ##CONTINUE##
																		// PROPBABLY MOSTLY REDUNDANT
// VOWEL-LENGTH WILL BE CODED TO XSAMPA
// ALL IDENTIFIED ALGORITHMICALLY
		// EXCEPT INITIAL LONG_VOW // TAGGED ":"
		// SILBENTRENNENDES "-H-" // FLAG IN 
			this.vowlong = data[1];
			this.vowshort = data[2];
			this.cluster = data[3];																													// consonant cluster
			this.cclong = data[4];																													// consonant cluster long
			this.ccshort = data[5];
					// |_______________________________________________________________________|

// TBD (MOVE AFTER COL8)
			this.rank = data[6];																														// frequent (function) words

																				// ##IMPORTANT##
// "LEX" *MUST* ABSOLUTELY PRESERVE UCLC AND #ALL# TAGS
			this.lex = data[7];																															// (base) lexeme
// SOURCE
			this.flag = data[8];																														// "COLLECTION" (SPECIAL FLAGS) // WAS "ANLAUTWORT"
			this.frequentbb = data[9];																											// listed in dict as frequent/function words for BB
			this.frequentnrw = data[10];																										// listed in dict as function word for NRW
			this.dictbb12 = data[11];																												// in Grundwortschatz BB 1-2
			this.dictbb34 = data[12];																												// in Grundwortschatz BB 3-4
			this.dictnrw = data[13];																												// in Grundwortschatz NRW
			this.own = data[14];																														// own addition (word for pattern representation)
// ("IS CHILD OF")
			this.parent = data[15];
					//  _______________________________________________________________________
					// | 																 																 			 |
																				// ##CONTINUE##
									// DEL COL 16-20 // THIS IS EASIER TO FILTER WITH STRING.INCLUDES
											// REVIEW AND ADD (FIXED) SEARCH_STRINGS IF NEEDED
			this.reduction = data[16];																												// Reduktionssilbe (Ende)
			this.umlaut = data[17];
			this.secondary = data[18];																												// secondary grapheme (Inlaut/Auslaut)
			this.endmutation = data[19];																											// Auslautverhärtung (konsonantischer Endrand)
			this.morph = data[20];																														// Morpheme
					// |_______________________________________________________________________|

// PART-OF-SPEECH IS IMPLIED BY SCHEMA 
		// "GEN NUM CASUS" IS NOUN/SUBSTANTIV
		// "INF" OR "PERS NUM TEMP MODUS" IS VERB (FLEXED)
			this.speechpart = data[21].toLowerCase();																				// FLEXION // PART-OF-SPEECH
// FIELDS FOR "FREE" COMMENTARY
			this.etymo = data[22];																													// (TEACHER INFO) // "SCHREIBUNGSREGEL" POSS. DWDS-LINK
			this.didactic = data[23];																												// EXPLANATORY SUPPORT "HILFE & DIFF"
			this.hint = data[24];																														// "ESELSBRÜCKEN" & #TBD# MINIMALPAARE // (associative reference) 
			this.augment = data[25];																												// MEDIA/LINK/LANG AUGMENTATION // AUDIO TBD LINKED BY AUTO-NAMING

		} // PROPS

												 							  	// METHODS
// ==============================================================================================
// SAVE CASE (WILL BE LOST IN XSAMPA)
		saveCase(bool) {
			this.UPPER = bool;
		}
// INTERMEDIATE TAGGING AS "GRPHMS" WRITE #TEMP# TO XSAMPA-PROP
		toXsampa(str) {
			this.XSAMPA = str;
		}
																					// (TEMP)
											// CURRENTLY CALLED FROM SCRIPT "XSAMPA_TEXTTOSPEECH"
// STORE PHONETIC INTERMEDIATE 																												// TAGGED "GRPHMS" FOR PRECISION SEARCHES
		toIntermediate(str) {
			this.INTERPHON = str;
		}

																				// ### TEMP ###
														// TRYING #SHORTHAND# "ARTICLE (GEN NUM)"
// GENDER
		setArticle() {
			let pos = this.speechpart;
			if (pos != "") {																																// (NOT EMPTY OR UNDEF)
				if (pos === "m plu") {
					this.ARTICLE = ["die", "(m plu)"];
// 					this.GENDER.numerus = "plural";
// 					this.GENDER.genus = "maskulin";
				} else if (pos === "m") {																											// (#ATTENTION# "M"/"F"/"N" CAN BE PART OF OTHER STRINGS)
					this.ARTICLE = "der";
// 					this.GENDER.numerus = "singular";
// 					this.GENDER.genus = "maskulin";
				} else if (pos === "f plu") {
					this.ARTICLE = ["die", "(f plu)"];
// 					this.GENDER.numerus = "plural";
// 					this.GENDER.genus = "feminin";
				} else if (pos === "f") {
					this.ARTICLE = "die";
// 					this.GENDER.numerus = "singular";
// 					this.GENDER.genus = "feminin";
				} else if (pos === "n plu") {
					this.ARTICLE = ["die", "(n plu)"];
// 					this.GENDER.numerus = "plural";
// 					this.GENDER.genus = "neutrum";
				} else if (pos === "n") {
					this.ARTICLE = "das";
// 					this.GENDER.numerus = "singular";
// 					this.GENDER.genus = "neutrum";
				} else if (pos === "mf") {
					this.ARTICLE = "der/die";
// 					this.GENDER.numerus = "singular";
// 					this.GENDER.genus = "maskulin/feminin";
				}
// ##TBD## // "PLURALE TANTUM" (Eltern, Leute) WILL NOT SHOW UP 												// ARTICLE === UNDEF
			} // NOT EMPTY
		} // ARTICLE

// PART(S) TAGGED "IN PAREN(THESIS)" FOR ITALIC
		toItalic(inparen) {
			inparen.includes('_') ? inparen = inparen.split('_')[1] : inparen = inparen;			// SKIP MATCH ON PARTICLES
			if (inparen.includes('(') && inparen.includes(')')) {															// CATCH STRAY MISSING CLOSURE (CURRENTLY NONE)
				this.IRRSPELL = inparen;
			}
		}

// CREATE FLEX-TABLE																																		// (TBD SET/GET?) // #TBD# (FUTURE) ADD FULL INFO FROM "SPEECHPART"
		toMiniFlex() {
			if (this.lex.includes('_')) {
				let prop = this.lex.split('_');
				this.MINIFLEX.particle = prop[0];
				this.MINIFLEX.flexedform = prop[1];
				this.MINIFLEX.parent = this.parent;
			}
		}

					//  ___________________________________________________________________________
					// | 																 																 			     |
															// ##TBD## // OPEN ISSUE THU 11-MAY-23
						// CHECK ALL HARDCODED X-SAMPA IN SPREADSHEET FOR OVERLAP WITH SYLLABLE-TAGS
						// REPLACE ":" AS LENGTH SYMBOL (Y/y:) ET AL WITH UNIQUE TAG
										// (AT SOME POINT THIS SHOULD PROBABLY BE A REGEX-FUNCTION)
					// |___________________________________________________________________________|
// COMPUTE PROPERTY NUM OF SYLLABLES
		countSyllables() {
			let num_sylls = 1;
			let match = ['·', '|', '-', '+', "'"]; 																			// ALL SYMBOLS INDICATE A SYLLABLE BORDER
			//let temp Array.from(this.lex)
			//temp.forEach( ltr => {
			for (const ltr of this.lex) {
				match.forEach( tag => {
					if (ltr === tag) {
						num_sylls++;
					}
				})
			}
			this.SYLLS = num_sylls;
			//console.log("COUNT SYLLABLES", this.lex, "NUM", this.SYLLS);
		}


	} // CLASS








												// PICK AND READ A FILE (CSV) FROM A LOCAL DIRECTORY
					// ========================================================================
					// ========================================================================
function loadFile() {
  [file] = document.querySelector('input[type=file]').files;													// UNPACK PROPERTY FROM OBJECT
//  console.log("DESTRUCT", [file]);
// 	console.log("OBJ", file);
// 	console.log(file.name);

// PREVENT MULTIPLE LOAD
// OVERWRITE PREVIOUS MAP (IF ANY)
		if (Lexicon.size !== 0) {
			Lexicon = new Map();
		}

		loaded = true;
		fileimport = file.name;

  	const reader = new FileReader();
		reader.addEventListener("load", () => {
			csv_import_raw = reader.result;
			//console.log(typeof csv_import_raw, csv_import_raw);															// RAW STRING OF IMPORT (WITH PRESERVED WHITE SPACES)
			parseFile(csv_import_raw);
		}, false);

		if (file) {
			reader.readAsText(file);
		}

} // LOAD







																		// INITIAL (RAW) CONVERSION
																		// EXTRACTING LEXEME (COL 7)
						// ========================================================================
						// ========================================================================
function parseFile(str) {

	console.log("....RUNNING....");
	console.log("PARSE_FILE (CSV)");
												// REMOVE SOMETHING (OR NOTHING) TO RETURN A DEEP COPY
	let strclone = str.replaceAll('"', '');																							// PRESERVE WHITESPACE PRESERVE LINE BREAKS
// 	console.log("SHARED REFERENCE", str === strclone); 																// CHECKS AS CLONE OK
// 	console.log("\n\n");
	let temp_rows = strclone.split('\n'); 																							// LINEBREAK = UNIX (LF)
// ----------------------------------------------------------------------------------------------
	//console.log(typeof temp_rows, temp_rows);
	for (const row of temp_rows) {
		if (row != "") {																																	// STRIP EMPTY LINES (IF ANY)
			let columns = row.split(';');

// 04-FEB-23 // STILL CONTAINS SOME ROGUE COMMENTS IN EXCEL (WHERE COL7=LEXEME IS EMPTY)
// #TBD# REMOVE IN EXCEL LATER OR *CLEARLY* IDENTIFY AS COMMENT
			if (!columns[7]) {
				straycom.push(columns);
				continue;
			}


// ----------------------------------------------------------------------------------------------
													// FULL DATA (ALL COLUMNS) TO LEXICON-ENTRY OBJ
																// KEEP PAREN IN STRING FOR ITALICIZE
																// FULL STRIP ALL NON-ALPHA FOR KEY
// ----------------------------------------------------------------------------------------------	
// REMOVE HARDCODED XSAMPA
			const styled = stripNonAlpha(columns[7]);
// REMOVE DELIMITERS
			const unlimited = stripDelimiters(styled);																			// NEW SEPARATED FUNCTION // 21-MAY-23
			const key = stripParentheses(unlimited); // LINE #295#													// DEFER TO QUERIES

			if (key != "") {																																// (CATCH STRAY EMPTY COLS)
				Lexicon.set(key, new Lexeme(columns));
				Lexicon.get(key).saveCase(hasInitUppercase(key));															// DO THIS BEFORE LOOSING UC IN XSAMPA-TRANSCRIPTION
				Lexicon.get(key).toMiniFlex();																								// PARSE GRAMMAR-INFO (ADD ALSO FROM COL "SPEECHPART")
				Lexicon.get(key).setArticle();																								// (EXPAND PROP "SPEECHPART" FOR ARTICLE NUMERUS GENDER)
				Lexicon.get(key).countSyllables();																						// COUNT "·"":""-""+" IN LEXEME
				Lexicon.get(key).toItalic(styled);																						// PARENTHESES TAG IRREG PART(S) TO STYLE ITALIC
			}
		}
	} // END FOR

	lexentries = Lexicon.size;

																				// CALL NEXT STEP
 // FUNCTION HAS NO ARG 
 // BUT POPULATES THE GLOBAL VAR "GRPHM"
	graphemeFormat();

} // PARSE







																		// KEEP FOR DEBUGGING 
					// ========================================================================
					// ========================================================================
					
// FIND (HARDCODED) XSAMPA-TAG(S) IN LEXEME
/*
for(const key of Lexicon.keys()) {
    if (Lexicon.get(key).lex.includes("=")){
        console.log(key);
    }
} 
*/





																	// UTILITIES TRANSCRIPTION
					// ========================================================================
					// ========================================================================





// REMOVE DELIMITERS FOR ##KEY##

function stripDelimiters(str) {
	str = str.replaceAll('·', ''); // SYLLABLE
	str = str.replaceAll('-', ''); // AFFIX
	str = str.replaceAll('+', ''); // COMPOUND WORD
	str = str.replaceAll('|', ''); // SYLLABIC LONG VOWEL
	str = str.replaceAll("'", ''); // HIAT
	return str;
}




// #REMOVE# ALL TAGS FROM LEXEME AND SAVE COPY AS ##KEY##
// (FUTURE) TBD // COMBINE ALL STEPS INTO (SINGLE) REGEX REPLACER-FUNCTION
// HOWEVER ALL TAGS #MUST# BE PRESERVED IN PROPERTY ##LEXEME##

function stripNonAlpha(str) { // REF #429#																					// STRING IS COLUMN7=RAW LEXEME


											// ########################################################
											// ##TBD## RE-BUILD WITH "CONST ARRAY [IS, TO-BE]" SYNTAX

// LONG (INITIAL) SYLLABIC VOWEL
	// REPLACED ":" FOR SYLLABIC (LONG INITIAL) VOWEL BY "|" (PIPE)
	// SOLVED CONFLICT WITH ANY ":" IN HARDCODE XSAM
	//str = str.replaceAll('|', '');																									// NEW SYMBOL (21-MAY-23)

// BIVAL #V#
	str = str.replaceAll('=v', ''); 											 														// =GER "W" (DEFAULT IS GER "V" = GER "F")
// MULTIVAL #Y#
	str = str.replaceAll('=y:', ''); 																									// "y=" SAMPA "ü:" LONG
	str = str.replaceAll('=i:', ''); 																									// "Y=i:" "y=i:" INITIAL ("Y=I:|SOP") FINAL ("HAN·DY=I:")
	str = str.replaceAll('=Y', ''); 																									// SAMPA "ü" SHORT
	str = str.replaceAll('=j', ''); 																									// SAMPA "j" GER "j"
	str = str.replaceAll('=I', ''); 																									// SAMPA "i" SHORT
	
// INITIAL GER #C#
	str = str.replaceAll('c=k', 'c'); 	// #### "=k" SAMESAME BUT DIFFERENT						// SAMPA "k" GER "k"
	str = str.replaceAll('C=k', 'C'); // KEY IS STILL UCLC (MAY HAVE LOWER CASE ALSO)
	
// TSCH/TS/Z/S-/-S/ß
	str = str.replaceAll('=tS', ''); 																									// SAMPA "tS" GER/ITAL "tsch"
// GER "z" = "ts" IS DEFAULT 																												// (!)"Ts" IS DIS-FUNCTIONAL IN POLLY
// GER ANLAUT-S STIMMLOS IS EXCEPTION
// AT SYLLABLE ANLAUT "ß"
	str = str.replaceAll('=s', ''); 																									// "SEX" (VOICELESS) // ALSO "ß"

// INITIAL GER #CHA# #CHO# #CHU# (#CHR#)
	str = str.replaceAll('ch=k', 'ch'); // #### "=k" SAMESAME BUT DIFFERENT						// SAMPA "k" GER "k" (INCL. "Chrom")
	str = str.replaceAll('Ch=k', 'Ch'); // KEY IS STILL UCLC (MAY HAVE LOWER CASE ALSO)
	str = str.replaceAll('=C', ''); 																									// IS SAMPA "C" GER "k"
	str = str.replaceAll('=S', ''); 																									// IS SAMPA "S" GER "Sch" (FRANZ.)

// INITIAL GER #CHE# #CHI#
												// DEFAULT (UNMARKED) // ONLY HANDLED ALGORITHMICALLY
	// GER "che"/"ech" "chi"/"ich"																										// SAMPA "C" GER "SMALL X"
	// GER "ach" "och" "uch"																													// SAMPA "x" GER "BIG X"
															// REPLACE JOINER OF MEHRWORTAUSDRUCK
	str = str.replaceAll('&', ' ');
																				// GER "AI" GRAPHEME (RARE)									// SAMPA "aI" FOR GER "ei" "ey" "ai" "ay")
	str = str.replaceAll('=aI', '');
	str = str.replaceAll('=aI', '');
// LONG IRREG VOWEL "Ä" // 21-MAY-23
	str = str.replaceAll('=E:', '');

// PRESERVE DIVIS 
	// ("U-BAHN" AND ISOLATED AFFIXES)
	//str = str.replaceAll('*', '-'); // REF #472#
// PRESERVE APOSTROPHE (RARE)
	str = str.replaceAll('!', "'");											 															// NEW SYMBOL (28-FEB-23)
// RARE FRENCH LOAN-PHONEMES
// ("ORANGE" "GARAGE")
	str = str.replaceAll('=Ã', ''); // REMOVE XSAM "NASAL A(N)"
	str = str.replaceAll('=Z', ''); // REMOVE XSAM "VOICED SCH"

	return str; // (STILL WITH PAREN)

} // STRIP_NON_ALPHA





// FROM LINE #295#
// REMOVE PARENTHESIS

function stripParentheses(arg) { 	
	arg = arg.replaceAll('(', '');
	arg = arg.replaceAll(')', '');
	return arg; // (W/O PAREN)
}






																			// UTILITY UC_LC
					// ========================================================================
					// ========================================================================


// DETERMINE AND SAVE LTR-CASE
// (TO RECONSTRUCT CASE AFTER IT IS LOST WITH XSAMPA-TRANSCRIPTION)

function hasInitUppercase(key) {
	if (key[0]) {
		const initchar = key[0][0];
		const newchar = initchar.toUpperCase();
		return initchar === newchar;
	} else {
		console.log(key);
	}
} // UPPERCASE



