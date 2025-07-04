import React, { useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";
import learning from "../assets/anim/learning.json";
import Lottie from "lottie-react";

function FallbackComponent() {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.5);
    }
  }, []);

  return (
    <main
      className="w-full h-screen bg-[#010035] flex justify-center items-center fixed top-0 left-0 z-50"
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        style={{ height: "40%" }}
        animationData={learning}
      />
    </main>
  );
}

export default FallbackComponent;
