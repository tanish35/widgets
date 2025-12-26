"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function WidgetFrame() {
  const params = useSearchParams();
  const projectKey = params.get("key");
  const [type, setType] = useState("Bug");
  const [text, setText] = useState("");

  async function submit() {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectKey, type, text }),
    });
    setText("");
    alert("Thanks for the feedback!");
  }

  return (
    <div className="p-4 space-y-3 text-sm">
      <h3 className="font-semibold">Send feedback</h3>

      <select
        className="w-full border rounded px-2 py-1"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Bug</option>
        <option>Feature</option>
        <option>Other</option>
      </select>

      <Textarea
        placeholder="Describe your feedback..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="w-full" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}
