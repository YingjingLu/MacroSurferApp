import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Privacy Policy</h1>
      <p>Effective Date: 06/12/2024</p>

      <p>
        Your privacy is important to us. This Privacy Policy explains how we collect,
        use, and protect your information when you use our services.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> This may include your name, email
          address, and other details you provide when using our services.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect data about how you use our
          website, such as IP addresses, browser types, and pages visited.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To communicate with you</li>
        <li>To improve our services and user experience</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>How We Protect Your Information</h2>
      <p>
        We implement security measures to protect your personal information from
        unauthorized access, disclosure, or alteration. However, no method of
        transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We do not sell, trade, or rent your personal information to others. We may
        share your information with trusted third parties to help us operate our
        services, provided they agree to keep your information confidential.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted
        on this page with an updated effective date.
      </p>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
