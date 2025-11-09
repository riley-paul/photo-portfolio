import type { CollectionEntry } from "astro:content";
import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate } from "@/lib/utils";

type Props = { blogEntry: CollectionEntry<"blog"> };

const BlogCard: React.FC<Props> = ({ blogEntry }) => {
  return (
    <Item asChild>
      <a href={`/blog/${blogEntry.slug}`}>
        <ItemMedia variant="image">
          <img
            {...blogEntry.data.cover}
            alt="cover photo"
            className="object-cover"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{blogEntry.data.title}</ItemTitle>
          <ItemDescription>{formatDate(blogEntry.data.date)}</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  );
};

export default BlogCard;
