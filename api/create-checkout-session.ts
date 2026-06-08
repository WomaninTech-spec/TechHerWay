import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, email } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: 'priceId is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: 'https://techherway.org/dashboard?payment=success',
      cancel_url: 'https://techherway.org/premium',
      locale: 'fr',
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
