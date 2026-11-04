import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const finish = searchParams.get("finish") ?? undefined;
    const color = searchParams.get("color") ?? undefined;
    const search = searchParams.get("q") ?? undefined;
    const limit = parseInt(searchParams.get("limit") ?? "100", 10);

    const result = await getProducts({
      category: category && category !== "all" ? category : undefined,
      finish: finish && finish !== "all" ? finish : undefined,
      color: color && color !== "all" ? color : undefined,
      search: search ?? undefined,
      limit,
    });

    return NextResponse.json({
      products: result.items,
      total: result.total,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
