import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const response = await fetch(`https://gssoslocalizajava-production.up.railway.app/eventos/getById/${id}`);
    const raw = await response.text();

    try {
      const data = JSON.parse(raw);
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ error: "Resposta não era JSON", raw });
    }
  } catch (error) {
    console.error("Erro no proxy:", error);
    return res.status(500).json({ error: "Erro ao buscar dados do backend" });
  }
}
