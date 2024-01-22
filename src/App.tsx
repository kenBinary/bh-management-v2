import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RoomManagement from "./pages/RoomManagement";
import TenantManagement from "./pages/TenantManagement";
import PaymentManagement from "./pages/PaymentManagement";
// import { IconContext } from "react-icons";

function App() {
  return (
    // <IconContext.Provider value={{ size: "100%" }}>
    <Box as="main" h="100vh">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/rooms" element={<RoomManagement></RoomManagement>}></Route>
        <Route path="/tenants" element={<TenantManagement></TenantManagement>}></Route>
        <Route path="/payments" element={<PaymentManagement></PaymentManagement>}></Route>
      </Routes>
    </Box>
    // </IconContext.Provider>
  );
}

export default App;
