import List from "@mui/material/List";
import ChatListItem from "./ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./ChatListAdd";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack sx={{ height: "100vh", width: "100%" }}>
        <ChatListHeader
          handleAddChat={() => {
            setChatListAddVisible(true);
          }}
        />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            //   maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
          <ChatListItem />
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
