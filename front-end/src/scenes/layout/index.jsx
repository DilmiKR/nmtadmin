import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import {useGetProductQuery} from "state/api";

const Layout = () => {

 const isNonMobile = useMediaQuery("(min-width: 600px)");
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const productId  = useSelector((state) => state.global.productId);
  const { data } = useGetProductQuery(productId);
  console.log('data',data)

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
       <Sidebar
        product={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          product={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
