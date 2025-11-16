'use client';

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          欢迎来到 GENQI · 体质问诊系统
        </h1>

        <p className="text-gray-700 mb-6">
          输入你的症状、体质、舌象，我将为你分析气机。
        </p>

        {/* 输入框 */}
        <textarea
          className="w-full h-40 p-3 border rounded-lg shadow-sm"
          placeholder="请输入你的症状、体质、舌象、脉象..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 按钮 */}
        <button
          className="w-full h-10 bg-black text-white mt-4 rounded"
          onClick={async () => {
            const res = await fetch("/api/chat", {
              method: "POST",
              body: JSON.stringify({ message }),
            });

            const data = await res.json();
            alert("AI 分析结果：" + data.reply);
          }}
        >
          开始分析
        </button>
      </div>
    </main>
  );
}
