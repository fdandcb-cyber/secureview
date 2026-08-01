"use client";

import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  ShieldCheck,
  ChevronDown,
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
    stock: 28,
    specs: "4MP · 2.8mm · IP67 · Full-Color · PoE · Built-in Mic",
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
    specs: "4MP · 3.6mm · IP67 · 30m IR · PoE · H.265",
    featured: false,
    bestSeller: true,
  },
  {
    id: "4",
    name: "Hikvision DS-7604NXI-K1/4P",
    brand: "Hikvision",
    category: "NVR",
    resolution: "4 Channel",
    price: "₹6,500",
    stock: 18,
    specs: "4ch · 4K decode · 4 PoE ports · 40W budget · 1 SATA · H.265+",
    featured: true,
    bestSeller: false,
  },
  {
    id: "5",
    name: "WD Purple 2TB (WD23PURZ)",
    brand: "Western Digital",
    category: "Hard Drive",
    resolution: "2TB",
    price: "₹4,800",
    stock: 90,
    specs: "2TB · 5400 RPM · CMR · 64MB cache · 24/7 surveillance rated",
    featured: true,
    bestSeller: true,
  },
  {
    id: "6",
    name: "Seagate SkyHawk 4TB (ST4000VX016)",
    brand: "Seagate",
    category: "Hard Drive",
    resolution: "4TB",
    price: "₹8,900",
    stock: 35,
    specs: "4TB · 5400 RPM · CMR · 256MB cache · ImagePerfect",
    featured: false,
    bestSeller: false,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Hikvision");
  const [category, setCategory] = useState("IP Camera");
  const [resolution, setResolution] = useState("4MP");
  const [price, setPrice] = useState("₹3,000");
  const [stock, setStock] = useState(20);
  const [specs, setSpecs] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setBrand("Hikvision");
    setCategory("IP Camera");
    setResolution("4MP");
    setPrice("₹3,500");
    setStock(25);
    setSpecs("4MP · 2.8mm · IP67 · PoE · H.265+");
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name, brand, category, resolution, price, stock, specs }
            : p
        )
      );
    } else {
      const newProduct: ProductItem = {
        id: Date.now().toString(),
        name,
        brand,
        category,
        resolution,
        price,
        stock,
        specs,
        featured: false,
        bestSeller: false,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Product & Specification Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage catalog items, full specifications, inventory stock, and feature flags.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search product name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-primary-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-primary-600"
          >
            <option value="All">All Categories</option>
            <option value="IP Camera">IP Cameras</option>
            <option value="NVR">NVR Recorders</option>
            <option value="Hard Drive">Hard Drives</option>
            <option value="PoE Switch">PoE Switches</option>
          </select>
        </div>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        {product.name}
                      </span>
                      <span className="text-xs text-slate-500 block truncate max-w-xs">
                        {product.specs}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {product.brand}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {product.price}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        product.stock > 30
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`p-1.5 rounded-md border transition ${
                        product.featured
                          ? "bg-amber-50 border-amber-300 text-amber-600"
                          : "bg-white border-slate-200 text-slate-400 hover:text-amber-500"
                      }`}
                      title="Toggle Featured Flag"
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-sm">
                    No products matching current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? "Edit Product" : "Add New Catalog Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-900 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hikvision DS-2CD1043G2-I"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    <option value="Uniview">Uniview</option>
                    <option value="Western Digital">Western Digital</option>
                    <option value="Seagate">Seagate</option>
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
                    <option value="Analog Camera">Analog Camera</option>
                    <option value="NVR">NVR</option>
                    <option value="DVR">DVR</option>
                    <option value="Hard Drive">Hard Drive</option>
                    <option value="PoE Switch">PoE Switch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-900 mb-1">Price (INR)</label>
                  <input
                    type="text"
                    required
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
