"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authApi.login({ nik, password });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login gagal. Periksa kredensial Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-lg">D</span>
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Desa Admin
          </h1>
          <p className="text-xs text-zinc-500">
            Masukkan kredensial untuk mengakses panel admin.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 text-xs">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
              NIK
            </label>
            <input
              type="text"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-700"
              placeholder="Masukkan NIK"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            <LogIn size={16} />
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <p className="text-center text-[10px] text-zinc-700">
          Panel ini hanya untuk administrator desa.
        </p>
      </div>
    </div>
  );
}
