import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

function Output(props) {
  const [result, setResult] = useState([]);

  const api_key = 'a63c5681661ffa77f272352c';
  let api_url = `https://v6.exchangerate-api.com/v6/${api_key}/pair/${props.base_code}/${props.target_code}/${props.amount}`;

  const fetchData = () => {
    fetch(api_url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResult(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let last_update = new Date(
    result.time_last_update_unix * 1000
  ).toLocaleString('en-US');

  let final_result = Number(result.conversion_result).toFixed(2);

  return (
    <div className='Output'>
      {/* <p className='super-sm'>{api_url}</p> */}
      <label className='result'>Grand Total</label>
      <h2>
        {final_result} {result.target_code}
      </h2>
      <p className='mb'>
        1 {result.base_code} = {Number(result.conversion_rate).toFixed(4)}{' '}
        {result.target_code}
      </p>
      <p className='super-sm'>Last Update: {last_update}</p>
      <a href='/'>
        <button>
          <FontAwesomeIcon icon={faRotateRight} />
          <span> Restart</span>
        </button>
      </a>
    </div>
  );
}

export default Output;
