
function DoNothingFunction() {
  //data before
}

/** 
  A test output string for pulling
  Documentation Symbols #$/{()}
	Any simple control character (\n,\r,\t) and _any_ ASCII "printing" character should be fine save for the combination of an asterix immediately followed by a forward slash.
*/
/** As of v0.2.9, Latin-1 Supplemental characters (U+00A1-U+00AC and U+00AE-U+00FF) can now be captured as well, spurred on by a suggestiong from [orangeiris](https://github.com/Anadian/extract-documentation-comments/issues/6) who wanted to be able to capture words like 'Parámetros' */

/*
	Shouldn't be extracted.
*/

/***/

/** The previous triple asterix line should be a blank line.*/

/** A second test without the line break */

DoNothingFunction()

/** 
 * A third Thing
 */

 // Single line comment, will not output
