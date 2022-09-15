import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../slices/authSlice";
import { getAllTweetAsync, likeTweetAsync, selectFeed } from "../slices/tweetSlice";
import { SvgIcon } from "@mui/material";

export const PeopleFlex = styled.div`
  display: flex;
  padding: ${(props) => (props.padding ? props.padding : "10px 15px")};
  color: rgb(0, 0, 0);
  border-bottom: ${(props) => `1px solid ${props.border}`};
  &:hover {
    background-color: ${(props) => props.tweetHov};
  }
`;

export const Text = styled.span`
  margin-left: 3px;
  font-weight: 400;
  font-size: 15px;
  color: ${(props) => props.color};
`;

const User = styled.div`
  width: 10%;
  margin-right: 10px;
  @media (max-width: 1024px) {
    width: 15%;
  }
  @media (max-width: 576px) {
    width: 20%;
  }
`;

const UserImage = styled.img`
  width: 49px;
  height: 49px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ActivityBox = styled.button`
  display: flex;
  align-items: center;
  div {
    display: flex;
    padding: ${(props) => props.noPadding || "15%"};
  }
  &:hover {
    div {
      background-color: ${(props) => props.hoverBg};
    }
    svg {
      fill: ${(props) => props.hoverColor};
    }
    span {
      color: ${(props) => props.hoverColor};
    }
  }
`;

const ActivityIcon = styled.div`
  border-radius: 50%;
`;

const commentPath = [
  "M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z",
];

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

const TweetDetails = styled.div`
  display: flex;
  h3 {
    color: ${(props) => props.color};
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    margin-right: 2px;
  }
  p {
    margin: 0;
    margin-right: 8px;
    color: rgb(101, 119, 134);
    font-weight: 400;
    font-size: 15px;
  }
  span {
    color: rgb(101, 119, 134);
  }
  h3:hover {
    text-decoration: underline;
  }
  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
  }
`;
const likePath = [
  "M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z",
];

const Tweet = ({ tweet }) => {
  const date = new Date(tweet.timestamp);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const user = useSelector((state) => state.user);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const handleLike=(e) => {
    e.preventDefault();
    dispatch(likeTweetAsync({username: user.userName, tweetId: tweet.id, token}))
  }

  return (
    <Link
      key={tweet.id}
      to={`/${tweet.user.userName}/status/${tweet.id}`}
      style={{ textDecoration: "none" }}
    >
      <PeopleFlex hover border={theme.border} tweetHov={theme.tweetHov}>
        <User>
          <UserImage src={tweet.user.avatar} />
        </User>
        <div style={{ width: "80%" }}>
          <TweetDetails color={theme.color}>
            {/* <object> to hide nested <a> warning */}
            <object>
              <Link to={`#`}>
                <h3>
                  {tweet.user.firstName} {tweet.user.lastName}
                </h3>
              </Link>
            </object>
            <p
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                maxWidth: "18%",
              }}
            >
              @{tweet.user.userName}
            </p>
            <span>
              {date.toLocaleString("default", { month: "short" })}{" "}
              {date.getDate()}{" "}
              {new Date().getFullYear() !== date.getFullYear() &&
                date.getFullYear()}
            </span>
          </TweetDetails>
          <div style={{ color: theme.color, wordBreak: "break-word" }}>
            {tweet.message}
          </div>

          <TweetDetails style={{ justifyContent: "end" }}>
            <ActivityBox
              hoverColor="rgb(29,161,242)"
              hoverBg="rgba(29,161,242,0.1)"
              //   onClick={onClick}
            >
              <ActivityIcon>
                <SvgIcon
                  width="18.75px"
                  height="18.75px"
                  fill="rgb(101, 119, 134)"
                >
                  <path d={commentPath}></path>
                </SvgIcon>
              </ActivityIcon>
              <Text color="rgb(101, 119, 134)">{tweet.replies?.length}</Text>
            </ActivityBox>

            <ActivityBox
                onClick={handleLike}
              disabled={likeDisabled}
              hoverColor="rgb(224,36,94)"
              hoverBg="rgba(224,36,94,0.1)"
            >
              <ActivityIcon>
                <SvgIcon
                  width="18.75px"
                  height="18.75px"
                  fill={
                    tweet.selfLiked ? "rgb(224, 36, 94)" : "rgb(101, 119, 134)"
                  }
                >
                  <path d={likePath}></path>
                </SvgIcon>
              </ActivityIcon>
              <Text
                color={
                  tweet.selfLiked ? "rgb(224, 36, 94)" : "rgb(101, 119, 134)"
                }
              >
                {tweet.likes?.length}
              </Text>
            </ActivityBox>
          </TweetDetails>
        </div>
      </PeopleFlex>
    </Link>
  );
};

export default Tweet;
