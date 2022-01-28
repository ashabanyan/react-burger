import { useEffect } from "react";

const FeedPage = () => {
  const ws = new WebSocket("wss://norma.nomoreparties.space/api/orders/all");

  useEffect(() => {
    console.log("Hello");
    ws.onmessage = (event) => console.log(event);
  });

  return <div></div>;
};

export default FeedPage;
