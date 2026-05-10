import { Helmet } from 'react-helmet-async'
export function SEOHead({ title, description, path = '' }) {
  const base = 'https://risktools.io'
  const full = title ? `${title} — RiskTools` : 'RiskTools — Free Trading Risk Management Tools'
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${base}${path}`} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
