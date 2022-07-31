import './App.css';
import { useState } from 'react';
import DataCurrencyList from './DataCurrencyList';
import Output from './Output';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';

function Input() {
  const [selected, setSelected] = useState({
    base_code: DataCurrencyList[0].CurrCode,
    amount: 1,
    target_code: DataCurrencyList[3].CurrCode,
    target_code_symbol: DataCurrencyList[3].CurrSymbol,
    output: [],
    disabled: false,
    show: true,
    amount_is_empty: false,
    input_is_empty: false,
    output_is_empty: false,
  });
  const handleChangeInput = (event) => {
    console.log(event.target.value);
    setSelected({
      ...selected,
      base_code: event.target.value,
      input_is_empty: false,
    });
  };

  const handleInputAmount = (event) => {
    let amountFixed = Number(event.target.value).toFixed(2);
    console.log(event.target.value);
    setSelected({ ...selected, amount: amountFixed, amount_is_empty: false });
  };

  const handleChangeOutput = (event) => {
    console.log(event.target.value);
    let i = event.target.value;
    let code_symbol = i.split(' ');
    setSelected({
      ...selected,
      target_code: code_symbol[0],
      target_code_symbol: code_symbol[1],
      output_is_empty: false,
    });
  };

  const addOutput = (event) => {
    if (selected.base_code === 'false') {
      setSelected({ ...selected, input_is_empty: true });
    } else if (selected.amount <= 0 || isNaN(selected.amount)) {
      setSelected({ ...selected, amount_is_empty: true });
    } else if (selected.target_code === 'false') {
      setSelected({ ...selected, output_is_empty: true });
    } else {
      let newOutput = (
        <Output
          base_code={selected.base_code}
          amount={selected.amount}
          target_code={selected.target_code}
          target_code_symbol={selected.target_code_symbol}
        />
      );
      setSelected({
        ...selected,
        output: newOutput,
        disabled: true,
        show: false,
        amount_is_empty: false,
        input_is_empty: false,
        output_is_empty: false,
      });
    }
  };

  return (
    <div className='Input'>
      <div className='Input-currency Input-labels'>
        <label htmlFor='base-code'>
          Convert From <div className='rotate'>&#8963;</div>
        </label>
        <select
          className={selected.input_is_empty ? 'empty-bg' : ''}
          name='base-code'
          id='base-code'
          onChange={handleChangeInput}
          disabled={selected.disabled}
        >
          {DataCurrencyList.map((c) => (
            <option value={c.CurrCode}>
              {c.CurrCode} - {c.CurrName}
            </option>
          ))}
        </select>
      </div>
      <div className='Input-amount Input-labels'>
        <label htmlFor='amount'>Amount</label>
        <input
          className={selected.amount_is_empty ? 'empty-bg' : ''}
          type='number'
          id='amount'
          name='amount'
          min='1'
          onInput={handleInputAmount}
          disabled={selected.disabled}
        />
      </div>
      <div className='Output-currency Input-labels'>
        <label htmlFor='target-code'>
          To <div className='rotate'>&#8963;</div>
        </label>
        <select
          className={selected.output_is_empty ? 'empty-bg' : ''}
          name='target-code'
          id='target-code'
          onChange={handleChangeOutput}
          disabled={selected.disabled}
        >
          {DataCurrencyList.map((c) => (
            <option
              value={c.CurrCode + ' ' + c.CurrSymbol}
              selected={c.CurrCode === 'BRL' && true}
            >
              {c.CurrCode} - {c.CurrName}
            </option>
          ))}
        </select>
      </div>
      <div className='submit'>
        <button
          onClick={addOutput}
          style={{ display: selected.show ? 'block' : 'none' }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
          <span> Convert</span>
        </button>
      </div>
      {selected.output}
    </div>
  );
}

export default Input;

/* ; */
