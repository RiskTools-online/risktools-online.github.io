import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import RiskCalculator from './pages/tools/RiskCalculator.jsx'
import PositionSizeCalculator from './pages/tools/PositionSizeCalculator.jsx'
import RiskRewardCalculator from './pages/tools/RiskRewardCalculator.jsx'
import DrawdownCalculator from './pages/tools/DrawdownCalculator.jsx'
import CompoundingCalculator from './pages/tools/CompoundingCalculator.jsx'
import ForexSessions from './pages/tools/ForexSessions.jsx'
import Privacy from './pages/legal/Privacy.jsx'
import { About, Contact, NotFound } from './pages/legal/Pages.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/risk-calculator" element={<RiskCalculator />} />
        <Route path="/position-size-calculator" element={<PositionSizeCalculator />} />
        <Route path="/risk-reward-calculator" element={<RiskRewardCalculator />} />
        <Route path="/drawdown-calculator" element={<DrawdownCalculator />} />
        <Route path="/compounding-calculator" element={<CompoundingCalculator />} />
        <Route path="/forex-sessions" element={<ForexSessions />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
