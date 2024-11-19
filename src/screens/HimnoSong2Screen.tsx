import { FC, useContext } from "react";
import Colors from "../res/colors";
import { responsive } from "../res/responsive";
import { ISong } from "../types/types";

import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import { SongContext } from "../state/SongContext";
import { Box } from "@components/ui";
import WrapItemHimno from "../components/himno/WrapItemHimno";
import { ERoutes } from "../res/enum";
import HimnoSongFooter from "@/components/himno/HimnoSongFooter";

export const initialValues = {
  fontSize: responsive(80, 20),

  fontSizeIncremental: 1,
};

interface Props {}

const HimnoSongScreen: FC<Props> = () => {
  const { state } = useLocation() as { state: { himno: ISong } };
  const { addToFav, rmToFav } = useContext(SongContext);


  const { paragraphs, chorus, title } = state.himno;

  return (
    <>
      <Hero title={title} hrefBefore={'/' + ERoutes.home} />

      <Box style={{ padding: 1, paddingTop: 6,paddingBottom: 6, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)" }}>
          <WrapItemHimno paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <HimnoSongFooter id={state.himno.id} add={addToFav} remove={rmToFav} />
    </>
  );
};

export default HimnoSongScreen;
