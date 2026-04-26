import { FC, useContext } from "react";
import Colors from "@/utils/colors";
import { responsiveCalc } from "@/utils/responsive";
import { ISongModel } from "../types/types";

import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import { Box } from "@components/ui";
import WrapItemHimno from "../components/himno/WrapItemHimno";
import { ERoutes } from "@/utils/enum";
import HimnoSongFooter from "@/components/himno/HimnoSongFooter";
import { SongNewContext } from "@/state/SongNewContext";

export const initialValues = {
  fontSize: responsiveCalc(80, 20),

  fontSizeIncremental: 1,
};

interface Props {}

const HimnoSongScreen: FC<Props> = () => {
  const { state } = useLocation() as { state: { himno: ISongModel } };
  const { addToFav, rmToFav } = useContext(SongNewContext);


  const { paragraphs, chorus, title } = state.himno;

  return (
    <div>
      <Hero title={title} hrefBefore={'/' + ERoutes.himnos} />

      <Box style={{ padding: "8px 4px", paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)", padding: "0 4px" }}>
          <WrapItemHimno paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <HimnoSongFooter id={state.himno.id} add={addToFav} remove={rmToFav} />
    </div>
  );
};

export default HimnoSongScreen;
