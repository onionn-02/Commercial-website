"use client";

import { useEffect } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { telLink, whatsappLink } from "@/lib/site";

// In this Next.js version the error boundary receives `retry` (not `reset`).
export default function SiteError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-zinc-600">
        We couldn&apos;t load this page. Please try again, or contact us directly to order.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button size="lg" onClick={() => retry()} className="h-11 px-5 text-base">
          Try again
        </Button>
        <a
          href={whatsappLink("Hi, I'd like to enquire about auto parts.")}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5 text-base" })}
        >
          <MessageCircle /> WhatsApp
        </a>
        <a href={telLink()} className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5 text-base" })}>
          <Phone /> Call
        </a>
      </div>
    </div>
  );
}
