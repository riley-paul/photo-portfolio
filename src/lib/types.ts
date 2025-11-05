import type { CollectionEntry } from "astro:content";
import type { LucideIcon } from "lucide-react";

export type Album = CollectionEntry<"albums"> & {
  photos: string[];
  cover: string;
};

export type Link = {
  name: string;
  link: string;
  active: (pathname: string) => boolean;
  icon?: LucideIcon;
  children?: Link[];
};

export type Contact = {
  name: string;
  link: string;
  icon: LucideIcon;
};
