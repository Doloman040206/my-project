import React, { use, useEffect, useState } from 'react';

export interface ICreatePizaFormProps {
    addItem: (name: string, ingredients: string, price: number) => void;
}

export function CreatePizaForm(props: ICreatePizaFormProps) {
    const [nameInput, setNameInput] = useState('');
    const [ingredientsInput, setIngredientsInput] = useState('');
    const [priceInput, setPriceInput] = useState('');

    const addItem = () => {
        // 1. check all fields are 
        if (!nameInput || !ingredientsInput || !priceInput) {
            alert('Please, fill all fields');
            return;
        }
        let parsedPrice = parseFloat(priceInput)
        if (isNaN(parsedPrice)) {
            alert('Wrong price');
            return;
        }
        // 2. call props.addItem() with new object
        props.addItem(nameInput, ingredientsInput, parsedPrice);
        
        // 3. reset all inputs/fields
        setNameInput('')
        setIngredientsInput('')
        setPriceInput('')
    };

    return (
        <div>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="nameInput" style={{ marginRight: '12px', fontSize: '1.2rem' }}>Name:</label>
                <input
                    id="nameInput"
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        width: '492px',
                        marginRight: '10px',

                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder="Add name..."
                    value={nameInput}
                    onChange={(event) =>
                        setNameInput(event.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="ingredientsInput" style={{ marginRight: '10px', fontSize: '1.2rem', marginLeft: '-35px' }}>Ingridients:</label>
                <input
                    id="ingredientsInput"
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        width: '492px',
                        marginRight: '10px',

                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder="Add ingridients..."
                    value={ingredientsInput}
                    onChange={(event) =>
                        setIngredientsInput(event.target.value)}
                />
            </div>


            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <label htmlFor="priceInput" style={{ marginRight: '20px', fontSize: '1.2rem' }}>Price:</label>
                <input
                    id="priceInput"
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        width: '402px',

                        marginRight: '10px',

                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    placeholder="Add price..."
                    value={priceInput}
                    onChange={(event) =>
                        setPriceInput(event.target.value)}
                />
                
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={addItem}
                >
                    ADD
                </button>
            </div>



        </div>
    )

}
