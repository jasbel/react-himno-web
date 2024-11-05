import React, { useCallback, useEffect, useState } from "react";
import Colors from "../res/colors";
import HimnoSearch from "../components/himno/HimnoSearch";
import HimnoItemNew from "../components/himno/HimnoItemNew";
import { titleApp } from "../res/constant";
import { ISongNew, ISongSearch } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import FavoriteEmptyState from "../components/favorite/FavoriteEmptyState";
import { useSongQuechua } from "../hooks/useNewQuechuaSong";
import { ERoutes } from "../res/enum";

const initPaginate = {
length: 40,
page: 1,
}

const HimnoNewQuechuaScreen = () => {
  const navigate = useNavigate();
  const { songFavorites, changeSongBySearch, songsSearch } = useSongQuechua();
  const [paginate, setPaginate] = useState(initPaginate);

  const handlePress = useCallback(
    (himno: ISongSearch) => {
      navigate('/' + ERoutes.itemQuechua, { state: { himno } });
    },
    [navigate]
  );

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
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <div style={styles.container}>
        <HimnoSearch onChange={handleSearch} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!songFavorites.length && <FavoriteEmptyState />}

          {/* {modeSearch && ( */}
          <>
            {songsSearch
              .filter((_, i) => (i >= paginate.length * (paginate.page - 1) && i < paginate.length * paginate.page))
              .map((item) => {
                return <HimnoItemNew
                  key={item.code}
                  item={item}
                  onClick={() => handlePress(item)}
                />;
              })}
          </>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, margin: 12}}>
          <button style={styles.btnStyle} disabled={paginate.page <= 1} onClick={() => setPaginate({...paginate, page: paginate.page - 1})} >Anterior</button>
          <button style={styles.btnStyle} disabled={paginate.page * paginate.length > songsSearch.length} onClick={() => setPaginate({...paginate, page: paginate.page + 1})} >Siguiente</button>
        </div>
      </div>
    </>
  );
};

export default HimnoNewQuechuaScreen;

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
