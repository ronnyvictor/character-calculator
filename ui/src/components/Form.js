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
			body: JSON.stringify(string),
		}).then(console.log(string))
	}

	const fetchCalc = (calcId) => {
		fetch(`http://localhost:3000/calculations/${calcId}`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => setString(data))
			.catch(console.error)
	}

	// useEffect(() => {
	//   fetchCalc(/*calcId*/)
	// }, [string])

	const onSubmit = (event) => {
		event.preventDefault()
		addCalc(string)
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
		</>
	)
}
