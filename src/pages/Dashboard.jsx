import { useEffect, useState } from "react";
import {
  getAccountInfo,
  getBalance,
  getTransactionHistory,
  depositMoney,
  withdrawMoney,
} from "../services/api";

function Dashboard() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [msg, setMsg] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMsg("Please login first.");
      return;
    }

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
    if (data.error) setMsg(data.error);
    else {
      setMsg(data.message);
      setBalance(data.newBalance);
      setWithdrawAmount("");
      refreshTransactions();
    }
  }

  async function refreshTransactions() {
    const data = await getTransactionHistory(token);
    if (!data.error) setTransactions(data);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setMsg("You have been logged out.");
    setAccount(null);
    setBalance(null);
    setTransactions([]);
  }

  const inputStyle = {
    width: "100%",
    padding: 5,
    marginBottom: 10,
    borderRadius: 0,
    border: "1px solid #000",
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  };

  if (!token) return <p>Please login to view your dashboard.</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: 30,
        border: "1px solid #000",
        borderRadius: 0,
        backgroundColor: "#fff",
        color: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      {msg && <p style={{ color: "#000", marginBottom: 20 }}>{msg}</p>}

      {account && (
        <>
          <h3 style={{ marginBottom: 10 }}>Account Info</h3>
          <p style={{ marginBottom: 5 }}>
            <strong>Account Holder:</strong> {account.accountHolderName}
          </p>
          <p style={{ marginBottom: 5 }}>
            <strong>Email:</strong> {account.email}
          </p>
          <p style={{ marginBottom: 5 }}>
            <strong>Account Type:</strong> {account.accountType}
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Account Number:</strong> {account.accountNumber}
          </p>
        </>
      )}

      <h3 style={{ marginBottom: 20 }}>
        Balance: ${balance?.toFixed(2) ?? "Loading..."}
      </h3>

      <form onSubmit={handleDeposit} style={{ marginBottom: 30 }}>
        <h4 style={{ marginBottom: 10 }}>Deposit Money</h4>
        <input
          type="number"
          step="0.01"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="Amount"
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Deposit
        </button>
      </form>

      <form onSubmit={handleWithdraw} style={{ marginBottom: 30 }}>
        <h4 style={{ marginBottom: 10 }}>Withdraw Money</h4>
        <input
          type="number"
          step="0.01"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Amount"
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Withdraw
        </button>
      </form>

      <h3 style={{ marginBottom: 20 }}>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#000" }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #000",
                  textAlign: "left",
                  paddingBottom: 10,
                }}
              >
                Type
              </th>
              <th
                style={{
                  borderBottom: "1px solid #000",
                  textAlign: "right",
                  paddingBottom: 10,
                }}
              >
                Amount
              </th>
              <th
                style={{
                  borderBottom: "1px solid #000",
                  textAlign: "right",
                  paddingBottom: 10,
                }}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td style={{ padding: "10px 0" }}>{t.type}</td>
                <td style={{ textAlign: "right", padding: "10px 0" }}>
                  ${t.amount.toFixed(2)}
                </td>
                <td style={{ textAlign: "right", padding: "10px 0" }}>
                  {new Date(t.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
