import { SEOHead } from '../../components/SEOHead.jsx'

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="RiskTools privacy policy. We do not collect, store or sell any user data. All calculations run locally in your browser."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="page-title mb-2">PRIVACY POLICY</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">

          <div className="tool-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔒</span>
              <h2 className="text-base font-semibold text-text-primary">Short Version</h2>
            </div>
            <p className="text-green font-medium">RiskTools does not collect, store, or sell any personal data. Ever.</p>
            <p className="mt-2 text-text-muted">All calculations happen entirely in your browser. No data is transmitted to any server. No accounts required.</p>
          </div>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">1. Information We Do NOT Collect</h2>
            <ul className="space-y-2 text-text-muted">
              <li className="flex items-start gap-2"><span className="text-green mt-0.5">✓</span> We do NOT collect your account balance, trade inputs, or calculation results</li>
              <li className="flex items-start gap-2"><span className="text-green mt-0.5">✓</span> We do NOT store any personal information (name, email, IP address)</li>
              <li className="flex items-start gap-2"><span className="text-green mt-0.5">✓</span> We do NOT require registration or login</li>
              <li className="flex items-start gap-2"><span className="text-green mt-0.5">✓</span> We do NOT use persistent cookies to track users</li>
              <li className="flex items-start gap-2"><span className="text-green mt-0.5">✓</span> We do NOT sell, share, or transfer any user data to third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">2. How the Application Works</h2>
            <p className="text-text-muted">RiskTools is a 100% client-side application. All calculations, including risk calculations, position size formulas, and projections, are computed locally in your web browser using JavaScript. No data is ever sent to our servers or any third-party server.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">3. Third-Party Services (Google AdSense)</h2>
            <p className="text-text-muted mb-3">RiskTools may display advertisements through Google AdSense. Google AdSense may use cookies and similar tracking technologies to serve relevant advertisements based on your browsing history. This is governed by Google's own privacy policies.</p>
            <ul className="space-y-1 text-text-muted">
              <li>• Google's Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">policies.google.com/privacy</a></li>
              <li>• Google AdSense: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">policies.google.com/technologies/ads</a></li>
              <li>• Opt-out: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">adssettings.google.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">4. Cookies</h2>
            <p className="text-text-muted">RiskTools itself does not set any first-party cookies. Any cookies present on this site are set exclusively by third-party advertising services (Google AdSense) and are subject to their respective privacy policies.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">5. Local Storage</h2>
            <p className="text-text-muted">RiskTools may use your browser's localStorage to temporarily store your input values during your session for a better user experience. This data never leaves your device and is cleared when you clear your browser data.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">6. Children's Privacy</h2>
            <p className="text-text-muted">RiskTools is not directed to children under 13 years of age. We do not knowingly collect any personal information from children.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">7. Changes to This Policy</h2>
            <p className="text-text-muted">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of RiskTools after any changes constitutes your acceptance of the new policy.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-text-primary mb-3">8. Contact</h2>
            <p className="text-text-muted">If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:contact@risktools.io" className="text-green hover:underline">contact@risktools.io</a></p>
          </section>

          <div className="tool-card p-5 border-green/20">
            <p className="text-xs text-text-muted">
              <strong className="text-text-secondary">Summary:</strong> RiskTools is a free, privacy-first trading tool. Your financial data stays on your device. We built this to help traders, not to collect data.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
