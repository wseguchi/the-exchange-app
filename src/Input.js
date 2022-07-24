import './App.css';
import { useState } from 'react';
import DataCurrencyList from './DataCurrencyList';
import Output from './Output';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassDollar } from '@fortawesome/free-solid-svg-icons';

function Input() {
  const [selected, setSelected] = useState({
    base_code: DataCurrencyList[0][0],
    amount: 0,
    target_code: DataCurrencyList[0][0],
    output: [],
    disabled: false,
    show: true,
  });
  const handleChangeInput = (event) => {
    console.log(event.target.value);
    setSelected({ ...selected, base_code: event.target.value });
  };

  const handleInputAmount = (event) => {
    let amountFixed = Number(event.target.value).toFixed(2);
    console.log(event.target.value);
    setSelected({ ...selected, amount: amountFixed });
  };

  const handleChangeOutput = (event) => {
    console.log(event.target.value);
    setSelected({ ...selected, target_code: event.target.value });
  };

  const addOutput = (event) => {
    let newOutput = (
      <Output
        base_code={selected.base_code}
        amount={selected.amount}
        target_code={selected.target_code}
      />
    );
    setSelected({
      ...selected,
      output: newOutput,
      disabled: true,
      show: false,
    });
  };

  return (
    <div className='Input'>
      <div className='Input-currency Input-labels'>
        <label htmlFor='base-code'>
          Convert From <div className='rotate'>&#8963;</div>
        </label>
        <select
          name='base-code'
          id='base-code'
          onChange={handleChangeInput}
          disabled={selected.disabled}
        >
          {DataCurrencyList.map((c) => (
            <option value={c[0]}>
              {c[0]} - {c[1]}
            </option>
          ))}
        </select>
      </div>
      <div className='Input-amount Input-labels'>
        <label htmlFor='amount'>Amount</label>
        <input
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
          name='target-code'
          id='target-code'
          onChange={handleChangeOutput}
          disabled={selected.disabled}
        >
          {DataCurrencyList.map((c) => (
            <option value={c[0]}>
              {c[0]} - {c[1]}
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

/* <img
  src={
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyRDFBRDI0NTE3NkYxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRDFBRDI0NjE3NkYxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdERDBDNDA4MTc1MzExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJEMUFEMjQ0MTc2RjExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GPq/agAAAiRJREFUeNrEVb9rFEEUfm9m9nb3bhNz50UMClopRAsFrUURW1tBrSzsLPwfbPwDbGz8F8QiIkLAKiCkUIKiGBEFwXAhd7fZH7Mz83zZtbC4TdyF4LDF8N7ON9/73jczuN4/A4czBBzaqIUmAA+Q0wjQRzkUCsv4USEHKKs4/0DtWOdAgxLxrUk+mqyHIkLx2eg1k1gA3kwDtYFeFOqVnj5NRwXQip7eGG9+svlPV1wff3mejwuiZ9n2i3zCRWANAta1kaFX9OS1jkdkHdGyCt6blMmel8E3p1OgY6iueL2b/pEtZ5qx5kRCLIhMyK4WMQFt2HzdpEzypZ5OnOVUSoT1gqi6BOvA7ZoDUan5JB3BXxPeOALBahigxloLQO4SFy5hBjMOpuA0zc4ebL4OYExuZl0dxNiRh63MZ4jYXjzJiG77/cuqW8UvqvBO0Ge+jjsplKHmgrCIIeICyke9pXPKZ+kvqPCS1+X6T4vO42iJN/YB22jNIo6cYWN9dfqdya560TxKruKaF32w2abVW2VWtNCa6fRQnpTeD1vcD4anZOdNEa8VCZN9EA6/2+KE9Ob3dUit+XbJHRfqXjBgTZjYhk3nUDAQN/CsDJbDYIfcbvlhU+hqQUpuSo6tcstfYMp8q9z1+7+cyfZMuUe4zZGp/GfLxRm4bbIPu4scYbIJOO6EO+hSVf9y8zLQmGxUKrNDRu7HtSH0n+NHrpr8/1fmtwADAEjB+xzEjgF0AAAAAElFTkSuQmCC'
  }
/>; */
