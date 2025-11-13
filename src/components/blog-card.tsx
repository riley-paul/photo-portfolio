import type { CollectionEntry } from "astro:content";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate } from "@/lib/utils";

type Props = { blogEntry: CollectionEntry<"blog"> };

const BlogCard: React.FC<Props> = ({ blogEntry }) => {
  return (
    <Item asChild>
      <a href={`/blog/${blogEntry.slug}`}>
        <ItemMedia variant="image" className="h-20 w-auto">
          <img
            {...blogEntry.data.cover}
            alt="cover photo"
            className="object-cover"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-bold">{blogEntry.data.title}</ItemTitle>
          <ItemDescription>{formatDate(blogEntry.data.date)}</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  );
};

export default BlogCard;
