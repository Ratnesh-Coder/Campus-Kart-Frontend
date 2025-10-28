// import React from "react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-xl p-8 md:p-12">
        
        <h1 className="text-3xl font-extrabold text-neutral-800 mb-4">
          Frequently Asked Questions (FAQ)
        </h1>

        <div className="space-y-6 text-neutral-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg mb-1">1. How does RebuZZar work?</h2>
            <p>
              RebuZZar is an online marketplace where sellers can list their products for sale. After a seller submits a product, our team reviews the listing to ensure it meets our quality and authenticity guidelines. Once approved, the product becomes visible to buyers on the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">2. Do I need an account to use RebuZZar?</h2>
            <p>
              Yes. To sell or buy products on RebuZZar, you must have an account. 
              If you are a new user, create an account by signing up with your email and required details. 
              If you already have an account, simply log in to continue using the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">3. How can I list a product for sale?</h2>
            <p>
              To list a product, you need to be logged into your account. After logging in, go to the “Sell an Item” section, upload product details and images, and submit the listing for review. Once approved, your product will appear on the marketplace for buyers to see.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">4. How does the approval process work?</h2>
            <p>
              Every product goes through a quality and authenticity review. If the product violates any of our guidelines, it will be rejected or sent back to the seller for correction.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. What types of products are allowed?</h2>
            <p>
              Only original and authorized products that comply with applicable laws and platform policies are allowed. Counterfeit, illegal, or restricted items are strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">6. What payment methods do you support?</h2>
            <p>
              Buyers pay directly to the delivery agent at the time of delivery. No advance payment is required, ensuring buyers pay only after confirming the item is as described.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">7. Can I return or refund a product after purchasing?</h2>
            <p>
              No. All sales are final. Products are verified at delivery, allowing buyers to inspect the item before payment. Once accepted and paid, returns or refunds are not available.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">8. Can I cancel an order after placing it?</h2>
            <p>
              Yes, you can cancel an order anytime before payment is made. Once payment is completed, the order is final — no cancellations, returns, or refunds are allowed.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">9. Is my personal information safe on RebuZZar?</h2>
            <p>
              Yes. We collect and process personal data according to applicable data protection laws and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">10. How do I contact support?</h2>
            <p>
              You can reach our support team through the “Contact Us” page for assistance, queries, or issue reporting.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
