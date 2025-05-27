"use client";

import { useEffect, useState } from "react";

export default function page() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/v1/user")
      .then((res) => res.json())
      .then((data) => setMessage(data.message || "No message"))
      .catch(() => setMessage("Error"));
  }, []);

  return <div>{JSON.stringify(message)}</div>;
}
