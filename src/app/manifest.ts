import type { MetadataRoute } from "next";
import { academy } from "@/data/academy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${academy.name} — Technology & Cybersecurity Academy`,
    short_name: academy.shortName,
    description: academy.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070B12",
    theme_color: "#070B12",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
    ],
    categories: ["education", "technology"],
  };
}
