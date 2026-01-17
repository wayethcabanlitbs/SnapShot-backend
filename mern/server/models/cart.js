// models/Cart.js
export default class CartModel {
  constructor(db) {
    this.collection = db.collection("cart");
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async addItem(item) {
    return await this.collection.insertOne(item);
  }

  async updateQuantity(id, quantity) {
    const { ObjectId } = await import("mongodb");
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity } }
    );
  }

  async deleteItem(id) {
    const { ObjectId } = await import("mongodb");
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
