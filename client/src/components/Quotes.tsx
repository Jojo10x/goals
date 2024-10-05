import { useState, useEffect } from "react";
import quotes from "../data/quotes.json";

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 600000); 

    setCurrentQuote(quotes[0].text);

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
   
    setCurrentQuote(quotes[quoteIndex].text);
  }, [quoteIndex]);

  return (
    <div className="mt-20 text-center text-lg font-semibold text-gray-700">
      <p>{currentQuote}</p>
    </div>
  );
};

export default Quotes;
