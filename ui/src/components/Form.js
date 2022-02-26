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

	const getCalcById = () => {
		fetch(`http://localhost:3001/calculations/:CalcId`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch(console.error)
	}

	const getAllCalcs = () => {
		
	}

	useEffect(() => {
		fetch(`http://localhost:3001/calculations/`, {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch(console.error)
	}, [setString])

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

			{!string ? '' : string}
		</>
	)
}
