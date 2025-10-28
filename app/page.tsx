"use client"
import { useEffect, useState } from "react";
export default function Home() {
  const [message, setMessage] = useState();
  useEffect(() => {
    window.addEventListener('message', function (event) {
      // event.origin contains the origin of the sender
      // event.data contains the message sent
      // event.source refers to the Window object of the sender
      // if (event.origin !== 'http://example.com') { // Verify sender's origin for security
      //   return;
      // }
      setMessage(event.data.toString());
      console.log('Received message: ', event.data);
    });
  }, [])
  return (
    <div className="bg-red-500">
      <p className="text-white">{message}</p>
    </div>
  );
}
