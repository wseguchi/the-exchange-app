import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

function Output(props) {
  const [result, setResult] = useState({
    api_response: [],
    loading: true,
  });

  const api_key = 'a63c5681661ffa77f272352c';
  let api_url = `https://v6.exchangerate-api.com/v6/${api_key}/pair/${props.base_code}/${props.target_code}/${props.amount}`;

  const fetchData = () => {
    fetch(api_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResult({ ...result, api_response: data, loading: false });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let last_update = new Date(
    result.api_response.time_last_update_unix * 1000
  ).toLocaleString('en-US');

  // let final_result = Number(result.conversion_result).toFixed(2);

  let dollarUSLocale = Intl.NumberFormat('en-US');
  let final_result = dollarUSLocale.format(
    Number(result.api_response.conversion_result).toFixed(2)
  );

  return (
    <div className={result.loading ? 'Output' : 'Output Output_transition'}>
      {/* <p className='super-sm'>{api_url}</p> */}
      <label className='result'>Grand Total</label>
      <h2>
        {props.target_code_symbol} {final_result}{' '}
        {result.api_response.target_code}
      </h2>
      <p className='mb'>
        1 {result.api_response.base_code} ={' '}
        {Number(result.api_response.conversion_rate).toFixed(4)}{' '}
        {result.api_response.target_code}
      </p>
      <p className='super-sm'>Last Update: {last_update}</p>

      <button onClick={() => window.location.reload(false)}>
        <FontAwesomeIcon icon={faRotateRight} />
        <span> Restart</span>
      </button>
    </div>
  );
}

export default Output;
