import { useContext } from 'react'
import { CalculationContext } from '../App'

export default function Form() {
	const { form, setForm, newCalc } = useContext(CalculationContext)

	const onSubmit = (event) => {
		event.preventDefault()
		fetch('http://localhost:3001/calculations', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCalc),
		}).then(console.log(newCalc))
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				<label>
					String:
					<textarea
						name='string'
						onChange={(event) => {
							setForm({ ...form, [event.target.name]: event.target.value })
						}}
					/>
				</label>
				<input type='submit' value='Submit' />
			</form>
		</>
	)
}
