import { Request, Response } from "express";
import { ItemService } from "../service/items.service";

export class ItemController {
  static async create(req: Request, res: Response) {
    try {
      const item = await ItemService.create(req.body);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar item" });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const items = await ItemService.findAll();
      return res.json(items);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar items" });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const item = await ItemService.findById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item não encontrado" });
      return res.json(item);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar item" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await ItemService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Item não encontrado" });
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar item" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deleted = await ItemService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Item não encontrado" });
      return res.json({ message: "Item removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover item" });
    }
  }
}
