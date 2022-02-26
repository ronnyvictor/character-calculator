const { initializeApp, getApps, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const certificate = require('./creds.json')

function connectToFirestore() {
	if (!getApps().length) {
		initializeApp({
			credential: cert(certificate),
		})
	}
	return getFirestore()
}

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!!`)
})

function calcCharsNoSpaces(str) {
	return str.replace(/\s/g, '').length
}

const insertCalculation = async (calculation) => {
	const db = connectToFirestore()
	await db
		.collection('calculations')
		.add(calculation)
		.then((doc) => {
			console.log('New calculation', doc.id)
			return db
				.collection('calculations')
				.doc(doc.id)
				.update({
					result: calcCharsNoSpaces(calculation.string),
				})
		})
		.catch(console.error)
}

app.post('/calculations', (request, response) => {
	const calculation = request.body
	// const calculation = { string }
	insertCalculation(calculation)
		.then(
			response
				.status(202)
				.send(`Your string "${calculation.string}" has been calculated`)
		)
		.catch((err) => response.status(500).send(err))
})

app.get('/calculations/:calcId', (request, response) => {
	const db = connectToFirestore()
	const { calcId } = request.params
	db.collection('calculations')
		.doc(calcId)
		.get()
		.then((doc) => {
			let calc = doc.data()
			calc.id = doc.id
			response.status(200).send(calc)
		})
		.catch((err) => response.status(500).send(err))
})

	app.get('/calculations', (request, response) => {
    const db = connectToFirestore()
    db.collection('calculations').get()
    .then(snapshot => {
        const calculations = snapshot.docs.map(doc => {
            let calculation = doc.data()
            calculation.id = doc.id
            return calculation
        })
        response.status(200).send(calculations)
    })
    .catch(console.error)
})
