import Link from "next/link";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export function StickyMobileCta() {
  const whatsappHref = buildWhatsAppLink(
    "Hi, I'd like to get a quote for some fabrication/interior work."
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/10 bg-paper/95 backdrop-blur lg:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-ink"
      >
        <span aria-hidden>📞</span>
        Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 border-x border-ink/10 py-2.5 text-xs font-medium text-ink"
      >
        <span aria-hidden>💬</span>
        WhatsApp
      </a>
      <Link
        href="/quote"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-accent py-2.5 text-xs font-medium text-paper"
      >
        <span aria-hidden>✎</span>
        Get a Quote
      </Link>
    </div>
  );
}
