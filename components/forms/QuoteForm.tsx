"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { getServices } from "@/lib/data";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

const projectTypes = ["Home", "Shop", "Office", "Commercial", "Other"];

function PillOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-ink/15 text-ink/70 hover:border-ink/40"
      )}
    >
      {label}
    </button>
  );
}

export function QuoteForm() {
  const services = getServices();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  const [service, setService] = useState(preselected);
  const [projectType, setProjectType] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const serviceLabel =
    services.find((s) => s.slug === service)?.title ?? service;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const whatsappMessage = [
    `Hi, I'd like a quote for ${serviceLabel || "some work"}.`,
    projectType && `Project type: ${projectType}`,
    location && `Location: ${location}`,
    name && `Name: ${name}`,
    phone && `Phone: ${phone}`,
    notes && `Notes: ${notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (submitted) {
    return (
      <div className="rounded-3xl border border-ink/10 p-8 text-center">
        <h2 className="text-xl font-medium text-ink">We got it.</h2>
        <p className="mt-2 text-sm text-metal-700">
          We&apos;ll call you at {phone || "the number you shared"} within 24
          hours. You can also reach us directly:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={siteConfig.phoneHref}
            className="min-h-[44px] rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink"
          >
            Call {siteConfig.phone}
          </a>
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
          >
            Send on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/*
        TODO: once a Web3Forms/Formspree access key is available, POST this
        form data there instead of (or in addition to) the WhatsApp handoff
        below — see docs/08-lead-generation-and-seo.md.
      */}
      <div>
        <p className="text-sm font-medium text-ink">What do you need?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.map((s) => (
            <PillOption
              key={s.slug}
              label={s.title}
              selected={service === s.slug}
              onClick={() => setService(s.slug)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Project type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <PillOption
              key={type}
              label={type}
              selected={projectType === type}
              onClick={() => setProjectType(type)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 min-h-[48px] w-full rounded-xl border border-ink/15 px-4 text-base text-ink outline-none focus:border-ink/40"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-ink">Phone</span>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-2 min-h-[48px] w-full rounded-xl border border-ink/15 px-4 text-base text-ink outline-none focus:border-ink/40"
            placeholder="10-digit mobile number"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">Location</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 min-h-[48px] w-full rounded-xl border border-ink/15 px-4 text-base text-ink outline-none focus:border-ink/40"
          placeholder="Village / town / city"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">
          Anything else? (optional)
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-base text-ink outline-none focus:border-ink/40"
          placeholder="Approximate size, timeline, or anything we should know"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">
          Upload photos (optional)
        </span>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="mt-2 block w-full text-sm text-metal-700 file:mr-4 file:min-h-[44px] file:rounded-full file:border-0 file:bg-metal-100 file:px-4 file:text-sm file:font-medium file:text-ink"
        />
      </label>

      <button
        type="submit"
        className="min-h-[48px] w-full rounded-full bg-accent px-6 text-sm font-medium text-paper hover:bg-accent-dark sm:w-auto"
      >
        Request Quote
      </button>
    </form>
  );
}
