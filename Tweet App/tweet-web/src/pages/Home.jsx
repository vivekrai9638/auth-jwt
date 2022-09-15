import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import TweetModal from "../components/TweetModal";
import { loadUserByUsernameAsync } from "../slices/userSlice";
import { selectToken, selectUsername } from "../slices/authSlice";
import Activity from "../components/Activity";

const ProfileCorner = styled.div`
  border-left: ${(props) => `1px solid ${props.border}`};
  border-right: ${(props) => `1px solid ${props.border}`};
  min-height: 100vh;
  padding-bottom: 20%;
`;

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

const Header = styled.div`
  position: sticky;
  top: 0;
  background: ${(props) => props.bg};
  padding: 10px 15px;
  border-bottom: ${(props) => `1px solid ${props.border}`};
  h2 {
    font-weight: 800;
    color: ${(props) => props.color};
  }
  p {
    color: ${(props) => props.para};
    line-height: 13px;
  }
  * {
    margin-bottom: 0;
  }
`;

const Tweet = styled.div`
  padding: 15px;
  border-bottom: ${(props) => `10px solid ${props.border}`};
`;

const Flex = styled.div`
  display: flex;
  div {
    margin-right: 8px;
  }
  textarea {
    background: ${(props) => props.bg};
    caret-color: ${(props) => props.color};
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.color};
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (username) {
      dispatch(loadUserByUsernameAsync({username, token}));
    }
  }, [username, token, dispatch]);

  return (
    <ProfileCorner border={theme.border}>
      <Header border={theme.border} bg={theme.bg} color={theme.color}>
        <h2>Home</h2>
      </Header>
      <Tweet border={theme.border}>
        <TweetModal rows={3} />
      </Tweet>
      <Activity feed />
    </ProfileCorner>
  );
};

export default Home;
