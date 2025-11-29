// src/hooks/useQuestions.js
import { useEffect, useState } from "react";
import { apiGet } from "../services/apiClient";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const MAP = {
  UNICAMP: ["science", "history", "geography"],
  FUVEST: ["science", "history", "arts_and_literature"],
  UTFPR:  ["science", "geography", "general_knowledge"],
  UEM:    ["science", "history"],
  UNESP:  ["science", "history", "music", "film_and_tv"],
};

export function useQuestions({ prova = "UNICAMP", qtd = 10, diff = ["easy","medium"] }) {
  const [data, setData]   = useState([]);
  const [loading, setL]   = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setL(true); setError("");
        const cats = (MAP[prova] || ["general_knowledge"]).join(",");
        const difs = diff.join(",");
        const raw = await apiGet(
          `questions?limit=${qtd}&categories=${cats}&difficulties=${difs}`,
          { signal: controller.signal }
        );
        const norm = (raw || []).map((q) => {
          const answers = shuffle([q.correctAnswer, ...(q.incorrectAnswers || [])]);
          const correctIndex = answers.indexOf(q.correctAnswer);
          return {
            id: q.id,
            question: q.question?.text || "",
            answers,
            correctIndex,
            tags: q.tags || [],
            difficulty: q.difficulty || "",
            category: q.category || "",
          };
        });
        setData(norm);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Erro ao carregar");
      } finally { setL(false); }
    }
    load();
    return () => controller.abort();
  }, [prova, qtd, diff]);

  return { data, loading, error };
}
