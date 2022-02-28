import { useContext } from 'react'
import { CalculationContext } from '../App'

export default function Results() {
	const { newCalc } = useContext(CalculationContext)

	return (
		<>
			<p>{newCalc.result}</p>
		</>
	)
}
