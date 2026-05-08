"use client";

import { useEffect, useRef, useState } from "react";
import type { FaceMesh, Results } from "@mediapipe/face_mesh";

export function useFaceTracking() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const faceMeshRef = useRef<FaceMesh | null>(null);

  useEffect(() => {
    let active = true;

    async function setup() {
      // Import dynamically to avoid SSR issues
      const { FaceMesh } = await import("@mediapipe/face_mesh");
      
      const faceMesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((res) => {
        if (active) {
          setResults(res);
          setIsLoaded(true);
        }
      });

      faceMeshRef.current = faceMesh;
    }

    setup();

    return () => {
      active = false;
      faceMeshRef.current?.close();
    };
  }, []);

  const processVideo = async (video: HTMLVideoElement) => {
    if (faceMeshRef.current) {
      await faceMeshRef.current.send({ image: video });
    }
  };

  return { isLoaded, results, processVideo };
}
