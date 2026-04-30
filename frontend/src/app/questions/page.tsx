"use client";

import { FormEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Plus, Send, UserRound } from "lucide-react";
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

export default function QuestionsPage() {
  const { isAuthenticated } = useStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionContent, setQuestionContent] = useState("");
  const [answerContent, setAnswerContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submittingAnswerId, setSubmittingAnswerId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
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
  };

  useEffect(() => {
    queueMicrotask(() => {
      fetchQuestions();
    });
  }, []);

  const getErrorMessage = (err: unknown, fallback: string) => {
    if (err instanceof AxiosError) {
      const data = err.response?.data as { error?: string } | undefined;
      return data?.error || fallback;
    }

    return fallback;
  };

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
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 px-3 py-1 rounded-full mb-4">
            <MessageCircle className="h-3.5 w-3.5" />
            Student Q&A
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Questions & Answers</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Ask practical college questions and help other students with quick answers.
          </p>
        </div>
      </div>

      <form onSubmit={handleAskQuestion} className="bg-card border border-border rounded-lg p-4 md:p-5 mb-8 shadow-sm">
        <label htmlFor="question" className="block text-sm font-medium text-foreground mb-2">
          Ask a question
        </label>
        <textarea
          id="question"
          value={questionContent}
          onChange={(event) => setQuestionContent(event.target.value)}
          disabled={!isAuthenticated || submittingQuestion}
          rows={3}
          className="block w-full resize-none bg-background border border-border rounded-md px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
          placeholder={isAuthenticated ? "What would you like to know?" : "Log in to ask a question"}
        />
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Keep it clear and specific so others can answer faster.
          </p>
          {isAuthenticated ? (
            <button
              type="submit"
              disabled={!questionContent.trim() || submittingQuestion}
              className="inline-flex items-center justify-center h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              {submittingQuestion ? "Posting..." : "Post Question"}
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-10 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-5 animate-pulse">
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
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center">
                    <UserRound className="h-3.5 w-3.5 mr-1" />
                    {authorName(question.user)}
                  </span>
                  <span>{formatDate(question.createdAt)}</span>
                  {question.college && (
                    <Link href={`/colleges/${question.college.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {question.college.name}
                    </Link>
                  )}
                </div>
                <h2 className="text-lg font-semibold leading-snug text-foreground">{question.content}</h2>
              </div>

              <div className="border-t border-border bg-muted/20 px-5 py-4">
                <div className="space-y-3">
                  {question.answers.length > 0 ? (
                    question.answers.map((answer) => (
                      <div key={answer.id} className="rounded-md bg-background border border-border p-3">
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
                      className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
                      placeholder="Write an answer..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAnswerQuestion(question.id)}
                      disabled={!answerContent[question.id]?.trim() || submittingAnswerId === question.id}
                      className="inline-flex items-center justify-center h-10 px-4 bg-background border border-border rounded-md text-sm font-medium hover:bg-muted disabled:opacity-50 transition-colors"
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
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-muted/20">
          <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No questions yet</h3>
          <p className="text-sm text-muted-foreground">Start the first discussion for other students.</p>
        </div>
      )}
    </div>
  );
}
