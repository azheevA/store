/* eslint-disable @next/next/no-img-element */
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ImageProps } from "next/image";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

vi.mock("next/image", () => ({
  default: (props: ImageProps) => {
    const src =
      typeof props.src === "string"
        ? props.src
        : "src" in props.src
          ? props.src.src
          : props.src.default.src;

    return <img src={src} alt={props.alt} className={props.className} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children?: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
