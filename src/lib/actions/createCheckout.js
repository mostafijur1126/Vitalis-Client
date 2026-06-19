// lib/actions/createCheckout.js
"use server";

import { stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckoutSession(formData) {
  const headersList = await headers();
  const origin = headersList.get("origin");
  const user = await getUserSession();

  // FormData theke class info nao
  const classId = formData.get("classId");
  const className = formData.get("className");
  const trainer = formData.get("trainer");
  const price = formData.get("price");
  const duration = formData.get("duration");

  const PRICE_ID = "price_1TjgfHCRS2C5nrZAmvjqawSr";

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    metadata: {
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

  redirect(session.url);
}
