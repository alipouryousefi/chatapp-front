import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId });
  const divRef = useRef<null | HTMLDivElement>(null);
  const location = useLocation();
  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId,
          content: message,
        },
      },
    });
    setMessage("");
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{(data?.chat as any)?.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages?.messages.map((message) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid size={{ xs: 3, md: 1 }}>
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid size={{ xs: 9, md: 11 }}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.9rem" }}>
                    {(message as any).content}
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    marginLeft: "0.25rem",
                  }}
                >
                  {new Date((message as any).createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={handleCreateMessage}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
