import { Link } from "react-router-dom";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-xl p-8 md:p-12">

        <h1 className="text-3xl font-extrabold text-neutral-800 mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-neutral-500 mb-10">
          Effective Date: <strong>01 November 2025</strong>
        </p>

        <div className="space-y-6 text-neutral-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-lg mb-1">1. Information We Collect</h2>
            <p>
              We collect personal information you provide when creating an account, booking or selling items, or contacting us. 
              This may include your name, email address, phone number, payment details, and account information. 
              We also collect transaction data, including booking details, delivery coordination, and inspection status.
            </p>
            <p>
              Additionally, we gather usage information such as IP addresses, browser type, pages visited, and time spent on the site. 
              Cookies and similar technologies may be used to enhance your experience, analyze trends, and monitor website usage.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">2. How We Use Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Facilitate transactions and coordinate deliveries between buyers and sellers;</li>
              <li>Process payments and transfer funds to sellers;</li>
              <li>Communicate with users about bookings, deliveries, updates, and promotions;</li>
              <li>Improve the Services, analyze usage patterns, and customize user experience;</li>
              <li>Detect, prevent, and respond to fraud, unauthorized use, or security threats;</li>
              <li>Comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">3. Sharing Information</h2>
            <p>
              We do not sell your personal information. Information may be shared:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>With sellers, to coordinate pickup and delivery;</li>
              <li>With third-party service providers for payment processing, hosting, or analytics;</li>
              <li>When required by law or to protect the rights and safety of users;</li>
              <li>In connection with business transfers, such as mergers or acquisitions.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">4. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical measures to safeguard your personal information. 
              However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary to provide Services, fulfill legal obligations, or resolve disputes. 
              When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or request deletion of your personal information. 
              You may also opt out of marketing communications. To exercise these rights, please contact us at: 
              <br />
              📧 <strong>rebuzzar@gmail.com</strong>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">7. Third-Party Links</h2>
            <p>
              Our Services may contain links to third-party websites. We are not responsible for the privacy practices of these websites, and we encourage users to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">8. Children’s Privacy</h2>
            <p>
              RebuZZar is not intended for children under the age of 13 (or legal minimum age in your jurisdiction). We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">9. International Users</h2>
            <p>
              If you access the Services from outside India, your information may be transferred to and stored in countries with different data protection laws. By using our Services, you consent to such transfers.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">5. Privacy</h2>
            <p>
              Your use of the platform is also governed by our{" "}
              <Link to="/legal/terms-and-conditions" className="text-blue-600 hover:underline">Privacy Policy</Link> and&nbsp;
              <Link to="/legal/return-refund-policy" className="text-blue-600 hover:underline">Return and Refund Policy</Link>. 
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-1">10. Contact</h2>
            <p>
              For any questions or concerns regarding this Privacy Policy, please contact: <br />
              📧 <strong>rebuzzar@gmail.com</strong> <br />
              🏢 398, Ramkrishnapur Rd, near Jagadighata Market, Barasat, Kolkata, West Bengal 700125
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
