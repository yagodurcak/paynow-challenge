import { Transaction } from '../../types/types';

export const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Compra Supermercado', amount: 50, date: '2024-11-10' },
        { id: 2, name: 'Pago de Servicios', amount: 100, date: '2024-11-11' },
        { id: 3, name: 'Transferencia a Amigo', amount: 200, date: '2024-11-12' },
        { id: 4, name: 'Pago de Renta', amount: 150, date: '2024-11-13' },
      ]);
    }, 1000);
  });
};
