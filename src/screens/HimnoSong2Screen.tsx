import { FC, useContext, useEffect, useState } from "react";
import Colors from "@/utils/colors";
import { responsiveCalc } from "@/utils/responsive";
import { ISongModel } from "../types/types";

import { useLocation, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import { Box } from "@components/ui";
import WrapItemHimno from "../components/himno/WrapItemHimno";
import { ERoutes } from "@/utils/enum";
import HimnoSongFooter from "@/components/himno/HimnoSongFooter";
import { SongNewContext } from "@/state/SongNewContext";
import { getSongV1Item } from "@/api/songLocalService";
import { uuid } from "@/utils/helpers";

export const initialValues = {
  fontSize: responsiveCalc(80, 20),

  fontSizeIncremental: 1,
};

interface Props {}

const HimnoSongScreen: FC<Props> = () => {
  const { state } = useLocation() as { state: { himno: ISongModel } };
  const { id } = useParams();
  const { addToFav, rmToFav, getSongById } = useContext(SongNewContext);
  const [himno, setHimno] = useState<ISongModel>(state?.himno);

  const himnoId = id || state?.himno?.id;

  useEffect(() => {
    const loadHimno = async () => {
      if (!state?.himno && himnoId) {
        const songFromContext = getSongById(himnoId);
        if (songFromContext) {
          if (songFromContext.filename) {
            const item = await getSongV1Item(songFromContext.filename);
            const loadedHimno = {
              ...item,
              paragraphs: item.paragraphs.map(it => ({
                ...it,
                id: it.id || uuid(),
                chorusPos: it.chorusPos || []
              }))
            };
            setHimno(loadedHimno);
          } else {
            setHimno(songFromContext);
          }
        }
      }
    };

    loadHimno();
  }, [himnoId, state, getSongById]);

  if (!himno) {
    return <div className="p-4 text-center">Cargando himno...</div>;
  }

  const { paragraphs, chorus, title } = himno;

  return (
    <div>
      <Hero title={title} hrefBefore={'/' + ERoutes.himnos} />

      <Box style={{ padding: "8px 4px", paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)", padding: "0 4px" }}>
          <WrapItemHimno paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <HimnoSongFooter id={himno.id} add={addToFav} remove={rmToFav} />
    </div>
  );
};

export default HimnoSongScreen;
