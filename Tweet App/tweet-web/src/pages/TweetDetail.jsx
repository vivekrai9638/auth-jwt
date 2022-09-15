import React from "react";
import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";
import { SvgIcon } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectFeed, selectTweet } from "../slices/tweetSlice";
import Replies from "../components/Replies";
import TweetModal from "../components/TweetModal";
import ReplyModal from "../components/ReplyModal";

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

const HeaderWrapper = styled.div`
  position: sticky;
  background-color: white;
  top: 0;
  border-bottom: ${(props) => `1px solid ${props.border}`};
`;

const BackBtn = styled.div`
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(29, 161, 242, 0.1);
  }
`;

const commentPath = [
  "M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z",
];
const retweetPath = [
  "M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z",
];
const likePath = [
  "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z",
];

const backIconPaths = [
  "M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z",
];

const HeaderP = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: ${(props) => props.bg};
  div {
    margin-right: 10px;
  }
  h2 {
    color: ${(props) => props.color};
    line-height: 1.3;
    margin-bottom: 0;
    font-size: 19px;
    font-weight: 800;
  }
  p {
    color: rgb(101, 119, 134);
    font-size: 13px;
    margin-bottom: 0;
  }
`;

const TweetWrapper = styled.div`
  border-bottom: 1px solid rgb(230, 236, 240);
`;

const UserImage = styled.img`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  margin-right: 10px;
`;

const TweetText = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(230, 236, 240);
  p {
    padding: 5px 0px;
    color: rgb(0, 0, 0);
    font-size: 23px;
    font-weight: 400px;
    margin-bottom: 0;
  }
`;

const ActivityInfo = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(230, 236, 240);
  a {
    margin-right: 10px;
    font-size: 15px;
  }
  a:hover {
    text-decoration: underline;
    text-decoration-color: rgb(0, 0, 0);
  }
  h4 {
    color: ${(props) => props.color};
    display: inline;
  }
  span {
    color: rgb(101, 119, 134);
  }
`;

const Activity = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  padding-top: 3%;
  padding-bottom: 3%;
  div {
    cursor: pointer;
  }
`;




const TweetDetail = () => {
  const navigate = useNavigate();
  const { tweetId } = useParams();

  const tweet = useSelector(selectFeed).find(t => t.id === tweetId);

  return (
    <ProfileCorner border={theme.border}>
      <HeaderWrapper border={theme.border}>
        <HeaderP bg={theme.bg} color={theme.color}>
          <div>
            <BackBtn onClick={() => navigate("/")}>
              <SvgIcon width="22.5px" height="22.5px" fill="rgb(29, 161, 242)">
                <path d={backIconPaths}></path>
              </SvgIcon>
            </BackBtn>
          </div>
          <div>
            <h3>Tweet</h3>
          </div>
        </HeaderP>
      </HeaderWrapper>
      <TweetWrapper>
        <div style={{ padding: "10px 15px 0px 15px" }}>
          <Flex>
            <div>
              <UserImage src={tweet.user.avatar} />
            </div>
            <div>
                <h3 style={{ color: theme.color }}>
                  {tweet.user.firstName} {tweet.user.lastName}
                </h3>
                <p>@{tweet.user.userName}</p>
            </div>
          </Flex>
          <TweetText>
            <p style={{ color: theme.color }}>{tweet.message}</p>
           
            <div style={{ color: theme.para }}>
              {new Date(tweet.timestamp).toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
              })}{" "}
              &middot; {new Date(tweet.timestamp).toLocaleString("default", { month: "long" })}{" "}
              {new Date(tweet.timestamp).getDate()}, {new Date(tweet.timestamp).getFullYear()}
            </div>
          </TweetText>
          <ActivityInfo color={theme.color}>
            <Link to={`#`} replace>
              <h4>{tweet.replies?.length}</h4> <span>Replies</span>
            </Link>
            <Link to={`#`} replace>
              <h4>{tweet.likes?.length}</h4> <span>Likes</span>
            </Link>
          </ActivityInfo>
          <div style={{padding:'10px'}}>
            <ReplyModal tweetId={tweetId} />
          </div>
        </div>
      </TweetWrapper>
      <Replies replies={tweet?.replies}/>
    </ProfileCorner>
  );
};

export default TweetDetail;
