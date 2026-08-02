"use client";

import { useState } from "react";
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

export function ProductImagesClient({ productId }: { productId: string }) {
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

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSimulatedUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const newImg: ImageItem = {
        id: `img-${Date.now()}`,
        url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
        altText: "Newly Uploaded Product Image",
        isPrimary: false,
        sortOrder: images.length + 1,
      };
      setImages((prev) => [...prev, newImg]);
      setUploading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-primary-700 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Products
            </Link>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Product Images Gallery — SKU #{productId}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload product photos to Supabase Storage bucket (`product-images`), manage sort order, and enforce single primary image.
          </p>
        </div>

        <button
          onClick={handleSimulatedUpload}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading to Bucket..." : "Upload New Image"}
        </button>
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

            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-900 truncate">{img.altText}</p>
              <p className="text-[11px] text-slate-400 font-mono">Sort Order: #{img.sortOrder}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleSetPrimary(img.id)}
                disabled={img.isPrimary}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  img.isPrimary
                    ? "text-amber-600 cursor-default"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Star className={`h-3.5 w-3.5 ${img.isPrimary ? "fill-amber-500" : ""}`} />
                {img.isPrimary ? "Primary Image" : "Set Primary"}
              </button>

              <button
                onClick={() => handleDelete(img.id)}
                className="text-slate-400 hover:text-danger-600 transition p-1"
                title="Delete Image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
