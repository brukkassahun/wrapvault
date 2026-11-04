export async function uploadToBlob(file: File, filename: string): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  try {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, file, {
      access: "public",
      token,
    });
    return blob.url;
  } catch {
    return null;
  }
}
