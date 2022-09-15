import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../slices/authSlice";
import { getAllTweetAsync, selectFeed } from "../slices/tweetSlice";
import { SvgIcon } from "@mui/material";
import Tweet from "./Tweet";

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

const Activity = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const tweets = useSelector(selectFeed);

  useEffect(() => {
    dispatch(getAllTweetAsync(token));
  }, [dispatch, token]);

  return (
    <>
      {tweets
        .filter((tweet) => tweet.isThreadInitiator)
        .map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
    </>
  );
};

export default Activity;
