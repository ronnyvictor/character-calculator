import { useState, useEffect, createContext } from 'react'
import Form from './components/Form'
import Results from './components/Results'
import './App.css'

export const CalculationContext = createContext()

export default function App() {
	const [form, setForm] = useState({string: ''})

	function calcCharsNoSpaces(str) {
		return str.replace(/\s/g, '').length
	}

	const newCalc = {
		string: form.string,
		result: calcCharsNoSpaces(form.string),
	}

	// useEffect(() => {
	// 	fetch('http://localhost:3001/calculations', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(newCalc),
	// 	}).then(console.log(newCalc))
	// }, [newCalc])

	return (
		<>
			<CalculationContext.Provider
				value={{
					form,
					setForm,
					newCalc,
				}}
			>
				<Form />
				<Results />
			</CalculationContext.Provider>
		</>
	)
}
