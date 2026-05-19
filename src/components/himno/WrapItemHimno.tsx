import ItemHimnoLetter, { ILetter } from "./ItemHimnoLetter";
import { ISongModel } from "../../types/types";
import { IChoir } from "../../types/types";

interface Props extends Pick<ISongModel, "paragraphs" | "chorus"> {
  isSmall?: boolean;
  showChords?: boolean;
}

const WrapItemHimno = ({ chorus, paragraphs, isSmall, showChords }: Props) => {
  function joinChoirs(filter: IChoir[]): string[] {
    const filterChoir =
      filter.length >= 2
        ? filter.reduce(
            (accumulatorChoir, _choir, idx) =>
              accumulatorChoir + (_choir?.choir || '') + (filter.length !== idx + 1 ? "\n\n" : ""),
            ""
          )
        : filter[0]?.choir || '';

    return [filterChoir];
  };

  const verses: ILetter[] = paragraphs.map((item) => {
    let choirs = [] as string[];

    let choirRepetitions: { choir: string; repeat: number }[] = [];
    if (chorus) {
      // Ensure chorusPos is an array before mapping
      const chorusPosArray = Array.isArray(item.chorusPos)
        ? item.chorusPos
        : (item.chorusPos ? [item.chorusPos] : []);

      choirRepetitions = chorusPosArray.map((cp: any) => {
        // Handle tuple [id, repeat] or simple id
        const id = Array.isArray(cp) ? cp[0] : cp;
        const repeat = Array.isArray(cp) && cp[1] ? cp[1] : 1;

        let choirText = '';
        if(typeof id === 'number') {
          choirText = chorus[id - 1]?.choir || '';
        } else {
          const foundChoir = chorus.find(c => c.id === id);
          choirText = foundChoir?.choir || '';
        }

        return { choir: choirText, repeat };
      }).filter(item => item.choir); // Filter out empty choirs

      // Join choirs with repetitions - add "/" for each repeat at start and end
      if (choirRepetitions.length > 0) {
        choirs = choirRepetitions.map(item => {
          if (item.repeat > 1) {
            return '/'.repeat(item.repeat - 1) + item.choir + '/'.repeat(item.repeat - 1);
          }
          return item.choir;
        });
      }
    }

    choirs = choirs || [];

    return { ...item, choirs: choirs };
  });

  return (
    <>
      {verses.map((it, i) => {
        return <ItemHimnoLetter key={i} item={it} isSmall={isSmall} hiddenSepare={verses.length <= i + 1} showChords={showChords} />;
      })}
    </>
  );
};

export default WrapItemHimno;

