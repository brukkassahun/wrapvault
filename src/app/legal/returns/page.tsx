import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Returns and refunds policy for WrapVault car wrap and PPF film orders.",
  alternates: { canonical: `${site.url}/legal/returns` },
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-vault" aria-hidden="true" />
        Legal
      </span>
      <h1 className="display-lg mt-5">Returns & Refunds</h1>
      <p className="mt-4 font-sans text-sm text-silver">Last updated: October 2026</p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="title mb-3">7-Day Inspection Period</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            You have 7 days from receiving your order to inspect the film rolls. If there is a manufacturing defect or the wrong color was shipped, contact us immediately with photos and your order number.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Eligible for Return</h2>
          <ul className="space-y-2 font-sans text-sm text-silver">
            <li>• Manufacturing defects (coating issues, delamination, color inconsistency)</li>
            <li>• Wrong product shipped (incorrect SKU or color)</li>
            <li>• Damaged in transit (reported within 48 hours of delivery)</li>
            <li>• Rolls must be uncut, uninstalled, and in original packaging</li>
          </ul>
        </section>

        <section>
          <h2 className="title mb-3">Not Eligible for Return</h2>
          <ul className="space-y-2 font-sans text-sm text-silver">
            <li>• Film that has been cut, installed, or partially used</li>
            <li>• Custom or special-order colors</li>
            <li>• Orders with custom branding or OEM packaging</li>
            <li>• Color variation due to monitor display differences (we provide color cards for verification)</li>
          </ul>
        </section>

        <section>
          <h2 className="title mb-3">Refund Process</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            Once we receive and inspect the returned product, we will process your refund within 5 business days. Refunds are issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Color Matching</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            Due to the nature of color perception and monitor calibration, on-screen colors may not perfectly match the physical product. We recommend ordering a color card or sample swatch before placing a bulk order. Returns based solely on minor color perception differences are not accepted.
          </p>
        </section>

        <section>
          <h2 className="title mb-3">Quality Guarantee</h2>
          <p className="font-sans text-sm leading-relaxed text-silver">
            All our films undergo 8 quality tests (peel strength, thermal aging, temperature/humidity, thickness, tear strength, tensile strength, puncture strength, functional layer thickness) compliant with GB/T standards. If a product fails within the warranty period due to manufacturing defects, we will replace it.
          </p>
        </section>
      </div>
    </div>
  );
}
