import List from "@mui/material/List";
import ChatListItem from "./ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import { useState } from "react";
import ChatListAdd from "./ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data } = useGetChats();
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
          {data?.chats.map((chat: any) => (
            <ChatListItem key={chat.id} name={chat?.name} />
          ))}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
