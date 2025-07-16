
import { useState } from 'react';

const DUMMY_PASSWORD = "qlalfqjsgh2025!";

const dummyPlayers = [
  { name: "Bang", role: "ADC", tier: "Platinum II" },
  { name: "Gori", role: "Mid", tier: "Diamond I" },
  { name: "Tarzan", role: "Jungle", tier: "Challenger" },
  { name: "Effort", role: "Support", tier: "Master" },
  { name: "Morgan", role: "Top", tier: "Diamond III" },
];

const INITIAL_BUDGET = 10000;

export default function DraftAuction() {
  const [step, setStep] = useState("login");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState(INITIAL_BUDGET);
  const [bids, setBids] = useState([]);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

  const handleLogin = () => {
    if (password === DUMMY_PASSWORD && nickname.trim() !== "") {
      setStep("auction");
    } else {
      alert("비밀번호가 틀렸거나 닉네임을 입력하지 않았습니다.");
    }
  };

  const currentPlayer = dummyPlayers[currentPlayerIdx];

  const placeBid = (amount) => {
    if (amount > budget) return alert("예산 초과입니다!");
    const newBid = {
      bidder: nickname,
      player: currentPlayer.name,
      amount,
    };
    setBids([...bids, newBid]);
    setBudget(budget - amount);
    setCurrentPlayerIdx((prev) => (prev + 1) % dummyPlayers.length);
  };

  if (step === "login") {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h2>LOL 드래프트 경매 입장</h2>
        <input placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} /><br />
        <input placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button onClick={handleLogin}>입장하기</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>경매 진행 중: {currentPlayer.name}</h2>
      <div>
        <p><strong>포지션:</strong> {currentPlayer.role}</p>
        <p><strong>티어:</strong> {currentPlayer.tier}</p>
        <p>💰 남은 예산: {budget.toLocaleString()}P</p>
        {[500, 1000, 2000, 5000].map((amt) => (
          <button key={amt} onClick={() => placeBid(amt)} style={{ margin: '0.5rem' }}>
            {amt.toLocaleString()}P 입찰
          </button>
        ))}
      </div>
      <div>
        <h3>📜 입찰 기록</h3>
        {bids.slice(-5).map((bid, i) => (
          <div key={i}>
            {bid.bidder}님이 {bid.player}에게 {bid.amount.toLocaleString()}P 입찰함
          </div>
        ))}
      </div>
    </div>
  );
}
