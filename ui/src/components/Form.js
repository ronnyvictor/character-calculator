import { useState, useEffect } from 'react'

export default function Form() {
	const [string, setString] = useState('')

	const addCalc = () => {
		fetch('http://localhost:3001/calculations', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ string: string }),
		}).then(console.log(string))
	}

	const fetchCalc = () => {
		fetch(`http://localhost:3001/calculations/U5ua16YZYONslNmxuZ86`, {
			method: 'GET',
		})
			.then((res) => {
				res.json()
				console.log(res)
			})
			.then((data) => {
				setString(data.string)
				console.log(data) 
			})
			.catch(console.error)
	}

	useEffect(() => {
		fetchCalc()
	}, [])

	const onSubmit = (event) => {
		event.preventDefault()
		addCalc()
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				<label>
					String:
					<textarea
						value={string}
						onChange={(event) => setString(event.target.value)}
					/>
				</label>
				<input type='submit' value='Submit' />
			</form>

			{!string ? <h1>Loading...</h1> : string}
		</>
	)
}
