import { FC, useContext, useEffect, useState } from "react";
import Colors from "@/utils/colors";
import { responsiveCalc } from "@/utils/responsive";
import { ISongModel } from "../types/types";

import { useLocation, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import { Box } from "@components/ui";
import WrapItemHimno from "../components/himno/WrapItemHimno";
import { SongQchContext } from "../state/SongQchContext";
import { ERoutes } from "@/utils/enum";
import HimnoSongFooter from "@/components/himno/HimnoSongFooter";

export const initialValues = {
  fontSize: responsiveCalc(80, 20),

  fontSizeIncremental: 1,
};

interface Props {}

const HimnoSongQuechuaScreen: FC<Props> = () => {
  const { addToFav, rmToFav, getSongById } = useContext(SongQchContext);
  const { state } = useLocation() as { state: { himno: ISongModel } };
  const { id } = useParams();
  const [himno, setHimno] = useState<ISongModel>(state?.himno);

  const himnoId = id || state?.himno?.id;

  useEffect(() => {
    const loadHimno = () => {
      if (!state?.himno && himnoId) {
        const songFromContext = getSongById(himnoId);
        if (songFromContext) {
          setHimno(songFromContext);
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
    <>
      <Hero title={title} hrefBefore={'/' + ERoutes.homeQuechua} />
      
      <Box style={{ padding: "8px 4px", paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)", padding: "0 4px" }}>
          <WrapItemHimno paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <HimnoSongFooter id={himno.id} add={addToFav} remove={rmToFav} />
    </>
  );
};

export default HimnoSongQuechuaScreen;
