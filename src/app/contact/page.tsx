"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const values = Object.fromEntries(formData);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.error?.fieldErrors) {
          setErrors(data.error.fieldErrors as Record<string, string[]>);
          setStatus("idle");
          return;
        }
        throw new Error("send failed");
      }
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
      setErrorMessage("送信に失敗しました。お手数ですが、時間をおいて再度お試しください。");
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <article className="mx-auto w-full max-w-2xl px-5 py-16 md:px-8 md:py-24">
          <header className="mb-12 border-b border-neutral-200 pb-8">
            <p className="text-xs tracking-[0.2em] text-neutral-500">CONTACT</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-wide text-neutral-900 md:text-3xl">
              お問い合わせ
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              うちここに関するご質問・ご相談はこちらのフォームよりお送りください。
              担当者より追ってメールにてご連絡いたします。
            </p>
          </header>

          {status === "success" ? (
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-8 text-center">
              <p className="text-base font-semibold text-neutral-900">
                お問い合わせを受け付けました
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                ご入力いただいたメールアドレスに確認メールをお送りしました。
                担当者より追ってご連絡いたしますので、今しばらくお待ちください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-800">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[15px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                />
                {errors.name?.[0] && (
                  <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[15px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                />
                {errors.email?.[0] && (
                  <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-800">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  className="w-full resize-y rounded-md border border-neutral-300 px-3 py-2.5 text-[15px] outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                />
                {errors.message?.[0] && (
                  <p className="mt-1 text-xs text-red-500">{errors.message[0]}</p>
                )}
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                  className="w-full md:w-auto"
                >
                  {status === "submitting" ? "送信中…" : "送信する"}
                </Button>
              </div>
            </form>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
