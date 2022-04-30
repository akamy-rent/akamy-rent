import moment from 'moment';

export function determineTotalPayments(tPayPeriod) {
  const now = moment();
  let totalPayments = 0;
  // update next pay period
  switch (tPayPeriod) {
  case 'months':
    totalPayments = moment(now).diff(moment(now).add('1', 'year'), 'month');
    break;
  case 'weeks':
    totalPayments = moment(now).diff(moment(now).add('1', 'year'), 'week');
    break;
  case 'seconds':
    totalPayments = 10;
    break;
  default:
    console.log(`${tPayPeriod} is not a proper response`);
  }
  return totalPayments;
}

export function determineNextPayment(tPayPeriod, currentD) {
  let nextPaymentDate = null;
  // update next pay period
  switch (tPayPeriod) {
  case 'months':
    nextPaymentDate = moment(currentD).add('1', 'month');
    break;
  case 'weeks':
    nextPaymentDate = moment(currentD).add('1', 'week');
    break;
  case 'seconds':
    nextPaymentDate = moment(currentD).add('2', 'seconds');
    break;
  default:
    console.log(`${tPayPeriod} is not a proper response`);
  }
  return nextPaymentDate;
}

export function saveTransactionForRecord(transactionArray, currentDate, action) {
  transactionArray.push({ date: moment(currentDate).toISOString(), action: action });
}

export function showTransactions(contract) {
  console.log(contract.transactionLog);
}
