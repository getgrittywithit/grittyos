import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { WaitlistSignup, ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, trade_type, company_name, referral_source } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get UTM parameters from query string
    const url = new URL(request.url);
    const utm_source = url.searchParams.get("utm_source") || undefined;
    const utm_medium = url.searchParams.get("utm_medium") || undefined;
    const utm_campaign = url.searchParams.get("utm_campaign") || undefined;

    const signup: WaitlistSignup = {
      email: email.toLowerCase().trim(),
      name: name?.trim() || undefined,
      trade_type: trade_type?.trim() || undefined,
      company_name: company_name?.trim() || undefined,
      referral_source: referral_source?.trim() || undefined,
      utm_source,
      utm_medium,
      utm_campaign,
    };

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("waitlist_signups")
      .insert(signup)
      .select()
      .single();

    if (error) {
      // Check for unique constraint violation (duplicate email)
      if (error.code === "23505") {
        return NextResponse.json<ApiResponse>(
          { success: false, error: "This email is already on the waitlist" },
          { status: 409 }
        );
      }

      console.error("Supabase error:", error);
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json<ApiResponse<WaitlistSignup>>(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
