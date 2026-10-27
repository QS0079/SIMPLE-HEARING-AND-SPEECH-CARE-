"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const EnquiryContext = createContext({
  service: "",
  setService: () => {},
  open: () => {},
});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export default function EnquiryProvider({ children }) {
  const [service, setService] = useState("");

  // Check URL parameters on mount in case linked from another page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("service");
      if (s) {
        setService(s);
      }
    }
  }, []);

  const open = useCallback((preset = "") => {
    if (preset) {
      setService(preset);
    }

    if (typeof document !== "undefined") {
      const formEl = document.getElementById("appointment-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = formEl.querySelector("input[name='name']");
        setTimeout(() => input?.focus(), 450);
      } else {
        const query = preset ? `?service=${encodeURIComponent(preset)}` : "";
        window.location.href = `/${query}#appointment-form`;
      }
    }
  }, []);

  return (
    <EnquiryContext.Provider value={{ service, setService, open }}>
      {children}
    </EnquiryContext.Provider>
  );
}
