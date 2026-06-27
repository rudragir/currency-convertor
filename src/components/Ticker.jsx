import { useEffect, useState } from "react";

function Ticker() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch(
          "https://latest.currency-api.pages.dev/v1/currencies/inr.json"
        );

        const data = await res.json();

        setRates([
          {
            pair: "INR/USD",
            value: data.inr.usd.toFixed(4),
          },
          {
            pair: "INR/EUR",
            value: data.inr.eur.toFixed(4),
          },
          {
            pair: "INR/GBP",
            value: data.inr.gbp.toFixed(4),
          },
          {
            pair: "INR/JPY",
            value: data.inr.jpy.toFixed(4),
          },
          {
            pair: "INR/AUD",
            value: data.inr.aud.toFixed(4),
          },
          {
            pair: "INR/CAD",
            value: data.inr.cad.toFixed(4),
          },
          {
            pair: "INR/AED",
            value: data.inr.aed.toFixed(4),
          },
          {
            pair: "INR/CNY",
            value: data.inr.cny.toFixed(4),
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRates();

    const interval = setInterval(fetchRates, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-lime-400 border-y-2 border-black py-2">
      <div className="flex w-max animate-marquee">
        {[...rates, ...rates].map((item, index) => (
          <span
            key={index}
            className="mx-7 whitespace-nowrap font-bold text-black"
          >
            {item.pair}: {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;