import React, { useState } from "react";
import { Plus, Upload, Trash2, Edit, Save, ArrowLeft, Package } from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@/src/services/productService";
import { cn } from "@/src/lib/utils";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert("Bulk upload feature is coming soon! File: " + file.name);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in">
      <header className="flex items-center justify-between">
         <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-2xl">
            <Package size={24} />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Inventory</h2>
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-colors">
            <Upload size={18} />
            CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
          </label>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg active:scale-95">
            <Plus size={18} />
            Add
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} className="w-10 h-10 rounded-xl object-cover bg-gray-100" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-black text-gray-900 text-sm">${product.price}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
