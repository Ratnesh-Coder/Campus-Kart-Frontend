import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-xl p-8 md:p-12">
        
        <h1 className="text-3xl font-extrabold text-neutral-800 mb-4">
          Terms and Conditions
        </h1>

        <p className="text-sm text-neutral-500 mb-10">
          Effective Date: <strong>01 November 2025</strong>
        </p>

        <div className="space-y-6 text-neutral-700 leading-relaxed">
          
          <section>
            <h2 className="font-semibold text-lg mb-1">1. Acceptance of Terms</h2>
            <p>
              By using RebuZZar, you confirm that you are legally capable of entering into these
              Terms and that you will follow all applicable laws while using our Services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">2. Modifications to Terms</h2>
            <p>
              RebuZZar may update these Terms from time to time. Any changes will be effective
              immediately once posted on our website. Continued use of the platform means you
              accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the security of your login credentials.
              Providing false or misleading information may result in account suspension or termination.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">4. Buyer & Seller Responsibilities</h2>
            <p>
              Sellers must ensure their listings are accurate. Buyers must inspect items during delivery.
              RebuZZar does not guarantee item quality or authenticity.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. Transactions & Payments</h2>
            <p>
              RebuZZar facilitates transactions between buyers and sellers. Once an item is
              inspected and payment is made, the sale is final. No returns or refunds will be provided.
              RebuZZar deducts commission and releases payment to sellers within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">6. Content Ownership</h2>
            <p>
              Users retain ownership of their posted content but grant RebuZZar a license to
              use, display, and promote such content within the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">7. Intellectual Property</h2>
            <p>
              All platform content including logos, UI elements, and software code is the property
              of RebuZZar. Unauthorized usage is not permitted.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">8. Third-Party Links</h2>
            <p>
              RebuZZar may include links to third-party services. We are not responsible for their
              content, actions, or policies.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">9. Limitation of Liability</h2>
            <p>
              RebuZZar is not liable for item quality, delivery issues, or disputes between users,
              except as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">10. Indemnification</h2>
            <p>
              You agree to indemnify RebuZZar from any claims or damages arising from misuse of
              the platform or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of <strong>Republic of India</strong>.
              Disputes are subject to the jurisdiction of courts in <strong>Kolkata, West Bengal</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">12. Privacy</h2>
            <p>
              Your use of the platform is also governed by our{" "}
              <Link to="/legal/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and&nbsp;
              <Link to="/legal/return-refund-policy" className="text-blue-600 hover:underline">Return and Refund Policy</Link>.

            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">13. Contact Information</h2>
            <p>
              For any support or legal queries, contact us at: <br />
              📧 <strong>rebuzzar@gmail.com</strong> <br />
              🏢 398, Ramkrishnapur Rd, near Jagadighata Market, Barasat, Kolkata, West Bengal 700125
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
