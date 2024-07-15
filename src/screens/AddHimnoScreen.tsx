import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import FormSongBase from "../components/FormSongBase";
import FormParagraphs from "../components/FormParagraphs";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";
import ItemHimnoLetter, { ILetter } from "../components/himno/ItemHimnoLetter";

const AddHimnoScreen = () => {
  const [letter, setLetter] = useState<ILetter>()
  return (
    <Layout>
      <div style={{ minHeight: "calc(100vh - 193px)" }}>
        <div>
          <div className="">
            {/* <div className="grid grid-cols-12 gap-4"> */}
            {/* <div className="col-span-7 bg-light"> */}
            <Box>
              <LayoutMain>
                <FormSongBase />
              </LayoutMain>
              <LayoutMain>
                <FormParagraphs />
              </LayoutMain>
              <LayoutMain>
                <FormParagraphs />
              </LayoutMain>
            </Box>

            {/* <ItemHimnoLetter item={{
              
            }} /> */}
            {/* </div> */}
          </div>
          <div>
            {/* <div className="col-span-5 bg-bermuda"> */}
            <LayoutMain>
              <ViewSong />
            </LayoutMain>
            {/* </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddHimnoScreen;
