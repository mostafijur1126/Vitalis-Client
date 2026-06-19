import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUserSession();

    const formData = await request.formData();
    const classId = formData.get("classId");
    const className = formData.get("className");
    const trainer = formData.get("trainer");
    const price = formData.get("price");
    const duration = formData.get("duration");

    const PRICE_ID = "price_1TjgfHCRS2C5nrZAmvjqawSr";

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        priceId: PRICE_ID,
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        classId,
        className,
        trainer,
        price,
        duration,
      },
      mode: "subscription",
      success_url: `${origin}/success/${classId}?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
