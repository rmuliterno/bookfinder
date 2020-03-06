import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'

import { Button, Input, Icon, Form, Card, Image } from 'semantic-ui-react'

import './App.css';

import api from './services/api';

function App() {
	const [loading, setLoading] = useState(false);
	const [pesquisa, setPesquisa] = useState('');
	const [books, setBooks] = useState([]);
	

	async function handleSubmit(event) {
		setLoading(true);

		const response = await api.get(`/volumes?q=${pesquisa}&orderBy=relevance&printType=books`);

		console.log('Searching for: ', pesquisa);

		console.log(response.data.items);

		setBooks(books.concat(response.data.items));

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

					<Card.Group itemsPerRow={5}>
					{books.map((book, index) => {
        				return (
							<Card>
								<Image className="bookCover" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '#'} size='mini' wrapped ui={false} />
								<Card.Content>
									<Card.Header>{book.volumeInfo.title}</Card.Header>
									<Card.Meta>Published in {book.volumeInfo.publishedDate}</Card.Meta>
									<Card.Description>
										{book.volumeInfo.description}
									</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<a href={book.volumeInfo.description}>
										Read more!
									</a>
								</Card.Content>
							</Card>
						);
      				})}
					
					</Card.Group>

				</div>

			</header>

		</div>
	);
}

export default App;
