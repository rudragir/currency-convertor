import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import Ticker from "./components/Ticker";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const CurrencyInfo = useCurrencyInfo(from);
  const options = Object.keys(CurrencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!amount || !CurrencyInfo[to]) return;
    setConvertedAmount((amount * CurrencyInfo[to]).toFixed(2));
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ---------------- Ticker ---------------- */}

      <Ticker />

      {/* ---------------- Main Content ---------------- */}

      <div className="flex flex-1">

        {/* ---------------- Left Hero ---------------- */}

        <div className="w-1/4 flex items-center justify-center ">

          <div className="relative overflow-hidden m-6 p-8 rounded-[32px] flex flex-col justify-center h-[500px] border-4 border-black bg-violet-700 text-purple-100">

            <p className="text-lime-300 font-bold tracking-widest uppercase">
              Live Exchange Rate
            </p>

            <h1 className="text-6xl font-black my-8 border-b-2 border-lime-300 pb-8">
              Currency
              <br />
              App
            </h1>

            <p className="text-lg leading-8">
              Convert currencies instantly with real-time exchange
              rates from around the world.
            </p>

            <span className="absolute -bottom-10 -right-2 text-[220px] font-black text-white/10 pointer-events-none select-none">
              $
            </span>

          </div>

        </div>

        {/* ---------------- Divider ---------------- */}

        <div className="w-6 self-stretch flex flex-col">

          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 ${
                i % 2 === 0 ? "bg-lime-400" : "bg-black"
              }`}
            />
          ))}

        </div>

        {/* ---------------- Right Side ---------------- */}

        <div
          className="w-3/4 flex items-center justify-center bg-black"
          style={{
            backgroundImage: `
              linear-gradient(rgba(163,230,53,0.12) 4px, transparent 1px),
              linear-gradient(90deg, rgba(163,230,53,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        >

          <div className="relative w-full max-w-md rounded-xl border-4 border-lime-400 p-6 backdrop-blur-md bg-white/5">

            {/* Converter Label */}

            <div className="absolute -top-4 left-6 bg-lime-400 px-4 py-1 font-mono font-bold text-black rounded">
              Currency Converter
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >

              <div className="">

                <InputBox
                  label="From"
                  amount={amount}
                  onAmountChange={setAmount}
                  currencyOptions={options}
                  onCurrencyChange={setFrom}
                  selectCurrency={from}
                />

              </div>

              <div className="relative h-4 border-b-2 border-lime-300 mb-4">

                <button
                  type="button"
                  onClick={swap}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1 border-2 border-lime-400 bg-violet-700 px-5 py-1 text-white font-semibold hover:bg-violet-600 transition"
                >
                  SWAP
                </button>

              </div>

              <div className="mt-2 mb-5">

                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={setTo}
                  selectCurrency={to}
                  amountDisable
                />

              </div>

              <button
                type="submit"
                className="w-full bg-violet-700 hover:bg-violet-500 hover:text-fuchsia-950 transition transition text-white py-3 rounded-lg font-bold"
              >
                Convert {from.toUpperCase()} → {to.toUpperCase()}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;