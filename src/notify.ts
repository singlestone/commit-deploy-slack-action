import fetch from "node-fetch";

export const notifySlackWebhook = async (
  webhookUrl: string,
  message: string
) => {
  const response = await fetch(webhookUrl, {
    method: "POST",
    body: message,
  });
  return response.text();
};
