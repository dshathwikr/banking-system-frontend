import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccountInfo,
  getBalance,
  getTransactionHistory,
  depositMoney,
  withdrawMoney,
} from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [msg, setMsg] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      const accountData = await getAccountInfo(token);
      if (accountData.error) setMsg(accountData.error);
      else setAccount(accountData);

      const balanceData = await getBalance(token);
      if (balanceData.error) setMsg(balanceData.error);
      else setBalance(balanceData.balance);

      const transactionsData = await getTransactionHistory(token);
      if (transactionsData.error) setMsg(transactionsData.error);
      else setTransactions(transactionsData);
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  async function handleDeposit(e) {
    e.preventDefault();
    setMsg("");
    const amountNum = parseFloat(depositAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setMsg("Enter a valid deposit amount.");
      return;
    }
    const data = await depositMoney({ amount: amountNum }, token);
    if (data.error) setMsg(data.error);
    else {
      setMsg(data.message);
      setBalance(data.newBalance);
      setDepositAmount("");
      refreshTransactions();
    }
  }

  async function handleWithdraw(e) {
    e.preventDefault();
    setMsg("");
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setMsg("Enter a valid withdraw amount.");
      return;
    }
    const data = await withdrawMoney({ amount: amountNum }, token);
    if (data.error) {
      setMsg(data.error);
    } else if (data.newBalance !== undefined) {
      setMsg(data.message || "Withdrawal successful.");
      setBalance(data.newBalance);
      setWithdrawAmount("");
      refreshTransactions();
    } else {
      setMsg("Unexpected error occurred during withdrawal.");
    }
  }

  async function refreshTransactions() {
    const data = await getTransactionHistory(token);
    if (!data.error) setTransactions(data);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setAccount(null);
    setBalance(null);
    setTransactions([]);
    setMsg("");
    navigate("/");
  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {msg && <p className="message">{msg}</p>}
      {account && (
        <div className="account-info">
          <h3>Account Info</h3>
          <p>
            <strong>Account Holder:</strong> {account.accountHolderName}
          </p>
          <p>
            <strong>Email:</strong> {account.email}
          </p>
          <p>
            <strong>Account Type:</strong> {account.accountType}
          </p>
          <p>
            <strong>Account Number:</strong> {account.accountNumber}
          </p>
        </div>
      )}
      <h3>Balance: ${balance?.toFixed(2) ?? "Loading..."}</h3>
      <form onSubmit={handleDeposit} className="transaction-form">
        <h4>Deposit Money</h4>
        <input
          type="number"
          step="0.01"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Amount"
          className="input"
        />
        <button type="submit" className="button">
          Deposit
        </button>
      </form>
      <form onSubmit={handleWithdraw} className="transaction-form">
        <h4>Withdraw Money</h4>
        <input
          type="number"
          step="0.01"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Amount"
          className="input"
        />
        <button type="submit" className="button">
          Withdraw
        </button>
      </form>
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.type}</td>
                <td>${t.amount.toFixed(2)}</td>
                <td>{new Date(t.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
