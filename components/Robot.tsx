"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { MediaButton } from "@/components/ui/media-button";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-screen  relative overflow-hidden">
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="order-1 flex-1 md:flex-none md:w-1/3 p-6 md:p-8 relative z-10 flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-neutral-100 dark:to-neutral-300">
            Feedback Pulse
          </h1>

          <p className="text-neutral-100 max-w-xl text-base md:text-lg">
            Feedback Pulse helps teams collect, manage, and act on user feedback
            in real time. Embed a lightweight widget on your website, capture
            insights instantly, and manage everything from a powerful admin
            dashboard ; no friction, no clutter.
          </p>

          <div className="pt-6 md:pt-10">
            <MediaButton
              label="Get Started"
              mediaUrl="https://www.w3schools.com/howto/rain.mp4"
            />
          </div>
        </div>

        {/* Right content */}
        <div className="order-2 flex-1 relative min-h-[320px] md:min-h-0 flex items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/wMjSw4YBVYUQcYZs/scene.splinecode"
            className="w-full h-full max-h-[480px] md:max-h-none"
          />
        </div>
      </div>
    </Card>
  );
}
