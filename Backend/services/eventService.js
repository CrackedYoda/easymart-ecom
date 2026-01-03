import axios from "axios";
import crypto from "crypto";
import config from "config";

export const generateSignature = (data) => {
  return crypto
    .createHmac("sha256", config.get("WEBHOOK_SECRET"))
    .update(data)
    .digest("hex");
};

export const verifySignature = (rawBody, receivedSignature) => {
  if (!receivedSignature) return false;
  const expectedSignature = generateSignature(rawBody);
  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(receivedSignature);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

export const verifyTimeStamp = (timeStamp) => {
  const currentTimestamp = new Date().getTime();
  const receivedTimestamp = new Date(timeStamp).getTime();
  const timeDifference = Math.abs(currentTimestamp - receivedTimestamp);
  return timeDifference < config.get("WEBHOOK_TIMEOUT");
};

export const eventEmitter = async (event, data) => {
  const body = {
    event,
    eventId: crypto.randomUUID(),
    data,
    timeStamp: new Date().toISOString(),
  };
  const timeStamp = new Date().toISOString();

  const raw = JSON.stringify(body);
  const signature = generateSignature(raw);

  try {
    await axios.post("http://localhost:4000/api/webhook", body, {
      headers: {
        "Content-Type": "application/json",
        "x-webhook-signature": signature,
        "x-webhook-timestamp": timeStamp,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//WEB HOOK WITH SIGNATURE VERIFICATION
