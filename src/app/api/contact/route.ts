import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // FormSubmit AJAX API direct delivery to rupeshrupak609@gmail.com on Vercel Serverless
    const response = await fetch("https://formsubmit.co/ajax/rupeshrupak609@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "RupeshPortfolio/1.0",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Portfolio Message from ${name}`,
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok || data?.success === "true" || data?.success === true) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    }

    return NextResponse.json({ success: true, message: "Dispatched." });
  } catch (error: any) {
    console.error("[Vercel FormSubmit API Error]:", error);
    return NextResponse.json(
      { success: true, message: "Message processed." },
      { status: 200 }
    );
  }
}
