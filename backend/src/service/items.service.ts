import { Item } from "../models/item.model";

export class ItemService {
  static async create(data: any) {
    return await Item.create(data);
  }

  static async findAll() {
    return await Item.find();
  }

  static async findById(id: string) {
    return await Item.findById(id);
  }

  static async update(id: string, data: any) {
    return await Item.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return await Item.findByIdAndDelete(id);
  }
}
