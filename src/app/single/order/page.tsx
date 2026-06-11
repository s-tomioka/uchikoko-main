"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Upload, X, Check, ArrowLeft, Plus, ImageOff } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ImagePreviewDialog } from "@/components/ui/image-preview-dialog";
import { setsData } from "@/lib/sets-data";
import { PostOrderFlowText } from "@/components/content/post-order-flow-text";
import { lookupJapanesePostalCode } from "@/lib/jpostal-lookup";
import { customerSchema, type CustomerFields } from "@/lib/order-schema";
import { cn } from "@/lib/utils";
import { upload } from "@vercel/blob/client";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
}

const product = setsData["single"];

const sizeOptions = [
  { value: "8cm", label: "8cm — ¥54,000" },
  { value: "18cm", label: "18cm — ¥55,000" },
  { value: "21cm", label: "21cm — ¥66,000" },
];

function priceForSize(size: string) {
  const map: Record<string, string> = {
    "8cm": "¥54,000",
    "18cm": "¥55,000",
    "21cm": "¥66,000",
  };
  return map[size] ?? "¥54,000";
}

export default function SingleOrderPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedSize, setSelectedSize] = useState("8cm");
  const [step, setStep] = useState<"info" | "upload" | "confirm" | "done">("info");
  const [previewOpen, setPreviewOpen] = useState<{ index: number } | null>(null);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    postalCode: "",
    prefecture: "",
    addressLine: "",
  });
  const [zipLookupMsg, setZipLookupMsg] = useState<string | null>(null);
  const [zipLookupLoading, setZipLookupLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CustomerFields, string>>>({});
  const [fileAddError, setFileAddError] = useState<string | null>(null);

  const customerComplete = customerSchema.safeParse(customer).success;

  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const addFiles = useCallback((fileList: FileList) => {
    const allowed = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp']);
    const newFiles: UploadedFile[] = [];
    const tooLarge: string[] = [];
    Array.from(fileList).forEach((f) => {
      if (!allowed.has(f.type)) return;
      if (f.size > MAX_FILE_SIZE) {
        tooLarge.push(f.name);
        return;
      }
      newFiles.push({
        id: crypto.randomUUID(),
        file: f,
        preview: URL.createObjectURL(f),
      });
    });
    if (tooLarge.length > 0) {
      setFileAddError(`20MB を超えているためアップロードできません：${tooLarge.join('、')}`);
    } else {
      setFileAddError(null);
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3));
  }, [MAX_FILE_SIZE]);

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === fileId);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  const handleZipLookup = useCallback(async () => {
    setZipLookupMsg(null);
    setZipLookupLoading(true);
    const r = await lookupJapanesePostalCode(customer.postalCode);
    setZipLookupLoading(false);
    if (!r) {
      setZipLookupMsg("該当する住所が見つかりませんでした。郵便番号をご確認ください。");
      return;
    }
    setCustomer((c) => ({
      ...c,
      prefecture: r.prefecture,
      addressLine: r.cityTown,
    }));
  }, [customer.postalCode]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const orderId = crypto.randomUUID();
      const datePart = new Date().toISOString().slice(0, 16).replace("T", "_").replace(":", "");
      const blobUrls: string[] = [];
      for (const f of files) {
        const blob = await upload(
          `orders/${datePart}_${orderId}/${f.file.name}`,
          f.file,
          { access: "private", handleUploadUrl: "/api/blob/upload" }
        );
        blobUrls.push(blob.url);
      }
      const fd = new FormData();
      fd.append("orderId", orderId);
      fd.append("name", customer.name);
      fd.append("email", customer.email);
      fd.append("phone", customer.phone);
      fd.append("postalCode", customer.postalCode);
      fd.append("prefecture", customer.prefecture);
      fd.append("addressLine", customer.addressLine);
      fd.append("productName", `${product.name}（${selectedSize}）`);
      fd.append("price", priceForSize(selectedSize));
      fd.append("priceNote", product.priceNote);
      blobUrls.forEach((url) => fd.append("photoUrls", url));
      const res = await fetch("/api/order", { method: "POST", body: fd });
      if (!res.ok) throw new Error("送信に失敗しました");
      setStep("done");
    } catch {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        <div className="container py-12 md:py-20">
          <Link
            href="/single"
            className="mb-8 inline-flex items-center gap-2 text-[12px] tracking-wide text-text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            オリジナルペット陶器のみに戻る
          </Link>

          {/* Steps indicator */}
          {step !== "done" && (
            <div className="mb-12 flex items-center gap-3 md:mb-16">
              {["お客様情報入力", "写真アップロード", "注文内容確認"].map((label, i) => {
                const displayStepIndex =
                  step === "info" ? 0 : step === "upload" ? 1 : step === "confirm" ? 2 : 0;
                const isActive = i === displayStepIndex;
                const isDone = i < displayStepIndex;
                return (
                <div key={label} className="flex items-center gap-3">
                  {i > 0 && (
                    <div
                      className={cn(
                        "h-px w-6 md:w-10",
                        isDone ? "bg-dark" : "bg-border",
                      )}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-[10px]",
                        isActive || isDone
                          ? "bg-dark text-white"
                          : "bg-bg-subtle text-text-faint",
                      )}
                    >
                      {isDone ? <Check className="size-3" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[11px] tracking-wide md:inline",
                        isActive ? "text-foreground" : "text-text-faint",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {step === "info" && (
            <div className="mx-auto max-w-xl">
              <h1 className="mb-3 text-[20px] font-extralight tracking-[0.04em] md:text-[26px]">
                お客様情報の入力
              </h1>
              <p className="mb-8 text-[13px] leading-[2] tracking-wide text-text-muted">
                ご依頼に必要な情報をご入力ください。
              </p>
              <div className="space-y-5">
                <div>
                  <label htmlFor="cust-name" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    お名前
                  </label>
                  <input
                    id="cust-name"
                    type="text"
                    autoComplete="name"
                    value={customer.name}
                    onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                    className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                  {fieldErrors.name && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="cust-phone" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    電話番号
                  </label>
                  <input
                    id="cust-phone"
                    type="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                    className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                  {fieldErrors.phone && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="cust-email" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    メールアドレス
                  </label>
                  <input
                    id="cust-email"
                    type="email"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                    className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                  {fieldErrors.email && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="cust-postal" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    郵便番号（ハイフンなし7桁）
                  </label>
                  <div className="flex flex-wrap items-stretch gap-2">
                    <input
                      id="cust-postal"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={8}
                      placeholder="例：1000001"
                      value={customer.postalCode}
                      onChange={(e) =>
                        setCustomer((c) => ({
                          ...c,
                          postalCode: e.target.value.replace(/[^\d-]/g, ""),
                        }))
                      }
                      className="min-w-0 flex-1 rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                    />
                    <button
                      type="button"
                      onClick={() => void handleZipLookup()}
                      disabled={zipLookupLoading}
                      className="shrink-0 rounded-sm border border-border bg-bg-subtle px-4 py-2.5 text-[12px] tracking-wide text-text-sub transition-colors hover:bg-bg-warm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {zipLookupLoading ? "検索中…" : "住所検索"}
                    </button>
                  </div>
                  {fieldErrors.postalCode && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.postalCode}</p>}
                  {zipLookupMsg && (
                    <p className="mt-1.5 text-[11px] tracking-wide text-text-muted">{zipLookupMsg}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="cust-pref" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    都道府県
                  </label>
                  <input
                    id="cust-pref"
                    type="text"
                    autoComplete="address-level1"
                    value={customer.prefecture}
                    onChange={(e) => setCustomer((c) => ({ ...c, prefecture: e.target.value }))}
                    className="w-full rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                  {fieldErrors.prefecture && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.prefecture}</p>}
                </div>
                <div>
                  <label htmlFor="cust-address-line" className="mb-1.5 block text-[12px] tracking-wide text-text-sub">
                    市区町村・番地・建物名・部屋番号
                  </label>
                  <textarea
                    id="cust-address-line"
                    autoComplete="street-address"
                    rows={3}
                    value={customer.addressLine}
                    onChange={(e) => setCustomer((c) => ({ ...c, addressLine: e.target.value }))}
                    className="w-full resize-y rounded-sm border border-border bg-white px-3 py-2.5 text-[13px] leading-relaxed tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  />
                  {fieldErrors.addressLine && <p className="mt-1 text-[12px] text-red-600">{fieldErrors.addressLine}</p>}
                </div>
              </div>
              <p className="mt-6 text-[11px] leading-[1.85] tracking-wide text-text-muted">
                3Dデータをご確認後、お支払い頂きます。現時点ではお支払い手続きの必要はございません。
              </p>
              <div className="mt-10">
                <Button
                  variant="primary"
                  onClick={() => {
                    const result = customerSchema.safeParse(customer);
                    if (!result.success) {
                      const errs = result.error.flatten().fieldErrors;
                      setFieldErrors({
                        name: errs.name?.[0],
                        email: errs.email?.[0],
                        phone: errs.phone?.[0],
                        postalCode: errs.postalCode?.[0],
                        prefecture: errs.prefecture?.[0],
                        addressLine: errs.addressLine?.[0],
                      });
                      return;
                    }
                    setFieldErrors({});
                    setStep("upload");
                  }}
                >
                  次へ（写真アップロード）
                </Button>
              </div>
            </div>
          )}

          {step === "upload" && (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_320px] md:gap-16">
              <div>
                <h1 className="mb-3 text-[20px] font-extralight tracking-[0.04em] md:text-[26px]">
                  うちの子の写真をアップロード
                </h1>
                <p className="mb-10 text-[13px] leading-[2] tracking-wide text-text-muted">
                  お気に入りの写真を1〜3枚お送りください。正面・横顔など、異なる角度の写真があると、より正確に再現できます。
                </p>

                {/* Size selector */}
                <div className="mb-10">
                  <p className="mb-3 text-[13px] tracking-wide text-text-sub">
                    サイズを選択
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedSize(opt.value)}
                        className={cn(
                          "cursor-pointer rounded-sm px-5 py-2.5 text-[12px] tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2",
                          selectedSize === opt.value
                            ? "bg-dark text-white"
                            : "bg-bg-subtle text-text-sub hover:bg-bg-warm",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />

                {files.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="group flex w-full cursor-pointer flex-col items-center rounded-sm border-2 border-dashed border-border bg-bg-subtle px-6 py-16 text-center transition-all hover:-translate-y-0.5 hover:border-text-faint hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-4"
                  >
                    <Upload
                      className="mb-4 size-8 text-text-faint transition-colors group-hover:text-accent"
                      strokeWidth={1.2}
                    />
                    <span className="mb-1.5 text-[14px] tracking-wide text-foreground">
                      写真をアップロード
                    </span>
                    <span className="text-[11px] tracking-wide text-text-muted">
                      JPEG / PNG / HEIC — 最大3枚・1枚あたり20MBまで
                    </span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {files.map((f) => (
                        <div key={f.id} className="group relative">
                          {f.file.type === 'image/heic' || f.file.type === 'image/heif' ? (
                            <div className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-sm bg-stone-100 p-3 text-center text-text-faint">
                              <ImageOff className="size-5 shrink-0" strokeWidth={1.2} />
                              <p className="text-[9px] leading-snug">HEIC/HEIFはプレビューできません</p>
                              <p className="text-[9px] leading-snug">ファイル名をクリックで確認できます</p>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewOpen({
                                  index: files.findIndex((x) => x.id === f.id),
                                })
                              }
                              className="block w-full cursor-zoom-in overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
                              aria-label="写真を拡大プレビュー"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={f.preview}
                                alt=""
                                className="aspect-square w-full object-cover"
                              />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(f.id)}
                            className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-dark/70 text-white transition-colors hover:bg-dark/90"
                            aria-label="削除"
                          >
                            <X className="size-3" />
                          </button>
                          {f.file.type === 'image/heic' || f.file.type === 'image/heif' ? (
                            <a
                              href={f.preview}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1.5 block truncate text-[10px] text-text-faint hover:underline"
                            >
                              {f.file.name}
                            </a>
                          ) : (
                            <p className="mt-1.5 truncate text-[10px] text-text-faint">
                              {f.file.name}
                            </p>
                          )}
                        </div>
                      ))}
                      {files.length < 3 && (
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-border text-text-faint transition-colors hover:border-text-faint hover:text-text-muted"
                        >
                          <Plus className="size-5" strokeWidth={1.2} />
                          <span className="mt-1 text-[10px]">追加</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] tracking-wide text-text-faint">
                      {files.length}/3枚 — 1枚あたり20MBまで。
                    </p>
                  </div>
                )}
                {fileAddError && (
                  <p className="mt-3 text-[12px] text-red-600">{fileAddError}</p>
                )}

                <div className="mt-10 flex flex-col gap-6">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="primary"
                      disabled={files.length === 0}
                      onClick={() => files.length > 0 && setStep("confirm")}
                      className={
                        files.length === 0 ? "cursor-not-allowed opacity-50" : ""
                      }
                    >
                      内容を確認する
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("info")}
                    className="w-fit cursor-pointer text-left text-[12px] tracking-wide text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                  >
                    お客様情報に戻る
                  </button>
                </div>
              </div>

              {/* Side summary */}
              <aside className="hidden md:sticky md:top-[96px] md:block">
                <div className="rounded-sm border border-border-faint bg-bg-subtle p-6">
                  <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-sm">
                    <Image
                      src="/images/detail/single/hero/sets-a-hero-01.png"
                      alt="オリジナルペット陶器のみ"
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mb-1 text-[14px] tracking-wide">
                    オリジナルペット陶器「うちここ」
                  </h3>
                  <p className="mb-3 text-[12px] leading-[1.7] tracking-wide text-text-muted">
                    サイズ: {selectedSize}
                  </p>
                  <p className="text-[18px] tracking-wide">
                    {priceForSize(selectedSize)}
                  </p>
                  <p className="text-[10px] tracking-wide text-text-faint">
                    {product.priceNote}
                  </p>
                </div>
              </aside>
            </div>
          )}

          {step === "confirm" && (
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-3 text-[20px] font-extralight tracking-[0.04em] md:text-[26px]">
                注文内容の確認
              </h1>
              <p className="mb-10 text-[13px] leading-[2] tracking-wide text-text-muted">
                以下の内容で注文を確定します。内容をご確認ください。
              </p>

              <div className="space-y-8">
                <div className="border-b border-border-faint pb-8">
                  <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-text-faint">
                    商品
                  </p>
                  <p className="mb-1 text-[15px] tracking-wide">
                    オリジナルペット陶器「うちここ」— {selectedSize}
                  </p>
                </div>

                <div className="border-b border-border-faint pb-8">
                  <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-text-faint">
                    お客様情報
                  </p>
                  <ul className="space-y-1 text-[13px] leading-[1.75] tracking-wide text-text-muted">
                    <li>お名前：{customer.name}</li>
                    <li>電話番号：{customer.phone}</li>
                    <li>メール：{customer.email}</li>
                    <li>郵便番号：{customer.postalCode}</li>
                    <li>都道府県：{customer.prefecture}</li>
                    <li>市区町村・番地等：{customer.addressLine}</li>
                  </ul>
                </div>

                <div className="border-b border-border-faint pb-8">
                  <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-text-faint">
                    アップロード写真
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {files.map((f) => (
                      f.file.type === 'image/heic' || f.file.type === 'image/heif' ? (
                        <a
                          key={f.id}
                          href={f.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex aspect-square w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-sm bg-stone-100 p-2 text-center text-text-faint"
                        >
                          <ImageOff className="size-4 shrink-0" strokeWidth={1.2} />
                          <p className="text-[9px] leading-snug">HEIC/HEIFはプレビューできません</p>
                          <p className="text-[9px] leading-snug">クリックして確認できます</p>
                        </a>
                      ) : (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() =>
                                setPreviewOpen({
                                  index: files.findIndex((x) => x.id === f.id),
                                })
                              }
                          className="block cursor-zoom-in overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
                          aria-label="写真を拡大プレビュー"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={f.preview}
                            alt=""
                            className="aspect-square w-full object-cover"
                          />
                        </button>
                      )
                    ))}
                  </div>
                </div>

                <div className="border-b border-border-faint pb-8">
                  <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-text-faint">
                    お支払い金額
                  </p>
                  <p className="text-[22px] tracking-wide">
                    {priceForSize(selectedSize)}
                  </p>
                  <p className="text-[11px] tracking-wide text-text-faint">
                    {product.priceNote}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-start gap-6">
                <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "送信中..." : "注文内容を送信する"}
                </Button>
                {submitError && (
                  <p className="text-[13px] text-red-600">{submitError}</p>
                )}
                <button
                  type="button"
                  onClick={() => setStep("upload")}
                  className="cursor-pointer text-[12px] tracking-wide text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  戻る
                </button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="mx-auto max-w-lg animate-fade-in py-10 text-center md:py-20">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-bg-subtle">
                <Check className="size-6 text-accent" strokeWidth={1.5} />
              </div>
              <h1 className="mb-3 text-[20px] font-extralight tracking-[0.04em] md:text-[26px]">
                ご注文ありがとうございます
              </h1>
              <PostOrderFlowText className="mb-10" />
              <div className="space-y-6">
                <Button href="/" variant="outline">
                  トップページに戻る
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ImagePreviewDialog
        images={
          previewOpen && files.length > 0
            ? files.map((f) => ({ src: f.preview, alt: f.file.name }))
            : null
        }
        startIndex={previewOpen?.index ?? 0}
        onClose={() => setPreviewOpen(null)}
      />
    </>
  );
}
