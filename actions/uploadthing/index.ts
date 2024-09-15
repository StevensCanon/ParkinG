"use server"

import { FileEsque, UploadFileResult } from "uploadthing/types"
import { utapi } from "./uploadthing"

export async function updateProfileImage(formData: FormData) {
  try {
    const files = formData
      .getAll("image")
      .filter((value) => value) as FileEsque[]
    const imageFile = files[0]

    const response: UploadFileResult = await utapi.uploadFiles(imageFile)

    if (response.data) {
      return { success: true, imageUrl: response.data.url }
    }

    return { success: false, imageUrl: null }
  } catch (error) {
    console.log("Error al subir la imagen")
  }
}
