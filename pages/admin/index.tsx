import React, { use, useEffect, useState } from 'react';
import { CreatePizaForm } from './components/CreatePizaForm';
import { PizaObject} from './types';
import { PizaListItem } from './components/PizaListItem';




const App = () => {

	async function apiCreatePiza(name: string, ingridients: string, price: number) {
	const request = await fetch('/api/piza', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, ingridients, price }),
	});
	return request.json();
	}

	async function apiEditPiza(id: number, name: string, ingridients: string, price: number) {
	const request = await fetch(`/api/piza/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, ingridients, price }),
	});
	return request.json();
	}

	async function apiDeletePiza(id: number) {
	const request = await fetch(`/api/piza/${id}`, {
		method: 'DELETE',
	});
	return request.json();
	}

	

	const [pizaList, setPizaList] = useState<PizaObject[]>([]);
	useEffect(() => {
		fetchPizaList()
	}, [])

	async function addItem(name: string, ingridients: string, price: number){
		let createResponse = await apiCreatePiza(name, ingridients, price);
		console.log('createResponse', createResponse)
		await fetchPizaList()
		}



	async function deleteItem(id:number){
		let deleteResponse = await apiDeletePiza(id);
		console.log('deleteResponse', deleteResponse)
		await fetchPizaList()
	}

	async function editItem(id: number, name: string, ingridients: string, price: number){
		let editResponse = await apiEditPiza(id, name, ingridients, price);
		console.log('editResponse', editResponse)
		await fetchPizaList()
	}

	const fetchPizaList = async () => {
		const responce = await fetch('/api/piza');
		const data = (await responce.json())
		// debugger
		console.log('fetchPiza response', data)
		setPizaList(data)
	}
	
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
			<CreatePizaForm addItem={addItem}/>
			<div
				style={{
					background: '#f9f9f9',
					padding: '20px',
					borderRadius: '8px'
				}}
			>




				{pizaList.length > 0 ? (
					pizaList.map((item, index) => (

						<PizaListItem key={index} piza={item} onDelete={deleteItem} onEdit={editItem} />

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

export default App;
