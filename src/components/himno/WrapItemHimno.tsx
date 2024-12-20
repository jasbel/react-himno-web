import ItemHimnoLetter, { ILetter } from "./ItemHimnoLetter";
import { ISong } from "../../types/types";
import { IChoir } from "../../types/types";

interface Props extends Pick<ISong, "paragraphs" | "chorus"> {
  isSmall?: boolean;
}

const WrapItemHimno = ({ chorus, paragraphs, isSmall }: Props) => {
  function joinChoirs(filter: IChoir[]): string[] {
    const filterChoir =
      filter.length >= 2
        ? filter.reduce(
            (accumulatorChoir, _choir, idx) =>
              accumulatorChoir + _choir?.choir + (filter.length !== idx + 1 ? "\n\n" : ""),
            ""
          )
        : filter[0]?.choir;

    return [filterChoir];
  };

  const verses: ILetter[] = paragraphs.map((item, i) => {
    let choirs = [] as string[];

    let filters: IChoir[];
    if (chorus) {
      filters = item.chorusPos.map((cp) => {
        if(typeof cp[0] === 'number') {
         return chorus[cp[0] - 1]
        }
        return chorus.find(c => c.id === cp[0])!;
      });
      choirs = filters.length ? joinChoirs(filters) : [];
    }

    choirs = choirs || [];

    return { ...item, choirs };
  });

  return (
    <>
      {verses.map((v, i) => {
        return <ItemHimnoLetter key={i} item={v} isSmall={isSmall} />;
      })}
    </>
  );
};

export default WrapItemHimno;

