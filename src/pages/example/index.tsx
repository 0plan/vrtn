import { useTranslation } from 'react-i18next';

export default function index() {
  const { t } = useTranslation();

  return (
    <main className="flex">
      <p>{t('menu.example')}</p>
      <p>{calculateNetGain(1834853800).netGain.toLocaleString()}</p>
    </main>
  );
}
function calculateNetGain(winningAmount: number): number {
  const PURCHASE_COST: number = 1000;
  const MIN_TAX_PORTION: number = 300000000;
  const MIN_TAX_RATE: number = 0.22;
  const MAX_TAX_RATE: number = 0.33;
  const taxableAmount: number = winningAmount - PURCHASE_COST;
  let tax: number = 0;

  // Calculate tax for the portion up to 300 million
  if (taxableAmount > MIN_TAX_PORTION) {
    tax += 66000000;
    tax += (Math.min(taxableAmount, MIN_TAX_PORTION) - MIN_TAX_PORTION) * MIN_TAX_RATE;
  } else {
    tax += taxableAmount * MIN_TAX_RATE;
  }

  // Calculate tax for the portion exceeding 300 million
  if (taxableAmount > MIN_TAX_PORTION) {
    tax += (taxableAmount - MIN_TAX_PORTION) * MAX_TAX_RATE;
  }

  // Calculate net gain
  const netGain: number = winningAmount - tax;
  return {
    netGain,
    tax,
    winningAmount,
  };
}
