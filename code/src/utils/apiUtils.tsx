
//These are helper functions used by /api/retrieveQuestions.tsx to retrieve questions from the Typeform API.

/**
 * Returns the YouTube embed URL for a given YouTube video URL.
 * @param url - The YouTube video URL.
 * @returns The YouTube embed URL if the input URL is valid, otherwise null.
 */
function getYouTubeEmbedUrl(url: string) {
  const regExp =
    /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return null;
  }
}

/**
 * Extracts the text between the "[*resources*]" tags from the given text.
 * 
 * @param text - The text to extract from.
 * @returns The extracted text, or null if the tags are not found.
 */
function extractBetweenResources(text: string): string | null {
  const startTag = "[\\*resources\\*]";
  const endTag = "[\\*resources\\*]";
  const startIndex = text.indexOf(startTag);
  const endIndex = text.indexOf(endTag, startIndex + startTag.length);

  if (startIndex === -1 || endIndex === -1) {
    return null; // One of the tags not found
  }

  return text.substring(startIndex + startTag.length, endIndex).trim();
}

/**
 * Removes the resources tags along with content from the
 * given text in order to return a clean description field.
 * 
 * @param text - The text from which to remove the resources section.
 * @returns The modified text with the resources section removed. Typically used for the description field.
 */
function removeResourcesSection(text: string): string {
  const startTag = "[\\*resources\\*]";
  const endTag = "[\\*resources\\*]";
  const startIndex = text.indexOf(startTag);
  const endIndex = text.indexOf(endTag, startIndex + startTag.length);

  if (startIndex === -1 || endIndex === -1) {
    return text; // Tags not found, return original text
  }
  // Get the part of the string before the start tag and after the end tag
  const beforeStartTag = text.substring(0, startIndex);
  const afterEndTag = text.substring(endIndex + endTag.length);

  // Combine these two parts to form the new string
  return (beforeStartTag + afterEndTag).trim();
}