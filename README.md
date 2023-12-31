# searchable_speaking_lexicon
search utility for patterns and phonetics in a basic German vocabulary (2266 entries)


[RUN DEMO](https://www.jenskreitmeyer.de/alpha/lexicon/utility_lexicon.html)<br>
Layout is responsive but best viewed in desktop browser (Firefox or Chrome).
NOTE demo has some extraneous symbols/characters in search results for debugging<br>
<br>

**HOW TO USE THIS UTILITY (WITH INSTALLATION)**<br>
To install the App download the complete content of this repository to a common folder on your drive.<br>
Unzip the files AUDIO.zip and NUMBERS.zip inside the folder DATA.<br>
Launch the App by opening "utility-lexicon.html" (Firefox or Chrome), then click the button "Choose File" and point your browser at "FULL_INVENTORY_310523.csv" inside the folder DATA, and open it.<br>

The Lexicon source file can be re-imported into Excel and edited (with due caution).<br>
All Lexicon entries are "speak-able items". Click on a word in the list of results to play its (pre-recored) audio. Hold the alt-key and click, to open a pop-up with the full lexeme info.<br>
Results for any query can be downloaded to a plain text file (button "save").<br>
<br>

**ABOUT THE LEXICON (SOURCES)**<br>
The current Lexicon (if not yet loaded, locate and open it with the "choose file" button) is based on two sources:
[Schulentwicklung NRW Grundwortschatz](https://www.schulentwicklung.nrw.de/cms/grundwortschatz-nrw/grundwortschatz/wortfilter/index.html) (533 entries)
and [Grundwortschatz Berlin-Brandenburg Klasse 1-2 und 3-4](https://bildungsserver.berlin-brandenburg.de/deutsch-grundschule) (about 700 entries), with some overlap.<br>

It has been expanded by another 1000 entries specifically for German as a Second Language (DaZ), focusing on foundational schema-representative words (establishing vowel quality/length and "Lautprinzip") and derivatives (illustrating morphologic/orthographic constancy or "Stammprinzip"). 
As a guide, syllables that deviate from regular basic phonetic transcription are indicated by *kursive* type. In the current distribution these constitute less than 10% of the inventory.<br>
<br>

**SEARCHING FOR PATTERNS (ENTER A TEXT SEARCH)**<br>
- Explore phonetic/orthografic features or search for rhymes or "Minimalpaare" with simple or positional searches
- Enter any single letter (e.g. ß ä ö ü), "mehr­teilige Basis­grapheme" (au ch ck ei ie ng qu sch ...), double vowels or consonants (aa ee ff pp ...) or orthographic markers (ah ts tz ph ...)
- Search for odd clusters (e.g. "mpfst") or specific words (e.g. "Beispiel")
- For a positional search add a hyphen *after* the string to find words "starting with ..." (e.g. sch- sp- st-)
- add a hyphen *before* the string to find words "ending with ..." (e.g. -ig -em -tte)
This is useful for finding "Auslautverhärtung" (-b -d -g -s), affixes (e.g. be- ge- ver- -lich -ung), morphemes (e.g. -en -st) and some more (-and)
The search is case in(!)sensitive.<br>
<br>

**PHONETIC FILTERS (PULL-DOWN "FILTERS")**<br>
- Get exact matches for specific phonetic and orthographic features with exclusive searches (i.e. "ch" not in "sch" not in "tsch")
- Patterns like ch sch tsch and schwa/tiefschwa (-e -er) and orthographic markers ("ie", "-h-") are pre-configured for exclusive matching: Find "-e" (but not "-ee"), "ie" (but not "ië"), "st-" (but not "-st") and more ...<br>
<br>

**DISTRIBUTIONS AND SCHEMAS (PULL-DOWN "DISTRIBUTIONS")**<br>
- Filter the Lexicon by source dictionary
- Explore distributions of some phonetic and semantic patterns
- Find conforming/nonconforming examples for the basic intuition of vowel length following pattern "ak ka kak ..." (short/long/short) in most syllables (and thus words) ...
- Discover the distribution of female resp. male words ending on "-e" (schwa)...
- A selection of composite words and short phrases is also available
- In "show all entries" nouns will be listed with their article (gender)<br>
<br>

**SYLLABLES AND MULTI-PART ITEMS (PULL-DOWN "SYLLABLES AND MULTI-PART")**<br>
- List lexicon entries by number of syllables
Syllables are indicated by "·" (middot) delimiter. Syllabic long vowels are separated by ":" (colon) but do not represent an orthographic hyphenation.<br>
<br>

This project made excessive use of DWDS [Digtales Wörterbuch der deutschen Sprache](https://www.dwds.de/). Thanks!
