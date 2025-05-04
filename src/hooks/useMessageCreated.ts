import { useSubscription } from "@apollo/client";
import { graphql } from "../gql";
import { updateMessages } from "../cache/messages";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (variables: any) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }: { client: any; data: any }) => {
      if (data?.data) {
        updateMessages(client.cache, data.data.messageCreated);
      }
    },
  });
};
