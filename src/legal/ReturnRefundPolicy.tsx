import { Link } from "react-router-dom";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-xl p-8 md:p-12">
        
        <h1 className="text-3xl font-extrabold text-neutral-800 mb-4">
          Return and Refund Policy
        </h1>

        <p className="text-sm text-neutral-500 mb-10">
          Effective Date: <strong>01 November 2025</strong>
        </p>

        <div className="space-y-6 text-neutral-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg mb-1">1. Transaction Process</h2>
            <p>
              When a seller lists an item, RebuZZar reviews and approves it before publication.
              Buyers can book items they wish to purchase. RebuZZar notifies the seller of the booking
              and arranges item pickup. The buyer is informed of the delivery schedule.
              At delivery, the buyer inspects the item. If satisfied, payment is made at that time.
              RebuZZar deducts its commission <strong>(10% of the selling price)</strong> and transfers the remaining funds to the seller within 48 hours.
              <br />
              Example: If an item sells for ₹100, RebuZZar deducts ₹10 as commission and transfers ₹90 to the seller.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">2. Returns and Refunds</h2>
            <p>
              Returns are only permitted at the time of delivery if the item is damaged, defective,
              or materially different from the description. Once the buyer accepts the item and makes
              payment, the sale is final. No returns, exchanges, or refunds are allowed after payment.
            </p>
            <p>
              Refunds are processed only in cases of pre-payment rejection at delivery. For all other
              transactions, buyer payments are final, and seller payouts <strong>(after 10% commission deduction)</strong> are 
              made within 48 hours of payment.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">3. Commission</h2>
            <p>
              RebuZZar charges a <strong>10%</strong> commission on successful sales. The commission is deducted from the
              buyer’s payment before transferring the remaining amount to the seller.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">4. Damaged or Misrepresented Items</h2>
            <p>
              Buyers may reject items at delivery if they are damaged, defective, or not as described.
              Any returned item is sent back to the seller in its original condition.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. Privacy</h2>
            <p>
              Your use of the platform is also governed by our{" "}
              <Link to="/legal/privacy-policy" className="text-blue-600 hover:underline">Terms and Conditions</Link> and&nbsp;
              <Link to="/legal/terms-and-conditions" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">6. Contact</h2>
            <p>
              For questions regarding returns, refunds, or payouts, contact us at: <br />
              📧 <strong>rebuzzar@gmail.com</strong> <br />
              🏢 398, Ramkrishnapur Rd, near Jagadighata Market, Barasat, Kolkata, West Bengal 700125
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
