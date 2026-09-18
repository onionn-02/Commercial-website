import { MessageCircle, Phone } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a
        href={telLink()}
        aria-label="Call now"
        className="flex size-13 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg"
      >
        <Phone className="size-6" />
      </a>
      <a
        href={whatsappLink("Hi, I'd like to enquire about auto parts.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
