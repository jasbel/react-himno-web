import React, { useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "./himno/HimnoSearch";
import HimnoItem from "./himno/HimnoItemNew";
import { ISongSearch } from "../types/types";
import FavoriteEmptyState from "./favorite/FavoriteEmptyState";

const initPaginate = {
  length: 40,
  page: 1,
}

interface Props {
  changeSongBySearch: (q: string) => void;
  hasFavorite: boolean;
  songsSearch: ISongSearch[];
  handlePress: Function
}

const HimnoList = ({ changeSongBySearch, hasFavorite: hasFavorite, songsSearch, handlePress }: Props) => {
  const [paginate, setPaginate] = useState(initPaginate);

  const resetPaginate = () => {
    if(paginate.page === 1) return;

    setPaginate(initPaginate)
  };

  const handleSearch = (query: string) => {
    changeSongBySearch(query);
    resetPaginate()
  };

  return (
    <>
      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!hasFavorite && <FavoriteEmptyState />}

          <>
            {songsSearch
              .filter((_, i) => (i >= paginate.length * (paginate.page - 1) && i < paginate.length * paginate.page))
              .map((item) => {
                return <HimnoItem
                  key={item.code}
                  id={item.id}
                  title={item.title}
                  num={item.code}
                  note={item.musicalNote}
                  description={item.paragraphs[0].paragraph}
                  onClick={() => handlePress(item)}
                />;
              })}
          </>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, margin: 12 }}>
          <button style={styles.btnStyle} disabled={paginate.page <= 1} onClick={() => setPaginate({ ...paginate, page: paginate.page - 1 })} >Anterior</button>
          <button style={styles.btnStyle} disabled={paginate.page * paginate.length > songsSearch.length} onClick={() => setPaginate({ ...paginate, page: paginate.page + 1 })} >Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default HimnoList;

const styles: { [key in any]: React.CSSProperties } = {
  container: {
    flex: 1,
    backgroundColor: Colors.bkgWhite,
    paddingLeft: 12,
    paddingRight: 12,
  },
  btnStyle: {
    backgroundColor: Colors.bkgPrimary,
    color: Colors.white,
    padding: '6px 12px',
    borderRadius: 25,
  }
};
