import Axios from 'axios';
import React from 'react';
import {
	Card,
	Container,
	Divider,
	Input,
} from 'semantic-ui-react';
import userService from '../services/userService';
import PageHeader from './common/PageHeader';
import UserResult from './common/UserResult';
import serverUrl from '../services/serverUrl';

const Search = (props) => {
	const [search, setSearch] = React.useState('');
	const [results, setResults] = React.useState([]);
	React.useEffect(() => {
		doSearch();
	}, [search]);

	const doSearch = async () => {
		if (search !== '') {
			try {
				let { data } = await Axios.get(
					`${serverUrl}/api/users/search/${search}`,
					{
						headers: {
							'Content-Type': 'application/json',
							'x-auth-token': userService.getJwt(),
						},
					}
				);
				setResults(data);
			} catch (err) {
				setResults([]);
			}
		}
	};

	return (
		<div>
			<PageHeader
				title="Search other users"
				icon="search"
				desc="Seach by other users' names."
			/>
			<Container text>
				<Input
					fluid
					icon="search"
					placeholder="Search..."
					value={search}
					onChange={(e, { value }) => {
						setSearch(value);
					}}
				/>
			</Container>
			<Divider hidden />
			<Container>
				<Card.Group itemsPerRow="3" stackable>
					{results.map((user) => (
						<UserResult
							name={user.name}
							picture_uri={user.picture_uri}
							key={user._id}
							history={props.history}
							id={user._id}
							birthday={user.birthday}
						/>
					))}
				</Card.Group>
			</Container>
			<Divider hidden />
		</div>
	);
};

export default Search;
