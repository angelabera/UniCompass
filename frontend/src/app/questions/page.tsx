"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Plus, Send, UserRound } from "lucide-react";
import api from "@/lib/api";
import { useStore } from "@/store/useStore";

interface Author {
  id: string;
  name?: string | null;
  email: string;
}

interface CollegeSummary {
  id: string;
  name: string;
}

interface Answer {
  id: string;
  content: string;
  createdAt: string;
  user: Author;
}

interface Question {
  id: string;
  content: string;
  createdAt: string;
  user: Author;
  college?: CollegeSummary | null;
  answers: Answer[];
}

const authorName = (author?: Author) => {
  if (!author) return "Student";
  return author.name || author.email.split("@")[0] || "Student";
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(date));

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err instanceof AxiosError) {
    const data = err.response?.data as { error?: string } | undefined;
    return data?.error || fallback;
  }

  return fallback;
};

export default function QuestionsPage() {
  const { isAuthenticated } = useStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionContent, setQuestionContent] = useState("");
  const [answerContent, setAnswerContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submittingAnswerId, setSubmittingAnswerId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/questions");
      setQuestions(response.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Could not load questions right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchQuestions();
    });
  }, [fetchQuestions]);

  const handleAskQuestion = async (event: FormEvent) => {
    event.preventDefault();
    const content = questionContent.trim();
    if (!content) return;

    try {
      setSubmittingQuestion(true);
      setError("");
      const response = await api.post("/questions", { content });
      setQuestions((current) => [response.data, ...current]);
      setQuestionContent("");
    } catch (err: unknown) {
      console.error("Error asking question:", err);
      setError(getErrorMessage(err, "Please log in to ask a question."));
    } finally {
      setSubmittingQuestion(false);
    }
  };

  const handleAnswerQuestion = async (questionId: string) => {
    const content = answerContent[questionId]?.trim();
    if (!content) return;

    try {
      setSubmittingAnswerId(questionId);
      setError("");
      const response = await api.post(`/questions/${questionId}/answers`, { content });
      setQuestions((current) =>
        current.map((question) =>
          question.id === questionId
            ? { ...question, answers: [...question.answers, response.data] }
            : question
        )
      );
      setAnswerContent((current) => ({ ...current, [questionId]: "" }));
    } catch (err: unknown) {
      console.error("Error answering question:", err);
      setError(getErrorMessage(err, "Please log in to answer this question."));
    } finally {
      setSubmittingAnswerId(null);
    }
  };

  return (
    <div className="py-8">
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-teal-600 px-6 py-10 text-white shadow-2xl shadow-blue-500/20 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/15 border border-white/25 px-3 py-1 rounded-full mb-4 backdrop-blur">
              <MessageCircle className="h-3.5 w-3.5" />
              Student Q&A
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 drop-shadow-sm md:text-5xl">Questions & Answers</h1>
            <p className="text-base leading-7 text-white/90 max-w-2xl">
              Ask practical college questions and help other students with quick answers.
            </p>
          </div>
          <div className="hidden rounded-2xl border border-white/25 bg-white/15 p-4 shadow-lg backdrop-blur md:block">
            <HelpCircle className="mb-3 h-8 w-8 text-white" />
            <p className="text-sm font-semibold">Real questions. Clear answers.</p>
            <p className="mt-1 text-xs text-white/80">Keep discussions useful and specific.</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Start a discussion</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">Short, specific questions get better answers.</p>
      </div>

      <form onSubmit={handleAskQuestion} className="glass-panel rounded-2xl p-4 md:p-5 mb-8">
        <label htmlFor="question" className="block text-sm font-medium text-foreground mb-2">
          Ask a question
        </label>
        <textarea
          id="question"
          value={questionContent}
          onChange={(event) => setQuestionContent(event.target.value)}
          disabled={!isAuthenticated || submittingQuestion}
          rows={3}
          className="block w-full resize-none bg-background/90 border border-border rounded-xl px-3 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-60"
          placeholder={isAuthenticated ? "What would you like to know?" : "Log in to ask a question"}
        />
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Keep it clear and specific so others can answer faster.</p>
          {isAuthenticated ? (
            <button
              type="submit"
              disabled={!questionContent.trim() || submittingQuestion}
              className="btn-primary inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-semibold disabled:opacity-50 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              {submittingQuestion ? "Posting..." : "Post Question"}
            </button>
          ) : (
            <Link
              href="/login"
              className="btn-primary inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-semibold transition-all"
            >
              Log in
            </Link>
          )}
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="premium-card rounded-2xl p-5 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-4" />
              <div className="h-5 bg-muted rounded w-3/4 mb-3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : questions.length > 0 ? (
        <div className="space-y-5">
          {questions.map((question, index) => (
            <motion.article
              key={question.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              className="premium-card rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center">
                    <UserRound className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    {authorName(question.user)}
                  </span>
                  <span>{formatDate(question.createdAt)}</span>
                  {question.college && (
                    <Link href={`/colleges/${question.college.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {question.college.name}
                    </Link>
                  )}
                </div>
                <h2 className="text-lg font-bold leading-snug text-foreground">{question.content}</h2>
              </div>

              <div className="border-t border-border bg-gradient-to-br from-muted/35 to-background/60 px-5 py-4">
                <div className="space-y-3">
                  {question.answers.length > 0 ? (
                    question.answers.map((answer) => (
                      <div key={answer.id} className="rounded-xl bg-background/90 border border-border p-3 shadow-sm">
                        <p className="text-sm text-foreground leading-relaxed">{answer.content}</p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          {authorName(answer.user)} · {formatDate(answer.createdAt)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No answers yet.</p>
                  )}
                </div>

                {isAuthenticated && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input
                      value={answerContent[question.id] || ""}
                      onChange={(event) =>
                        setAnswerContent((current) => ({
                          ...current,
                          [question.id]: event.target.value
                        }))
                      }
                      disabled={submittingAnswerId === question.id}
                      className="flex-1 bg-background/90 border border-border rounded-xl px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:opacity-60"
                      placeholder="Write an answer..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAnswerQuestion(question.id)}
                      disabled={!answerContent[question.id]?.trim() || submittingAnswerId === question.id}
                      className="inline-flex items-center justify-center h-10 px-4 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Answer
                    </button>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/20">
          <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No questions yet</h3>
          <p className="text-sm text-muted-foreground">Start the first discussion for other students.</p>
        </div>
      )}
    </div>
  );
}
