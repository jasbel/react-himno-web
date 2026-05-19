import React from 'react';

interface ChordSegment {
  chord?: string;
  text: string;
  isBr?: boolean;
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
      // Add text before the chord (including whitespace and newlines)
      if (match.index > lastIndex) {
        const textBefore = text.slice(lastIndex, match.index);
        // Split by newlines and create segments
        const lines = textBefore.split('\n');
        lines.forEach((line, index) => {
          if (index > 0) {
            segments.push({ isBr: true, text: '' }); // Add line break
          }
          if (line) {
            segments.push({ text: line });
          }
        });
      }

      // Add the chord
      const chord = match[1];
      segments.push({ chord, text: '' });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last chord
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      const lines = remainingText.split('\n');
      lines.forEach((line, index) => {
        if (index > 0) {
          segments.push({ isBr: true, text: '' }); // Add line break
        }
        if (line) {
          segments.push({ text: line });
        }
      });
    }

    // If no chords found, return the whole text as segments with line breaks
    if (segments.length === 0) {
      const lines = text.split('\n');
      const result: ChordSegment[] = [];
      lines.forEach((line, index) => {
        if (index > 0) {
          result.push({ isBr: true, text: '' });
        }
        if (line) {
          result.push({ text: line });
        }
      });
      return result.length > 0 ? result : [{ text }];
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
  const lineHeight = numericFontSize * 2.1; // lineHeight proporcional

  // If no chords, render as normal text with line breaks
  if (!segments.some(s => s.chord)) {
    return (
      <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            {segment.isBr ? <br /> : segment.text}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <span style={{ display: 'inline-block', width: '100%' }}>
      <span style={{ display: 'block', lineHeight: `${lineHeight}px`, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {segments.map((segment, index) => {
          const hasChord = !!segment.chord;

          // Render line breaks
          if (segment.isBr) {
            return <br key={index} />;
          }

          // Render text with optional chord
          return (
            <span
              key={index}
              style={{
                display:  'inline-block',
                marginRight: hasChord ? '0px' : '0px',
                position: hasChord ? 'relative' : 'static',
                verticalAlign: 'top',
              }}
            >
              {segment.chord && (
                <span
                  style={{
                    position: 'absolute',
                    top: `-${chordLineHeight/4}px`,
                    left: '0',
                    fontSize: `${chordFontSize*1.2}px`,
                    fontWeight: 'bold',
                    color: '#d32f2f',
                    whiteSpace: 'nowrap',
                    lineHeight: '1',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {segment.chord}
                </span>
              )}
              <span
                style={{
                  fontSize: `${numericFontSize}px`,
                  lineHeight: '1.4',
                }}
              >
                {segment.text}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default ChordLyrics;
