import { NextResponse } from "next/server";

export async function GET() {
  const js = `
(function () {
  const script = document.currentScript;
  const projectKey = script.getAttribute("data-project-key");
  if (!projectKey) return;

  const btn = document.createElement("button");
  btn.innerText = "Feedback";
  btn.style.cssText = \`
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    padding: 10px 14px;
    border-radius: 8px;
    background: black;
    color: white;
    cursor: pointer;
  \`;

  const iframe = document.createElement("iframe");
  iframe.src = \`${process.env.NEXT_PUBLIC_APP_URL}/widget-frame?key=\${projectKey}\`;
  iframe.style.cssText = \`
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 360px;
    height: 420px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,.2);
    display: none;
    z-index: 999999;
  \`;

  btn.onclick = () => {
    iframe.style.display =
      iframe.style.display === "none" ? "block" : "none";
  };

  document.body.appendChild(btn);
  document.body.appendChild(iframe);
})();
  `;

  return new NextResponse(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "no-store",
    },
  });
}
