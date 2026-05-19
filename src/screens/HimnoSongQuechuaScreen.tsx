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
import HimnoHeaderRefresh from "@/components/himno/HimnoHeaderRefresh";
import { getSongV1Item } from "@/api/songLocalService";
import { uuid } from "@/utils/helpers";

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
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const himnoId = id || state?.himno?.id;

  const loadHimnoFromJson = async (filename?: string, bustCache: boolean = false) => {
    if (!filename) return null;

    try {
      const item = await getSongV1Item(filename, bustCache);
      const loadedHimno = {
        ...item,
        paragraphs: item.paragraphs.map(it => ({
          ...it,
          id: it.id || uuid(),
          chorusPos: it.chorusPos || []
        }))
      };
      return loadedHimno;
    } catch (error) {
      console.error('Error loading hymn from JSON:', error);
      return null;
    }
  };

  const refreshHymn = async () => {
    if (!himnoId) return;

    setLoading(true);
    try {
      const songFromContext = getSongById(himnoId);
      if (songFromContext?.filename) {
        const reloadedHimno = await loadHimnoFromJson(songFromContext.filename, true);
        if (reloadedHimno) {
          setHimno(reloadedHimno);
          setRefreshKey(prev => prev + 1);
        }
      } else if (songFromContext) {
        setHimno(songFromContext);
        setRefreshKey(prev => prev + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadHimno = async () => {
      if (!state?.himno && himnoId) {
        const songFromContext = getSongById(himnoId);
        if (songFromContext) {
          if (songFromContext.filename) {
            const loadedHimno = await loadHimnoFromJson(songFromContext.filename);
            if (loadedHimno) {
              setHimno(loadedHimno);
            }
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
    <>
      <Hero
        title={title}
        hrefBefore={'/' + ERoutes.homeQuechua}
        extraContent={<HimnoHeaderRefresh onRefresh={refreshHymn} loading={loading} />}
      />

      <Box style={{ padding: "8px 4px", paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.bkgWhite}}>
        <div style={{ minHeight: "calc(100vh - 110px)", padding: "0 4px" }}>
          <WrapItemHimno key={refreshKey} paragraphs={paragraphs} chorus={chorus || []} />
        </div>
      </Box>

      <HimnoSongFooter id={himno.id} add={addToFav} remove={rmToFav} />
    </>
  );
};

export default HimnoSongQuechuaScreen;
