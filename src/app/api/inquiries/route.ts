import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ─── Validate required fields ───────────────────────────
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // ─── Build inquiry record ───────────────────────────────
    const inquiry = {
      name: name.trim(),
      email: email.trim(),
      phone: body.phone?.trim() || null,
      country: body.country?.trim() || null,
      message: message.trim(),
      inquiry_type: body.inquiry_type || "general",
      product_slug: body.product_slug || null,
      product_name: body.product_name || null,
      status: "new",
      source: "website",
    };

    // ─── Insert into Supabase ───────────────────────────────
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .insert(inquiry)
      .select("id")
      .single();

    if (error) {
      console.error("[inquiries] Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to submit inquiry. Please try again or contact us via WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Your inquiry has been received. We'll respond within 24 hours.",
    });
  } catch (err) {
    console.error("[inquiries] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
