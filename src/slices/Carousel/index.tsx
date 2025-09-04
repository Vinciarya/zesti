"use client";
import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { Group } from "three";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";
import gsap from "gsap";

const SPINS_ON_Change = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "lemonLime", color: "#710523", name: "Applie" },
  { flavor: "grape", color: "#393c8b", name: "Berry Goodness" },
  { flavor: "blackCherry", color: "#743e79", name: "Graphy Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#82883d",
    name: "GreenPie",
  },
  { flavor: "watermelon", color: "#94844b", name: "Pineaaple Spark" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();
    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_Change}`
            : `+=${Math.PI * 2 * SPINS_ON_Change}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    ).to(
      ".background, .wavy-circles-outer, .wavy-circles-inner",
      {
        backgroundColor: FLAVORS[nextIndex].color,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
    .to(".text-wrapper", {duration: .2, y: -10, opacity:0},0)
    .to({},{onStart:()=> setCurrentFlavorIndex(nextIndex)}, 0.5)
    .to(".text-wrapper", {duration: .2, y: 0, opacity:1},0.7)

   
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel grid-rows-[auto, 4fr, auto] relative grid h-screen justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton
          direction="left"
          label="Previous Flavor"
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
        />

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              floatIntensity={0.3}
              rotationIntensity={1}
              
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flaor"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>

        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

type ArrowButtonProps = {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
};

export default Carousel;

function ArrowButton({ label, onClick, direction = "left" }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:size-16nlg:size-20 size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4"
    >
      <ArrowIcon className={clsx(direction === "left" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
