import { ofetch } from "ofetch";

export const notifySlackWebhook = async (
  webhookUrl: string,
  message: string,
) => {
  return ofetch(webhookUrl, {
    method: "POST",
    body: message,
    responseType: "text",
  });
};
