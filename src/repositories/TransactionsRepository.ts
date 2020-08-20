import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): { transactions: Transaction[]; balance: Balance } {
    const response = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return response;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') return total + elemento.value;
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') return total + elemento.value;
      return total;
    }, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public findByTitle(title: string): Transaction | null {
    const findTransaction = this.transactions.find(
      transaction => transaction.title === title,
    );

    return findTransaction || null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
