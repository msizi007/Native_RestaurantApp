import { supabase } from "@/lib/superbase";
import { imageResponse } from "@/types/Globals";

export async function getImages(
  bucket: string,
  folderPath: string,
): Promise<imageResponse[]> {
  try {
    // 1. Use the 'folderPath' argument instead of hardcoding "menu"
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) throw error;

    // 2. Generate Public URLs
    const imagesWithUrls = data.map((file) => {
      // Ensure we don't try to get a URL for a sub-folder placeholder
      const fullPath = `${folderPath}/${file.name}`.replace(/\/+/g, "/");

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fullPath);

      return {
        ...file,
        publicUrl: urlData.publicUrl,
      };
    });

    // 3. Filter out any folder placeholders (items without an id)
    return imagesWithUrls.filter((img) => img.id !== null);
  } catch (error: any) {
    console.error("Error fetching images:", error.message);
    return [];
  }
}
