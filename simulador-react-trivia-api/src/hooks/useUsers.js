// src/hooks/useUsers.js
// Hook para buscar uma lista de usuários da API (ex.: JSONPlaceholder)

import { useEffect, useState } from "react";
import { apiGet } from "../services/apiClient";

export function useUsers() {
  // estados: dados, carregamento e erro
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");
        // rota de exemplo "users"
        const resp = await apiGet("users", { signal: controller.signal });
        setData(resp || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Erro ao carregar");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
