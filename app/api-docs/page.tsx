"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs")
      .then((res) => res.json())
      .then(setSpec);
  }, []);

  if (!spec) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-secondary border-t-primary h-8 w-8 animate-spin rounded-full border-4" />
      </div>
    );
  }

  return (
    <div className="swagger-wrapper">
      <SwaggerUI spec={spec} />
      <style jsx global>{`
        .swagger-wrapper .swagger-ui .topbar {
          display: none;
        }
        .swagger-wrapper .swagger-ui {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
      `}</style>
    </div>
  );
}
