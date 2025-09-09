import { useEffect, useState } from 'react';

function App() {
  const [flag, setFlag] = useState('');
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Fetch the flag from the URL you decoded earlier
    const fetchFlag = async () => {
      try {
        const response = await fetch('https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/');
        const data = await response.text(); // might be .json() if it's a JSON response
        setFlag(data);
      } catch (error) {
        console.error('Error fetching flag:', error);
      }
    };

    fetchFlag();
  }, []);

  useEffect(() => {
    if (!flag) return;
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + flag[i]);
      i++;
      if (i >= flag.length) clearInterval(interval);
    }, 100); // 100ms delay per character

    return () => clearInterval(interval);
  }, [flag]);

  return (
    <div className="App" style={{ fontFamily: 'monospace', padding: '2rem' }}>
      <h1>Ramp Challenge</h1>
      <p>{displayText}</p>
    </div>
  );
}

export default App;