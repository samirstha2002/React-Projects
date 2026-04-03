import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setbill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setbill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} onBill={setbill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the services?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the services?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Stats bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}
function BillInput({ bill, onBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        value={bill}
        type="text"
        onChange={(e) => onBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing(20%)</option>
      </select>
    </div>
  );
}

function Stats({ bill, tip }) {
  const total = bill + tip;
  return (
    <h3>
      You pay $ {total} ($ {bill} +$ {tip}tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
