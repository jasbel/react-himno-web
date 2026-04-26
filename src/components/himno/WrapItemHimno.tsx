import ItemHimnoLetter, { ILetter } from "./ItemHimnoLetter";
import { ISongModel } from "../../types/types";
import { IChoir } from "../../types/types";

interface Props extends Pick<ISongModel, "paragraphs" | "chorus"> {
  isSmall?: boolean;
}

const WrapItemHimno = ({ chorus, paragraphs, isSmall }: Props) => {
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

    let filters: IChoir[] = [];
    if (chorus) {
      // Ensure chorusPos is an array before mapping
      const chorusPosArray = Array.isArray(item.chorusPos) 
        ? item.chorusPos 
        : (item.chorusPos ? [item.chorusPos] : []);

      filters = chorusPosArray.map((cp: any) => {
        // Handle tuple [id, repeat] or simple id
         const id = Array.isArray(cp) ? cp[0] : cp;
         
        if(typeof id === 'number') {
         return chorus[id - 1]
        }
        return chorus.find(c => c.id === id)!;
      }).filter(Boolean); // Filter out undefineds
      
      choirs = filters.length ? joinChoirs(filters) : [];
    }

    choirs = choirs || [];

    return { ...item, choirs };
  });

  return (
    <>
      {verses.map((it, i) => {
        return <ItemHimnoLetter key={i} item={it} isSmall={isSmall} hiddenSepare={verses.length <= i + 1} />;
      })}
    </>
  );
};

export default WrapItemHimno;

