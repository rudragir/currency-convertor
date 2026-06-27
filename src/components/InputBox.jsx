import React , {useId} from 'react'
// useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.
// Do not call useId to generate keys in a list. Keys should be generated from your data.

function InputBox({
    label,
    amount,
    onAmountChange ,
    onCurrencyChange ,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable =false,
    currencyDisable =false,

    className =""
}) {
   
  //optimising for label
  const amountInputId = useId()

    return (
        <div className={`bg-black p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-[70%] text-white border-r-2">
                <label htmlFor={amountInputId}  className="text-white mb-2 inline-block">
                {/* amount input id is binded with the input as id too */}
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-2xl"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount === 0 ? "" : amount}
                    onChange={(e) => onAmountChange &&  onAmountChange(Number(e.target.value))} // to run only when it is present when onAmountChange is not passed
                    
                />
            </div>
            <div className="w-[30%] flex flex-wrap justify-end text-right">
                <p className="text-lime-400 mb-2 w-full">Currency Type</p>
                <select
                    className="w-full m-2 font-bold rounded-lg px-1 py-1 bg-black text-white border-2 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e)  => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled ={currencyDisable}
                >
                    
                        {currencyOptions.map((currency) => (
                          // key is used in loop to increase the efficiency
                          <option key ={currency} value={currency}>
                            {currency}
                        </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;

// in bigger projects  another js file is made to import all components