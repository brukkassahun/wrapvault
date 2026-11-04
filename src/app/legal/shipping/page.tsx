import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Global shipping for car wrap and PPF films. Consolidated freight, express air, and sea shipping options.",
  alternates: { canonical: `${site.url}/legal/shipping` },
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-vault" aria-hidden="true" />
        Legal
      </span>
      <h1 className="display-lg mt-5">Shipping Policy</h1>
      <p className="mt-4 font-sans text-sm text-silver">Last updated: October 2026</p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="title mb-3">Shipping Methods</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            We offer three shipping methods for all film orders:
          </p>
          <ul className="mt-4 space-y-3 font-sans text-sm text-silver">
            <li><strong className="text-silver-bright">Express Air (DHL / FedEx):</strong> 5–10 business days worldwide. Recommended for sample rolls and urgent orders under 30kg.</li>
            <li><strong className="text-silver-bright">Sea Freight (LCL / FCL):</strong> 25–45 days depending on destination port. Most cost-effective for bulk orders of 10+ rolls.</li>
            <li><strong className="text-silver-bright">Consolidated Shipping:</strong> We combine multiple orders into a single shipment to reduce per-roll shipping cost. Ideal for wholesale buyers.</li>
          </ul>
        </section>

        <section>
          <h2 className="title mb-3">Processing Time</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            In-stock colors ship within 2–3 business days. Custom or made-to-order colors require 7–14 days production before shipping. You will receive a tracking number once your order ships.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Shipping Cost</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            Shipping is calculated based on weight, destination, and method. The exact cost is shown at checkout or provided in your quote. For wholesale orders, we negotiate the best freight rates with our logistics partners and pass the savings to you.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Customs & Duties</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            Import duties and taxes are the responsibility of the buyer and vary by country. We provide all necessary documentation (commercial invoice, packing list, certificate of origin) to facilitate customs clearance. We can also declare a custom value if requested.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Packaging</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            All rolls are packaged in multi-layer dustproof sealed tubes with foam end caps to prevent damage during transit. Each roll includes a release film to protect the adhesive layer until installation.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Damaged Shipments</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            If your order arrives damaged, contact us within 48 hours with photos of the packaging and product. We will arrange a replacement or refund. Do not accept delivery if the packaging is severely damaged — note it on the delivery receipt.
          </p>
        </section>
      </div>
    </div>
  );
}
