/**
 * Capitalizes the first letter of each word in a string using regex.
 *
 * @param string The input string.
 * @returns The string with the first letter of each word capitalized.
 */
export function capitalizeWords(string: string): string {
	if (!string) {
		return string; // Return the original value if it's null, undefined, or empty
	}

	// 1. Convert the entire string to lowercase for consistency.
	const lowerStr = string.toLowerCase();

	// 2. Use the replace method with a regular expression.
	// Regex Explanation:
	// / (?:^|\s)\S /g
	//   (?:^|\s) : A non-capturing group matching either the start of the string (^) OR a whitespace character (\s).
	//   \S      : Matches a non-whitespace character (the letter we want to capitalize).
	//   /g      : Global flag, ensures ALL matches in the string are replaced, not just the first one.
	return lowerStr.replace(/(?:^|\s)\S/g, (match) => {
		// The 'match' is the character we want to capitalize, plus the preceding space or start of string.
		// match.toUpperCase() capitalizes the entire match, including the space,
		// but the space remains a space.
		return match.toUpperCase();
	});
}
