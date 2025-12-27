import { Suspense } from "react";
import WidgetFrameClient from "./WidgetFrameClient";

export default function WidgetFramePage() {
  return (
    <Suspense fallback={<div />}>
      <WidgetFrameClient />
    </Suspense>
  );
}
