import { useState } from "react";

const StatisticsLine = ({ text, count, percent = false }) => {
  return (
    <>
      <tr>
        <th>{text}</th>
        <td>
          {count} {percent ? "%" : ""}
        </td>
      </tr>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      {all == 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <StatisticsLine text="good" count={good} />
          <StatisticsLine text="neutral" count={neutral} />
          <StatisticsLine text="bad" count={bad} />
          <StatisticsLine text="all" count={good + neutral + bad} />
          <StatisticsLine text="average" count={(good + neutral + bad) / 3} />
          <StatisticsLine
            text="positive"
            count={(good / (good + neutral + bad)) * 100}
            percent={true}
          />
        </table>
      )}
    </div>
  );
};

export default App;
