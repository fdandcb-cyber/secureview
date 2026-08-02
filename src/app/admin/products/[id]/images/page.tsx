"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Upload, Star, Trash2, ArrowLeft } from "lucide-react";

type ImageItem = {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
};

const initialImages: ImageItem[] = [
  {
    id: "img-1",
    url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    altText: "Hikvision 4MP Bullet Front View",
    isPrimary: true,
    sortOrder: 1,
  },
  {
    id: "img-2",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80",
    altText: "Hikvision Bullet Housing Detail",
    isPrimary: false,
    sortOrder: 2,
  },
];

export default function ProductImagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [uploading, setUploading] = useState(false);

  const handleSetPrimary = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Remove this image from product gallery?")) {
      setImages((prev) => prev.filter((img) => img.id !== id));
    }
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    setTimeout(() => {
      const newImg: ImageItem = {
        id: `img-${Date.now()}`,
        url: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
        altText: "Uploaded Product Image",
        isPrimary: images.length === 0,
        sortOrder: images.length + 1,
      };

      setImages((prev) => [...prev, newImg]);
      setUploading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="text-slate-400 hover:text-slate-700 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">
              Product Media Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage Supabase Storage bucket images (`product-images`) for Product #{productId}
          </p>
        </div>

        <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm cursor-pointer">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading to Bucket..." : "Upload New Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleSimulatedUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Tabs bar */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <Link
          href="/admin/products"
          className="px-4 py-2.5 text-sm font-semibold border-b-2 border-transparent text-slate-500 hover:text-slate-900"
        >
          Product Details
        </Link>
        <span className="px-4 py-2.5 text-sm font-semibold border-b-2 border-primary-700 text-primary-700">
          Media Gallery ({images.length})
        </span>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <Card key={img.id} className="p-4 space-y-3 relative overflow-hidden group">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.altText}
                className="w-full h-full object-cover"
              />
              {img.isPrimary && (
                <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  PRIMARY
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium truncate max-w-[160px]">
                {img.altText}
              </span>
              <span className="text-slate-400">Order #{img.sortOrder}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleSetPrimary(img.id)}
                className={`text-xs font-semibold flex items-center gap-1 transition ${
                  img.isPrimary
                    ? "text-amber-600"
                    : "text-slate-400 hover:text-amber-600"
                }`}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                {img.isPrimary ? "Primary" : "Set Primary"}
              </button>

              <button
                onClick={() => handleDeleteImage(img.id)}
                className="text-slate-400 hover:text-red-600 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}

        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 text-sm bg-white rounded-xl border border-slate-200">
            No media uploaded for this product yet.
          </div>
        )}
      </div>
    </div>
  );
}
