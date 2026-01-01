import { useCallback, useContext } from "react";
import { titleApp } from "@/utils/constant";
import { ISongModel } from "../types/types";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { ERoutes } from "@/utils/enum";
import HimnoList from "@/components/HimnoList";
import { SongNewContext } from "@/state/SongNewContext";
import { getSongV1Item } from "@/api/songLocalService";
import { uuid } from "@/utils/helpers";

const HimnoNewScreen = () => {
  const navigate = useNavigate();
  const { changeSongBySearch, songAllFilter} = useContext(SongNewContext)

  const handlePress = useCallback(
    (himno: ISongModel) => {
      navigate('/' + ERoutes.item, { state: { himno } });
    },
    [navigate]
  );

  const handlePressPre = 
    async (himno: ISongModel) => {
      let item: ISongModel = himno
      if (himno.filename) {
        // debugger
        const _item = await getSongV1Item(himno.filename)
        item = {..._item, paragraphs:  _item.paragraphs.map(it =>  ({...it, id: uuid(), chorusPos: []}))}
      }
      handlePress(item) 
      
    }

  return (
    <div className="himnonewscreen">
      <Hero title={titleApp} hrefBefore={"/"} hiddenFS />

      <HimnoList
        changeSongBySearch={changeSongBySearch}
        songsSearch={songAllFilter}
        handlePress={handlePressPre}
      />
    </div>
  );
};

export default HimnoNewScreen;
