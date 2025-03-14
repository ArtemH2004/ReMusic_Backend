class UploadPhoto {
    async saveFile(file) {
      if (!file) {
        throw new Error("Invalid file data");
      }
      return file.filename; // Возвращаем имя сохраненного файла
    }
  }
  
  

export default new UploadPhoto();
