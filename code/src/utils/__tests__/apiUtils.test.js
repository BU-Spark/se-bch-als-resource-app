import { getYouTubeEmbedUrl, extractBetweenResources, removeResourcesSection } 
from  "../apiUtils";

describe('getYouTubeEmbedUrl', () => {
  test('returns correct embed URL for standard watch URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  test('returns correct embed URL for shortened youtu.be URL', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  test('returns null for invalid YouTube URL', () => {
    const url = 'https://someotherwebsite.com/watch?v=dQw4w9WgXcQ';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });

  test('returns null for URL without video ID', () => {
    const url = 'https://www.youtube.com/watch?v=';
    expect(getYouTubeEmbedUrl(url)).toBeNull();
  });
});

describe('extractBetweenResources', () => {
  test('correctly extracts content between tags', () => {
    const text = 'Here is some text [\\*resources\\*] [{\"title\" : \"Website Link\", \"url\" : \"https://www.childrenshospital.org/programs/als-augmentative-communication-program/protocol-assessment-considerations/voice-0 \"}, {\"title\" : \"Spokeman Amplifier\", \"url\" : \"https://www.luminaud.com/spokeman\\_amp\"}, {\"title\" : \"Headset Microphone\", \"url\" : \"https://www.diglo.com/chattervox-hm200-headset-microphone;sku=HC-HM200C;s=516;p=HC-HM200C\"}] [\\*resources\\*] and here is more text';
    expect(extractBetweenResources(text)).toBe("[{\"title\" : \"Website Link\", \"url\" : \"https://www.childrenshospital.org/programs/als-augmentative-communication-program/protocol-assessment-considerations/voice-0 \"}, {\"title\" : \"Spokeman Amplifier\", \"url\" : \"https://www.luminaud.com/spokeman\\_amp\"}, {\"title\" : \"Headset Microphone\", \"url\" : \"https://www.diglo.com/chattervox-hm200-headset-microphone;sku=HC-HM200C;s=516;p=HC-HM200C\"}]");
  });

  test('returns null if no start tag is present', () => {
    const text = "Here is some text Important content [*resources*] and here is more text";
    expect(extractBetweenResources(text)).toBeNull();
  });

  test('returns null if no end tag is present', () => {
    const text = "Here is some text [*resources*] Important content and here is more text";
    expect(extractBetweenResources(text)).toBeNull();
  });

  test('returns null if tags are empty', () => {
    const text = "Here is some text [\\*resources\\*][\\*resources\\*] and here is more text";
    expect(extractBetweenResources(text)).toBeNull();
  });
});

describe('removeResourcesSection', () => {
  test('removes content between tags including tags themselves', () => {
    const text = "Start of text [\\*resources\\*] to be removed [\\*resources\\*]end of text";
    expect(removeResourcesSection(text)).toBe("Start of text end of text");
  });

  test('returns original text if start tag is missing', () => {
    const text = "Start of text to be removed [\\*resources\\*] end of text";
    expect(removeResourcesSection(text)).toBe(text);
  });

  test('returns original text if end tag is missing', () => {
    const text = "Start of text [\\*resources\\*] to be removed end of text";
    expect(removeResourcesSection(text)).toBe(text);
  });

  test('handles text with no tags present', () => {
    const text = "Start of text with no tags end of text";
    expect(removeResourcesSection(text)).toBe(text);
  });
});
