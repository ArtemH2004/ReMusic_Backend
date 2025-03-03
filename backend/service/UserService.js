import { USER_QUERY } from "../query/UserQuery.js";
import uploadPhoto from "../uploadPhoto.js";
import db from "../db.js";

class UserService {
  async getAll() {
    try {
      const users = await db.query(USER_QUERY.GET_ALL);
      return users;
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  async getById(id) {
    if (!id) {
      throw new Error("User ID is required.");
    }

    try {
      const user = await db.query(USER_QUERY.GET_BY_ID, [id]);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async updatePhoto(photo, id) {
    if (!id) {
      throw new Error("User ID field is required.");
    }

    let uploadedPhoto;
    if (!!photo) {
      uploadedPhoto = await uploadPhoto.saveFile(photo);
    } else {
      uploadedPhoto = null;
    }

    try {
      const updatedUser = await db.query(USER_QUERY.UPDATE_PHOTO, [
        uploadedPhoto,
        id,
      ]);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user photo: ${error.message}`);
    }
  }

  async updateRatingById(rating, id) {
    if (!rating || !id) {
      throw new Error("Rating and Artist ID fields are required.");
    }

    try {
      const updatedUser = await db.query(USER_QUERY.UPDATE_RATING_BY_ID, [
        rating,
        id,
      ]);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user rating: ${error.message}`);
    }
  }

  async delete(id) {
    if (!id) {
      throw new Error("User ID is required.");
    }

    try {
      const deletedUser = await db.query(USER_QUERY.DELETE, [id]);
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default new UserService();
