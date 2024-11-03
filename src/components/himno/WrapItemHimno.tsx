import ItemHimnoLetter, { ILetter } from "./ItemHimnoLetter";
import { ISongNew } from "../../types/types";
import { IChoir2 } from "../../types/types";

interface Props extends Pick<ISongNew, "paragraphs" | "chorus"> {}

const WrapItemHimno = ({ chorus, paragraphs }: Props) => {
  function joinChoirs(filter: IChoir2[]): string[] {
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

    let filters: IChoir2[];
    if (chorus) {
      filters = item.chorusPos.map((cp) => {
        return chorus[cp[0] - 1];
      });
      choirs = filters.length ? joinChoirs(filters) : [];
    }

    choirs = choirs || [];

    return { ...item, choirs };
  });

  return (
    <>
      {verses.map((v, i) => {
        return <ItemHimnoLetter key={i} item={v} />;
      })}
    </>
  );
};

export default WrapItemHimno;

