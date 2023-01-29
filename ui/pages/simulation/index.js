import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Simulation() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <div>
      <h2>Simulate a sale</h2> Go to the animals tab to start a simulation!
    </div>
  );
}
