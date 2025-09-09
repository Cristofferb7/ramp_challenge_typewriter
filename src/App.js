import { useEffect, useState } from 'react';

function App() {
  const [flag, setFlag] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  // <FLAG = heroics> <LINK = https://wgg522ppivhv...lambda-url.us-east-1.on.aws/686572>
  const fetchFlag = async () => {
  setDisplayText("Loading...");
    try {
  const response = await fetch("https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge");
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const nodes = doc.querySelectorAll('b.ref');
  const flagUrl = Array.from(nodes).map((node) => node.getAttribute("value")).join("");
  console.log("Assembled Flag URL:", flagUrl);

  const flagResponse = await fetch(flagUrl);
  const finalFlag = await flagResponse.text();
  console.log("Final Flag:", finalFlag);

  setFlag(finalFlag);
  setIsLoading(false); // <- mark done
} catch (error) {
  console.error("Error fetching flag:", error);
  setDisplayText("Error loading flag.");
  setIsLoading(false);
}
  };

  fetchFlag();
}, []);

  useEffect(() => {
    if (!flag || typeof flag !== 'string') return;
    setDisplayText(''); // Reset before animating

    function showNextChar() {
      setDisplayText((prev) => {
        const nextIndex = prev.length;
        if (nextIndex < flag.length) {
          setTimeout(showNextChar, 100);
          return prev + flag.charAt(nextIndex);
        }
        return prev;
      });
    }
    if (flag.length > 0) {
      showNextChar();
    }
    // No cleanup needed for setTimeout
  }, [flag]);

  
return (
  <div className="App" style={{ fontFamily: 'monospace', padding: '2rem' }}>
    <h1>Ramp Challenge</h1>

    {isLoading ? (
      <p>Loading...</p>
    ) : flag ? (
      <p>{displayText}</p>
    ) : (
  <p>{displayText}</p>
    )}
  </div>
);
}

export default App;