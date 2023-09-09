// NEW 15-JAN-23
// SPREADSHEET_IMPORT TO X-SAMPA
// 30-JAN-23
// #TBD# LINK TO NEW QUERY-MODULE
// MON 15-MAY-23
// FIXED DBL LOAD TO "GRPHM" ARRAY
// SAT 20-MAY-23
// FUNC NAME CHANGED "formatToXSAM"






															// PHONEME TO X-SAMPA TRANSCRIPTION
									// ALL #SINGLE-CHAR GRAPHEMES" ARE REPLACED  IN THIS SCRIPT

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +

																				// CONSONANTS
// ?	// (Spiegel)‘(ei)																		// glottal stop
// b
// d
// C	// "(i)ch" "(e)ch" 																	// voiceless palatal fricative
// dZ	// "dsch(ungel)"																		// voiced postalveolar affricate 			// stimmhaftes "tsch"
// f	// "v(ogel)"																				// voiceless labiodental fricative
// g
// h
// j
// k
// l
// m																											// bilabial nasal
// n																											// alveolar nasal
// N	// "(kli)ng(en)"																		// velar nasal
// p
// pf
// R	// "R(egen)"																				// uvular trill 											// Zäpfchen-R
// s	// "(au)s"																					// voiceless alveolar fricative 			// stimmloses "s"
// S	// "sch(ön)"																				// voiceless postalveolar fricative
// t
				// THIS CODE-ITEM IS DIS-FUNCTIONAL IN AMAZON "POLLY"
// Ts // "Z(ahl)"																					// voiceless alveolar affricate
				// USE "ts" INSTEAD
// tS // "(deu)tsch"																			// voiceless postalveolar affricate
// v	// "W(asser)"																				// voiced labiodental fricative 			// stimmhaftes "f"
// x	// "(a)ch" "(o)ch"																	// voiceless velar fricative
// z	// "S(ee)"																					// voiced alveolar fricative 					// stimmhaftes "s"
// Z	// "(Oran)g(e)																			// voiced postalveolar fricative 			// stimmhaftes "sch"
			// = "o:RA~Z@"																																									// TESTTEST
																						// VOWELS
// UNKLAR
// E:	// ##Mädchen## (?)																																				// langes "ä" (?)
// }: // long "ä" (/cat/ is short)

// 2:	// "(b)ö(se)"																				// long close-mid front rounded				// langes "ö"
// 9	// "(k)ö(nnen)"																			// open-mid front rounded							// kurzes "ö"
// 6	// "(bess)#er#"																			// near-open central									// Tief-Schwa
// 6_^ // "(kl)#ar#"																			// non-syllabic near-open central			// vokalisiertes-R
// @	// "(Red)e"																					// mid central												// Schwa
// a	// "(k)a(nn)"																				// open front unrounded								// kurzes "a"
// a:	// "(S)ah(ne)" "A(meise)"														// long open front unrounded					// langes "a" (und silbig)
// aI	// "(n)ei(n)"																				// diphtong
// aU	// "Au(gen)"																				// diphtong
// A~	// "(Restaur)ant" 																	// nasal open back unrounded
// e:	// "(R)e(de)" "E(sel)" 															// long close-mid front unrounded			// langes "e" (und silbig)
// E	// "E(nte)"																					// open-mid front unrounded						// (kurzes "e")
// E:	// ##Mädchen## (?)																																				// langes "ä" (?)
// }: // long "ä" (/cat/ is short)
// E~	// "(Terr)ain" 																			// nasal open-mid unrounded
// i:	// "(L)ie(d)" "I(gel)" "ih(r)"											// long close-front unrounded					// langes "i" (und silbig)
// I	// "(b)i(tte)"																			// near-close near-front unrounded		// kurzes "i"
// o:	// "(K)oh(l)"	"O(fen)"															// near-close near-front unrounded		// langes "o" (und silbig) // (Omikron)
// O	// "(K)o(ffer)"																			// open-mid back rounded							// kurzes "o" 					   // (Omega)
// O~	// "(Ann)on(ce)"																		// nasal open-mid back rounded
// OY	// "(n)eu"																					// diphtong
// u:	// "(Br)u(der)" "U(fer)"														// long close-back rounded						// langes "u" (und silbig)
// U	// "(W)u(nder)" "(N)u(ss)"													// near-close near-back rounded				// kurzes "u"
// y:	// "(k)üh(l)" "(K)ü(he)" "ü(ben)"										// long close front rounded						// langes "ü" (und silbig)
// Y	// "(k)ü(ssen)"																			// near-close near-front rounded			// kurzes "ü"
																		// ADDITIONAL SYMBOLS
// "	// "alaBAma"																				// PRIMARY STRESS
// %	// "Alabama"																				// SECONDARY STRESS																			
// .	// "a.la.ba.ma"																			// SYLLABLE BOUNDARY








// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// MARK-UP
/*
<speak>
     You say, <phoneme alphabet='x-sampa' ph='pI"kA:n'>pecan</phoneme>.  // " (DBL-QUOTE) = primary stress marker ALL LANGUAGES
     I say, <phoneme alphabet='x-sampa' ph='"pi.k{n'>pecan</phoneme>. 	 // { (LEFT WAVY BRAKET) = "(tr)a(p)" en-US/AU/GB/IN
</speak>
*/

// INNERMOST TAG
// ph='pI"kA:n' // (! DBL-QUOTES = PRIMARY STRESS MARKER // ESCAPE HTML-ENTITIES (&quot;)






// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
										// ##### ##### SPECIAL TAGS IN SOURCE (EXCEL) ##### #####
	// TAG IN STRING WITH "V=W" AND "v=w" (UC/LC) MANUALLY FOR TRANSCRIPTION TO "v"
	// DEFAULT TRANSCRIPTION IS "V/v"->"f"

	// TAG "Y=i:" "Y=I" "Y=j"
	// DEFAULT "Y=y:" // "Asyl"
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /





console.log("#TEXTTOSPEECH_XSAMPA# SUN 19-FEB-23\n\n");
// GLOBAL // RESULTS TO TEXT-TO-SPEECH API
let words_xsampa = [];







														// TRANSCRIBE MARKUP TO X-SAMPA FORMAT

// ##TEMP##
// WRITE "INTERPHONE" (PLACEHOLDER FOR X-SAMPA) TO LEXICON OBJ-PROPERTY
// ##TBD##
// CONVERT THE "INTERPHON"-MARKUP TO PROPER X-SAMPA FOR PHONETIC TTS
// (EG "=-e=" TO "@" FOR SCHWA)


function formatToXSAM(grphms) {

// ("GRPHMES" NOW ARG NOT GLOBAL)
	console.log("....RUNNING....");
	console.log("XSAMPA_FORMAT");


					// __________________________________________________________________________
									 // STORE GRAPHME-MARKUP IN OBJ-PROP "(PHONETIC) INTERMEDIATE"
	for (const item of grphms) {
		let temp = Lexicon.get(item[0]); // 0=KEY 1=INTERMEDIATE
		//console.log(temp);
		temp.toIntermediate(item[1]); // METHOD OF LEXEME
	}


															// COPY/GET THIS FROM GRPHM-PROP
				// =============================================================================
				// CATCH LONG VOWELS
				// aa ee =ie= oo		// ANY POSITION
				// a: e: i: 			 	// SILBIG WORTANFANG // IS TAGGED
				// ah eh ih oh uh	 	// ANY POSITION
				// -e TO @          // IS TAGGED =-e=

				// MORE REDUCED SYLLABIC ENDINGS 
				// ·xern						// VOKR-N																							// ##OK## // LINE ##212## R_REDUCE
				// ·en ·xen 				// = X'N			// NOT AFTER "L" "M" "N" "R"
				// ·xel							// = X'L			// EXCEPT AFTER "T" (=-E)
				

															// WRITE FINAL XSAMPA TO PROP "SAMBA"
															// METHOD
		//temp.toXsampa(arg);
				// =============================================================================






// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /
// #TBD#
// RESETS
	csv_import_raw = ""; 
	grphms = [];

	console.log("XFORMAT/GRPHMS");
	console.log(grphms); // NOT CALLED AGAIN AFTER INITIAL LOAD
	console.log("XFORMAT/CSV_IMPORT_RAW");
	console.log(csv_import_raw);
	console.log("\n");

// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /


} // END FUNCTION



