"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

type SmartImageProps = Omit<ImageProps, "onError" | "src"> & {
  src: string;
  label: string;
};

export function SmartImage({ src, label, className, alt, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return <PlaceholderImage label={label} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
