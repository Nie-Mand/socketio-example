// import {} from "socket";

import { useState } from "react";
import { usePublisher, useSubscriber } from "socket";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const publish = usePublisher();

  // Subscribe to the "message" channel
  useSubscriber("message", (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const msg = formData.get("msg") as string;

    // Publish the message to the "publish" channel
    publish("publish", msg);

    e.currentTarget.reset();
  };

  const status = "online";
  return (
    <>
      <p>My statues: {status}</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="">
          <h4>Write this</h4>
          <input type="text" name="msg" id="" />
        </label>
      </form>

      <div>
        <h3>Received</h3>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </>
  );
}

export default App;
