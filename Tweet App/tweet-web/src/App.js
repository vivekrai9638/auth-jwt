import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Grid } from "@mui/material";
import MenuBar from "./components/Menubar";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "./slices/authSlice";
import TweetDetail from "./pages/TweetDetail";

const theme = {
  mode: "default",
  bg: "rgb(255,255,255)",
  color: "rgb(0,0,0)",
  lightBg: "rgba(29,161,242,1)",
  darkBg: "rgb(26,145,218)",
  defaultBg: "rgb(29,161,242)",
  opaqueBg: "rgba(29, 161, 242, 0.1)",
  border: "rgb(230, 236, 240)",
  tweetHov: "rgb(245, 248, 250)",
  para: "rgb(101, 119, 134)",
  modalBg: "rgba(0, 0, 0, 0.4)",
  boxShadow:
    "rgba(101,119,134,0.2) 0px 0px 15px, rgba(101,119,134,0.15) 0px 0px 3px 1px",
};

const WithMenuBar = (props) => {
  return (
    <Grid container style={{ background: theme.bg }}>
      <Grid item md={3} xs={3}>
        <MenuBar />
      </Grid>
      <Grid item md={5} xs={9}>
        {props.element}
      </Grid>
      <Grid item md={4} xs={0}>
        {/* <SideBar /> */}
      </Grid>
    </Grid>
  );
};

const AuthGuard = ({ children }) => {
  const token = useSelector(selectToken);
  return token ? <>{children}</> : <Login />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <WithMenuBar element={<Home />} />
            </AuthGuard>
          }
        />

        <Route
          exact
          path="/:username/status/:tweetId"
          element={
            <AuthGuard>
              <WithMenuBar element={<TweetDetail />} />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
