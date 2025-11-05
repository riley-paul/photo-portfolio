import { getCollection } from "astro:content";
import type { Album, Link } from "./types";

export async function getAlbums(): Promise<Album[]> {
  const albumData = await getCollection("albums");
  const allPhotos = Object.keys(
    import.meta.glob(`/public/albums/**/*.{jpg,jpeg,png}`),
  );

  const albums = albumData.map((album) => {
    const photos = allPhotos
      .filter((photo) => {
        const directoryArray = photo.split("/");
        const directory = directoryArray[directoryArray.length - 2];
        return album.data.slug === directory;
      })
      .map((loc) => loc.replace("/public", ""));

    const cover =
      photos.find((photo) => {
        const directoryArray = photo.split("/");
        const filename = directoryArray[directoryArray.length - 1];
        return filename[0] === "~";
      }) || photos[0];

    return { ...album, photos, cover };
  });

  return albums;
}

export async function getLinks(): Promise<Link[]> {
  const albums = await getCollection("albums");
  const blogs = await getCollection("blog");

  const links: Link[] = [
    {
      name: "Portfolio",
      link: "/",
      active: (pathname) =>
        pathname.startsWith("/portfolio") || pathname === "/",
      children: albums.map((album) => ({
        name: album.data.name,
        link: `/portfolio/${album.data.slug}`,
        active: (pathname) =>
          pathname.startsWith(`/portfolio/${album.data.slug}`),
      })),
    },
    {
      name: "Blog",
      link: "/blog",
      active: (pathname) => pathname.startsWith("/blog"),
      children: blogs.map((blog) => ({
        name: blog.data.title,
        link: `/blog/${blog.slug}`,
        active: (pathname) => pathname.startsWith(`/blog/${blog.slug}`),
      })),
    },
    {
      name: "Contact",
      link: "/contact",
      active: () => false,
    },
    {
      name: "About",
      link: "/about",
      active: (pathname) => pathname.startsWith("/about"),
    },
  ];

  return links;
}
