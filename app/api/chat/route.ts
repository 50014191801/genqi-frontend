import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("缺少 OPENAI_API_KEY");
      return NextResponse.json(
        { reply: "服务器未配置 API Key，请联系管理员。" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "你是一位中医体质医生，根据症状、体质、舌象、脉象做出气机分析。",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();

    // 如果接口报错，直接把错误说明返回给前端
    if (!res.ok) {
      console.error("OpenAI API Error:", data);
      return NextResponse.json(
        {
          reply:
            "调用 OpenAI 接口失败：" +
            (data.error?.message || "未知错误"),
        },
        { status: 500 }
      );
    }

    const reply = data.choices?.[0]?.message?.content || "AI 没有返回内容。";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { reply: "服务器内部错误，请稍后重试。" },
      { status: 500 }
    );
  }
}
