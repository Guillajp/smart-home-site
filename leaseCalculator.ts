export interface LeasePayments {
  weekly: string;
  semiWeekly: string; // Typically bi-weekly but matching requested terminology
  monthly: string;
}

/**
 * Calculates lease payments based on a base cash price (MSRP).
 * Assumes a standard in-house RTO multiplier of 2.1x over a 12-month period.
 * 
 * @param msrp The base cash price.
 * @returns An object containing weekly, semi-weekly, and monthly payments formatted to 2 decimal places.
 */
export function calculateLeasePayments(msrp: number): LeasePayments {
  const RTO_MULTIPLIER = 2.1;
  const totalLeaseAmount = msrp * RTO_MULTIPLIER;

  const weeklyPayment = totalLeaseAmount / 52;
  const semiWeeklyPayment = totalLeaseAmount / 26;
  const monthlyPayment = totalLeaseAmount / 12;

  return {
    weekly: weeklyPayment.toFixed(2),
    semiWeekly: semiWeeklyPayment.toFixed(2),
    monthly: monthlyPayment.toFixed(2),
  };
}
