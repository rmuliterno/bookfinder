import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'

import { Button, Input, Icon, Form, Card, Image, Divider, Transition } from 'semantic-ui-react'

import './App.css';

import api from './services/api';

function App() {
	const [loading, setLoading] = useState(false);
	const [pesquisa, setPesquisa] = useState('');
	const [books, setBooks] = useState([]);
	const [visible, setVisible] = useState(false);
	

	async function handleSubmit(event) {
		setLoading(true);

		const response = await api.get(`/volumes?q=${pesquisa}&orderBy=relevance&printType=books&maxResults=12`);

		console.log('Searching for: ', pesquisa);

		console.log(response.data.items);

		setBooks(books.concat(response.data.items));

		setLoading(false);
	}

	function handleChangePesquisa(event) {
		setPesquisa(event.target.value);
	}

	function toggleVisibility() {
		if(visible) {
			console.log('setando para false');
			return setVisible(false);
		}

		console.log('setando para true');
		setVisible(true);
		
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
								placeholder="Title, Author..."
								type="text"
								fluid
								size="big"
								className="pesquisa"
							/>
						</div>
						<Button
							fluid
							inverted
							color='violet'
							loading={loading}
							type="submit"
							size="huge"
							className="botao"
							>
								<Icon name='search' />
								Search
							
						</Button>
					</Form>

					<div>
						<Button
						content={visible ? 'Hide' : 'Show'}
						onClick={toggleVisibility}
						/>
					</div>
					
						<Card.Group className="cardGroup">
						{books.map((book, index) => {
							return (
								<Transition visible={visible} animation='zoom' duration={800}>
									<Card>
										<Image className="bookCover" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '#'} size='mini' wrapped ui={false} />
										<Card.Content>
											<Card.Header className="cardHeader">{book.volumeInfo.title}</Card.Header>
											<Card.Meta className="cardMeta">Published in {book.volumeInfo.publishedDate}</Card.Meta>
											<Card.Description className="cardDesc">
												{book.searchInfo ? book.searchInfo.textSnippet : 'Description Unavailable'}
											</Card.Description>
										</Card.Content>
										<Card.Content extra>
											<a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
												Read more!
											</a>
										</Card.Content>
									</Card>
								</Transition>
							);
						})}
						</Card.Group>

				</div>

			</header>

		</div>
	);
}

export default App;
