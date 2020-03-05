import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'

import { Button, Input, Icon, Form } from 'semantic-ui-react'

import './App.css';

import api from './services/api';

function App() {
	const [loading, setLoading] = useState(false);
	const [pesquisa, setPesquisa] = useState('');
	

	async function handleSubmit(event) {
		setLoading(true);

		const response = await api.get(`/volumes?q=${pesquisa}&orderBy=relevance&printType=books`);

		console.log('Searching for: ', pesquisa);

		console.log(response.data.items);

		setLoading(false);
	}

	function handleChangePesquisa(event) {
		setPesquisa(event.target.value);
	}

	return (
		<div className="App">
			<header className="App-header">
				<div className="top">
					<h2 className="title">
						<Icon className="icone" name='book' />
						Book Finder
				</h2>
				</div>

				<div className="App-body container">
					<Form onSubmit={handleSubmit}>
						<div>
							<Input
								onChange={handleChangePesquisa}
								placeholder="Título, Autor..."
								type="text"
								fluid
								size="big"
								className="pesquisa"
							/>
						</div>
						<Button
							inverted
							color='violet'
							loading={loading}
							type="submit"
							size="huge"
							>
								Pesquisar!
							
						</Button>
					</Form>

				</div>

			</header>

		</div>
	);
}

export default App;
