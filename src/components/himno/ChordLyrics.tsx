import React from 'react';

interface ChordSegment {
  chord?: string;
  text: string;
}

interface ChordLyricsProps {
  text: string;
  fontSize: number | string;
}

const ChordLyrics: React.FC<ChordLyricsProps> = ({ text, fontSize }) => {
  const parseChords = (text: string): ChordSegment[] => {
    const segments: ChordSegment[] = [];
    const chordRegex = /\[([a-zA-Z0-9#\/]+)\]/g;
    let lastIndex = 0;
    let match;

    while ((match = chordRegex.exec(text)) !== null) {
      // Add text before the chord
      if (match.index > lastIndex) {
        const textBefore = text.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          segments.push({ text: textBefore });
        } else if (textBefore) {
          // Preserve whitespace
          segments.push({ text: textBefore });
        }
      }

      // Add the chord
      const chord = match[1];
      segments.push({ chord, text: '' });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last chord
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText.trim()) {
        segments.push({ text: remainingText });
      } else if (remainingText) {
        segments.push({ text: remainingText });
      }
    }

    // If no chords found, return the whole text as one segment
    if (segments.length === 0) {
      return [{ text }];
    }

    return segments;
  };

  const segments = parseChords(text);

  // Parse fontSize to get numeric value
  const getNumericFontSize = (size: number | string): number => {
    if (typeof size === 'number') return size;
    // Handle calc() expressions by extracting a reasonable default
    if (typeof size === 'string' && size.includes('calc')) {
      // Extract the base value from the calc expression
      const match = size.match(/(\d+(?:\.\d+)?)\s*px/);
      return match ? parseFloat(match[1]) : 16;
    }
    if (typeof size === 'string') {
      const parsed = parseFloat(size);
      return isNaN(parsed) ? 16 : parsed;
    }
    return 16;
  };

  const numericFontSize = getNumericFontSize(fontSize);
  const chordFontSize = Math.max(12, numericFontSize * 0.65); // 65% del tamaño del texto, mínimo 12px
  const chordLineHeight = numericFontSize * 0.8; // Espaciado proporcional para acordes
  const lineHeight = numericFontSize * 1.8; // lineHeight proporcional

  // If no chords, render as normal text
  if (!segments.some(s => s.chord)) {
    return <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{text}</span>;
  }

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      <div style={{ lineHeight: `${lineHeight}px`, whiteSpace: 'pre-wrap' }}>
        {segments.map((segment, index) => {
          const hasChord = !!segment.chord;
          const textAfterChord = hasChord && segment.text.trim();

          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                marginRight: hasChord ? '2px' : '0px',
                position: 'relative',
                verticalAlign: 'top',
              }}
            >
              {segment.chord && (
                <span
                  style={{
                    position: 'absolute',
                    top: `-${chordLineHeight}px`,
                    left: '0',
                    fontSize: `${chordFontSize}px`,
                    fontWeight: 'bold',
                    color: '#d32f2f',
                    whiteSpace: 'nowrap',
                    lineHeight: '1',
                  }}
                >
                  {segment.chord}
                </span>
              )}
              <span
                style={{
                  fontSize: `${numericFontSize}px`,
                  lineHeight: '1.4',
                  visibility: hasChord && !textAfterChord ? 'hidden' : 'visible',
                }}
              >
                {segment.text || (hasChord ? ' ' : '')}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ChordLyrics;
