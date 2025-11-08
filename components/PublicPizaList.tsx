import React, { useEffect, useState } from 'react';
import { PizaObject } from '../app/types';

export function PublicPizaList() {
  const fetchPizaList = async () => {
    const responce = await fetch('/api/piza');
    const data = await responce.json();
    // debugger
    console.warn('fetchPiza response', data);
    setPizaList(data);
  };

  const [pizaList, setPizaList] = useState<PizaObject[]>([]);
  useEffect(() => {
    fetchPizaList();
  }, []);

  const pizzaImages = ['./img/99.jpg', './img/100.jpg', './img/101.jpg'];

  return (
    <>
      {pizaList.length > 0 ? (
        pizaList.map((item, index) => {
          const imageIndex = index % pizzaImages.length;
          return (
            <div
              key={index}
              style={{ marginBottom: '10px', marginLeft: '30px', fontSize: '1.2rem' }}
            >
              <div style={{ fontSize: '1.2rem', color: '#333' }}>
                Piza <b>"{item.name}"</b> with {item.ingridients} at <b>{item.price}</b>$
              </div>
              <div>
                <img
                  src={pizzaImages[imageIndex]}
                  alt="piza"
                  style={{ width: '300px', marginLeft: '500px', marginTop: '20px' }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#777',
          }}
        >
          No items in the list
        </div>
      )}
    </>
  );
}
