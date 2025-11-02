import React from 'react';
import CreatePizaForm from './components/CreatePizaForm';
import PizaListItem from './components/PizaListItem';
import { usePizas } from './usePizas';
import { PizaObject } from './types';

export default function AdminPage() {
  const { pizas, add, edit, remove, } = usePizas();


  const handleAdd = async (name: string, ingredients: string, price: number) => {
    try {
      await add(name, ingredients, price);
    } catch (e: any) {
      alert('Create failed: ' + (e.message || e));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this pizza?')) return;
    try {
      await remove(id);
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || e));
    }
  };

  const handleEditRequest = async (p: PizaObject) => {
    const newName = prompt('Pizza name', p.name);
    if (newName == null) return;

    const newIngridients = prompt('Pizza ingredients', p.ingridients);
    if (newIngridients == null) return;

    let priceValue: number | null = null;
    while (priceValue === null) {
      const priceInput = prompt('Pizza price', String(p.price));
      if (priceInput == null) return; // user cancel
      const parsed = parseFloat(priceInput);
      if (isNaN(parsed)) {
        alert('Wrong price, try again');
        continue;
      }
      priceValue = parsed;
    }

    try {
      await edit(p.id, { name: newName.trim(), ingridients: newIngridients.trim(), price: priceValue });
    } catch (e: any) {
      alert('Update failed: ' + (e.message || e));
    }
  };
	
	return (<>
		<div
			style={{
				fontFamily: 'Arial, sans-serif',
				maxWidth: '1200px',
				margin: '0 auto',
				padding: '20px',
			}}
		>
			<div
				style={{
					textAlign: 'center',
					fontSize: '2.5rem',
					fontWeight: 'bold',
					marginBottom: '20px',
					color: 'green',
				}}
			>
				Admin
			</div>

			<div
				style={{
					textAlign: 'center',
					fontSize: '1.5rem',
					fontWeight: 'bold',
					marginBottom: '20px',
				}}
			>
				Piza List
			</div>
			<CreatePizaForm onAdd={handleAdd}/>
			<div
				style={{
					background: '#f9f9f9',
					padding: '20px',
					borderRadius: '8px'
				}}
			>




				{pizas.length > 0 ? (
					pizas.map((item, index) => (

						<PizaListItem key={index} piza={item} onDelete={handleDelete} onEditRequest={handleEditRequest} />

					))
				) : (
					<div
						style={{
							textAlign: 'center',
							fontSize: '1.2rem',
							color: '#777'
						}}
					>
						No items in the list
					</div>
				)}
			</div>


		</div>
		
	</>
	);
};


