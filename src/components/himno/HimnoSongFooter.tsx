import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex } from "@components/ui";
import ButtonSingle from "@/components/elements/ButtonSingle";
import { ID } from "@/types/types";
import { SettingContext } from "@/state/SettingContext";
import ButtonStar, { TypeStar } from "../ButtonStar";
import { findFav } from "@/lib/storage";
import { useAuth } from "@/state/AuthContext";
import { routeList } from "@/utils/constant";


interface Props {
  id: ID;
  add: (favId: string) => void;
  remove: (favId: string) => void
}

const HimnoSongFooter: FC<Props> = ({id, add, remove}) => {
  const { decrementFontSize, incrementFontSize } = useContext(SettingContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleFavorite = (star: TypeStar) => {
    if (star === "star") addFavorite();
    else {
      if (window.confirm("Esta de acuerdo en Borrar... ?")) handleRemove();
    }
  };

  const addFavorite = async () => {
    add(id);
  };

  const handleRemove = () => {
    remove(id);
  };

  const handleEdit = () => {
    navigate(routeList.edit(id));
  };

  return (
    <>
      <Box className="hidden md:block" style={{position: "sticky", bottom: 0}}>
        <Flex style={{position: "absolute", bottom: 0, left: 0, zIndex:1}}>
          <ButtonSingle title="-T" onClick={() => decrementFontSize()} />

          <ButtonSingle title="+T" onClick={() => incrementFontSize()} />
        </Flex>
      </Box>

      <div className="hidden md:flex" style={{ position: "fixed", bottom: 16, right: 16, flexDirection: "column", gap: 8, zIndex: 2 }}>
        {user && (
          <button
            onClick={handleEdit}
            style={{
              padding: "12px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: 50,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: "bold",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              minWidth: 80,
              justifyContent: "center",
            }}
          >
            ✏️ Editar
          </button>
        )}
        <ButtonStar initStar={!!findFav(id)} onToggle={toggleFavorite} />
      </div>
    </>
  );
};

export default HimnoSongFooter;
