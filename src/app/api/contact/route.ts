import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Simple HTML/script tag stripper to prevent stored XSS via form fields
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .trim();
}

// Basic email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid input types." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json(
        { error: "Input exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Sanitize all inputs before forwarding
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeMessage = sanitize(message);

    const response = await fetch("https://formsubmit.co/ajax/rupeshrupak609@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "RupeshKumarRupakPortfolio/1.0",
      },
      body: JSON.stringify({
        name: safeName,
        email: safeEmail,
        message: safeMessage,
        _subject: `Portfolio Message from ${safeName}`,
        _captcha: "false",
        _template: "table",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok || data?.success === "true" || data?.success === true) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    }

    // Honest failure response — don't silently swallow errors
    return NextResponse.json(
      { success: false, error: "Message delivery failed. Please try emailing directly." },
      { status: 502 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Contact API Error]:", msg);
    return NextResponse.json(
      { success: false, error: "Server error. Please try emailing rupeshrupak609@gmail.com directly." },
      { status: 500 }
    );
  }
}
