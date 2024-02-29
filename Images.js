import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Images.css'

function Images() {
  const [fix, setFix] = useState();
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const filterProducts = () => {
      if (resData) {
        const filteredProducts = resData.filter(
          (product) => product.brand.includes(fix) || product.price === (+fix));
        setResData(filteredProducts) } };
        filterProducts();
  }, [setFix]); 

  const handler = (e) => {
    setFix(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get('https://dummyjson.com/products').then((response) => {
      console.log(response.data);
      setResData(response.data.products);
    });
  };

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <h1>Gallery Snapshots</h1>
          <input className='input1'
            type="text"
            value={fix}
            onChange={handler} />
          <br /> <br />
          <input className='input2'
            type="submit"
             />
          <br />
        </form>
        <div className='info' >
          {resData?.map((item, index) => (
            <div key={index}>
              <div>
                <h2>{item?.brand}</h2>
              </div>
              <div style={{ color: 'red' }}>
                <h3>{item?.price}</h3>
              </div>
              <br />
              <div className='cards'    >
                <img src={item?.thumbnail} alt={item?.brand} height={210} width={310} />
              </div>
              <div className='photos' >
                {item?.images.map((it, imageIndex) => (
                  <div key={imageIndex}>
                    {' '}
                    <img src={it} width={40} height={30} alt={`Image ${imageIndex}`} />{' '}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <br />
      </center>
    </div>
  );
}

export default Images;
