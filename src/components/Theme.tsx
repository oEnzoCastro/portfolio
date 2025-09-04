import { Binary, Drone, Pyramid, RocketIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Prism from "./Backgrounds/Prism";
import FaultyTerminal from "./Backgrounds/FaultyTerminal";
import Particles from "./Backgrounds/Particles";
import PixelBlast from "./Backgrounds/PixelBlast";

export default function Theme() {
  return (
    <Tabs defaultValue="tab-1" className="items-center">
      <TabsList className="z-0 fixed top-5">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger value="tab-1" className="py-3 cursor-pointer">
                  <Pyramid size={16} aria-hidden="true" />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              Simple
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger value="tab-2" className="group py-3 cursor-pointer">
                  <span className="relative">
                    <Drone size={16} aria-hidden="true" />
                  </span>
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              CyberPunk
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger value="tab-3" className="py-3 cursor-pointer">
                  <RocketIcon size={16} aria-hidden="true" />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">Space</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TabsTrigger value="tab-4" className="py-3 cursor-pointer">
                  <Binary size={16} aria-hidden="true" />
                </TabsTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">Pixel</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TabsList>
      <TabsContent value="tab-1">
        <div
          className="fixed w-full z-[-1] left-0 h-dvh top-0 bg-black"
          // style={{ width: "100dvw", height: "100dvh", position: "absolute" }}
        >
          <Prism
            animationType="3drotate"
            suspendWhenOffscreen={true}
            timeScale={0.3}
            height={3}
            baseWidth={5}
            scale={2}
            hueShift={0}
            colorFrequency={0.5}
            noise={0}
            bloom={0}
            glow={1}
          />
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <div className="fixed w-full z-[-1] left-0 h-[100dvh] top-0 bg-black">
          <FaultyTerminal
            scale={3}
            digitSize={3}
            timeScale={0.05}
            scanlineIntensity={0.1}
            glitchAmount={10}
            flickerAmount={0}
            noiseAmp={1.2}
            chromaticAberration={5}
            dither={10}
            curvature={0}
            tint="#ff0000"
            mouseReact={false}
            pageLoadAnimation={true}
            brightness={0.5}
          />
        </div>
      </TabsContent>
      <TabsContent value="tab-3">
        <div className="fixed w-full z-[-1] left-0 h-dvh top-0 bg-black">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </TabsContent>
      <TabsContent value="tab-4">
        <div className="fixed w-full z-[-1] left-0 h-dvh top-0 bg-black">
          <PixelBlast
            variant="square"
            pixelSize={10}
            color="#949494"
            patternScale={5}
            patternDensity={1.5}
            pixelSizeJitter={0.5}
            edgeFade={0.1}
            speed={0.02}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
