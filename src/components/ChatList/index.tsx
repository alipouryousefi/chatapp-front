import List from "@mui/material/List";
import ChatListItem from "./ChatListItem";
import { Divider, Stack } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import { useEffect, useState } from "react";
import ChatListAdd from "./ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data } = useGetChats();
  const { path } = usePath();

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);
  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack sx={{ height: "100%", width: "100%" }}>
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
            maxHeight: "84vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat: any) => (
              <ChatListItem key={chat.id} chat={chat} selected={chat._id === selectedChatId} />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
