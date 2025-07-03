// hooks/useFingerprint.ts
import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function useFingerprint() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const cachedId = localStorage.getItem("fp");
    if (cachedId) {
      setFingerprint(cachedId);
      return;
    }

    FingerprintJS.load().then((fp) => {
      fp.get().then((result) => {
        localStorage.setItem("fp", result.visitorId);
        setFingerprint(result.visitorId);
      });
    });
  }, []);

  return fingerprint;
}
