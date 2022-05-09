import React from "react";
import Layout from "../layout/Layout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import FormMain from "../components/FormMain";
import FormSecondary from "../components/FormSecondary";
import ViewSong from "../components/ViewSong";
import LayoutMain from "../layout/LayoutMain";

const AddHimnoScreen = () => {
  return (
    <Layout>
      <Box style={{ minHeight: "calc(100vh - 193px)" }}>
        <Heading>CREAR NUEVA ALABANZA/CANCION</Heading>
        <Grid templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={7} bg="tomato">
            {/* <div className="grid grid-cols-12 gap-4"> */}
            {/* <div className="col-span-7 bg-light"> */}
            <Box bg="dark">
              <LayoutMain>
                <FormMain />
              </LayoutMain>

              <LayoutMain>
                <FormSecondary />
              </LayoutMain>
            </Box>
            {/* </div> */}
          </GridItem>
          <GridItem colSpan={5} bg="papayawhip">
            {/* <div className="col-span-5 bg-bermuda"> */}
            <LayoutMain>
              <ViewSong />
            </LayoutMain>
            {/* </div> */}
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AddHimnoScreen;
