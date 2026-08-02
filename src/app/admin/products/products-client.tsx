"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Filter,
  Trash2,
  X,
  Star,
} from "lucide-react";

type ProductItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  resolution: string;
  price: string;
  stock: number;
  specs: string;
  featured: boolean;
  bestSeller: boolean;
};

const initialProducts: ProductItem[] = [
  {
    id: "1",
    name: "Hikvision DS-2CD1043G2-I",
    brand: "Hikvision",
    category: "IP Camera",
    resolution: "4MP",
    price: "₹3,200",
    stock: 45,
    specs: "4MP · 2.8mm · IP67 · 30m IR · PoE · H.265+",
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Dahua DH-IPC-HDW1439T1-A-LED",
    brand: "Dahua",
    category: "IP Camera",
    resolution: "4MP",
    price: "₹3,800",
    stock: 30,
    specs: "4MP · Full-Color LED · Built-in Mic · IP67",
    featured: true,
    bestSeller: false,
  },
  {
    id: "3",
    name: "CP Plus CP-UNC-TA41L3-D",
    brand: "CP Plus",
    category: "IP Camera",
    resolution: "4MP",
    price: "₹2,600",
    stock: 60,
    specs: "4MP · 30m IR · DWDR · PoE · Metal Housing",
    featured: false,
    bestSeller: true,
  },
  {
    id: "4",
    name: "Hikvision DS-7604NXI-K1/4P",
    brand: "Hikvision",
    category: "NVR",
    resolution: "4K",
    price: "₹6,500",
    stock: 20,
    specs: "4ch · 4K decode · 4 PoE ports · AcuSense",
    featured: true,
    bestSeller: true,
  },
  {
    id: "5",
    name: "WD Purple 2TB Surveillance Hard Drive",
    brand: "Western Digital",
    category: "Storage",
    resolution: "N/A",
    price: "₹4,800",
    stock: 80,
    specs: "2TB · 5400 RPM · 64MB Cache · 24/7 Rated",
    featured: false,
    bestSeller: true,
  },
];

export function AdminProductsClient() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Hikvision");
  const [category, setCategory] = useState("IP Camera");
  const [resolution] = useState("4MP");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(10);
  const [specs, setSpecs] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd: ProductItem = {
      id: Date.now().toString(),
      name,
      brand,
      category,
      resolution,
      price: `₹${Number(price).toLocaleString("en-IN")}`,
      stock,
      specs: specs || `${resolution} · Verified Specs`,
      featured: false,
      bestSeller: false,
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setName("");
    setPrice("");
    setSpecs("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Product & Spec Management Catalog
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven specification schema backing compare engine and calculators.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add New Product SKU
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKUs, brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-1.5 text-xs text-slate-950 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:border-primary-600 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="IP Camera">IP Cameras</option>
              <option value="NVR">Recorders (NVR/DVR)</option>
              <option value="Storage">Surveillance Storage</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 focus:border-primary-600 focus:outline-none"
            >
              <option value="All">All Brands</option>
              <option value="Hikvision">Hikvision</option>
              <option value="Dahua">Dahua</option>
              <option value="CP Plus">CP Plus</option>
              <option value="Western Digital">Western Digital</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Product Name & SKU</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Base Price</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-4 text-center">Images</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-950">
                    <div className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.featured && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Star className="h-3 w-3 mr-0.5 fill-amber-500 text-amber-500" /> Featured
                        </span>
                      )}
                    </div>
                    <span className="block text-[11px] text-slate-500 font-mono mt-0.5">
                      {p.specs}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{p.brand}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.category}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-950">{p.price}</td>
                  <td className="py-3.5 px-4 text-center font-medium">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                      p.stock < 10 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Link
                      href={`/admin/products/${p.id}/images`}
                      className="text-xs text-primary-700 hover:underline font-semibold"
                    >
                      Manage Images →
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1 text-slate-400 hover:text-danger-600 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-950">Add New Product SKU</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-900 mb-1">Product Name & Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hikvision DS-2CD2043G2-I (4MP Bullet)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-900 mb-1">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600 bg-white"
                  >
                    <option value="Hikvision">Hikvision</option>
                    <option value="Dahua">Dahua</option>
                    <option value="CP Plus">CP Plus</option>
                    <option value="TP-Link Tapo">TP-Link Tapo</option>
                    <option value="Western Digital">Western Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-900 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600 bg-white"
                  >
                    <option value="IP Camera">IP Camera</option>
                    <option value="NVR">NVR / Recorder</option>
                    <option value="Storage">Surveillance Storage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-900 mb-1">Base Price (INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="3200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-900 mb-1">Stock Count</label>
                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-1">Key Specifications Summary</label>
                <textarea
                  rows={2}
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder="e.g. 4MP · 2.8mm · IP67 · 30m IR · PoE"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-700 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
