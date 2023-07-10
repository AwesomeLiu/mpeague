'use server'
// more server action usage see:
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

import { handleSheetData } from "./sheet";

export async function uploadFile(formData: FormData): Promise<boolean> {
  const file = formData.get("upload_file") as File;
  const ab = await file.arrayBuffer();
  const success: boolean = await handleSheetData(ab);
  return success;
}