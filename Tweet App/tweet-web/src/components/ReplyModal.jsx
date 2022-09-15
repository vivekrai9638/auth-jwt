import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { selectToken } from "../slices/authSlice";
import { addReplyAsync, addTweetAsync } from "../slices/tweetSlice";

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

const ReplyModal = (props) => {
  const user = useSelector((state) => state.user);
  const token = useSelector(selectToken);
  const [text, setText] = useState("");
  const [isTweetDisabled, setIsTweetDisabled] = useState(true);
  const { rows } = props;
  const dispatch = useDispatch();

  const addReply = (e) => {
    e.preventDefault();
    dispatch(
      addReplyAsync({
        username: user.userName,
        tweetId: props.tweetId,
        token,
        payload: JSON.stringify({ message: text, tags: [] }),
      })
    );
  };

  return (
    <React.Fragment>
      <Flex bg={theme.bg} color={theme.color}>
        <div>
          <img
            src={user.avatar}
            alt="profile"
            width="49px"
            height="49px"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <textarea
            rows={rows || 5}
            placeholder="Reply to this thread!!"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              e.target.value
                ? setIsTweetDisabled(false)
                : setIsTweetDisabled(true);
            }}
          ></textarea>

          <Flex style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <div>
              <Button
                onClick={addReply}
                variant="contained"
                disabled={isTweetDisabled}
                defaultBg={theme.defaultBg}
                darkBg={theme.darkBg}
              >
                Reply
              </Button>
            </div>
          </Flex>
        </div>
      </Flex>
    </React.Fragment>
  );
};

export default ReplyModal;
