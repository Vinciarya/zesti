"use client";
import FloatingCan from "@/components/FloatingCan";
import { Environment } from "@react-three/drei";
import React, { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "@/hooks/useStore";
gsap.registerPlugin(useGSAP);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);


  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);
  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;
      isReady();

    gsap.set(can1Ref.current.position, { x: -2 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 2 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introT1 = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });
    if(window.scrollY < 20){

      introT1
      .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
      .from(can1GroupRef.current.rotation, { z: 3 }, 0)
      .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
      .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollT1 = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollT1
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

// Can 1 - Center can, main focus
.to(can1Ref.current.position,{x:0, y:0, z:0.5},0)
.to(can1Ref.current.rotation,{z:0},0)
// Can 2 - Left side, further back and tilted outward
.to(can2Ref.current.position,{x:-0.8, y:0.1, z:-0.2},0)
.to(can2Ref.current.rotation,{z:-0.25},0)
// Can 3 - Right side, further back and tilted outward
.to(can3Ref.current.position,{x:0.9, y:0.1, z:-0.2},0)
.to(can3Ref.current.rotation,{z:0.25},0)
// Can 4 - Left elevated, well behind center
.to(can4Ref.current.position,{x:-0.5, y:0.5, z:-0.8},0)
.to(can4Ref.current.rotation,{z:-0.15},0)
// Can 5 - Right elevated, well behind center  
.to(can5Ref.current.position,{x:0.4, y:0.6, z:-0.8},0)
.to(can5Ref.current.rotation,{z:0.15},0)
// Move the entire group together while maintaining their relative positions
.to(
  groupRef.current.position, {x:1, duration:3, ease:"sine.inOut"},
  1.3,
)

  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="strawberryLemonade"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
      <FloatingCan ref={can4Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />
      <FloatingCan
        ref={can5Ref}
        flavor="blackCherry"
        floatSpeed={FLOAT_SPEED}
      />

      <Environment files="/hdr/lobby.hdr" environmentIntensity={0.8} />
    </group>
  );
}
