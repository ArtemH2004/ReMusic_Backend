import * as path from "path";

class UploadMusic {
  async saveFile(file) {
    if (!file || !file.name || !file.data) {
      throw new Error("Invalid file data");
    }
    try {
      const filename = Date.now() + path.extname(file.name);
      const filePath = path.resolve("uploads/music", filename);
      await file.mv(filePath);
      return filename;
    } catch (error) {
      console.error(error);
      throw new Error("File upload failed");
    }
  }
}

export default new UploadMusic();
