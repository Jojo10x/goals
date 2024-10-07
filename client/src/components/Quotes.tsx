import { useState, useEffect } from "react";
import quotes from "../data/quotes.json";
import '../module.css'

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 600000);

    setCurrentQuote(`"${quotes[0].text}"`); 

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentQuote(`"${quotes[quoteIndex].text}"`); 
  }, [quoteIndex]);

  return (
    <div className="mt-20 mx-auto max-w-3xl text-center">
      <p className="text-2xl sm:text-3xl font-semibold italic text-gray-800 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn">
        {currentQuote}
      </p>
    </div>
  );
};

export default Quotes;
