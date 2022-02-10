const { initializeApp, getApps, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const certificate = require('./creds.json')

function connectToFirestore() {
    if (!getApps().length) {
        initializeApp({
            credential: cert(certificate)
        })
    }
    return getFirestore()
}

const express = require('express')
const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Listening on port 3,000!!')
})

function calcCharsNoSpaces(str) {
    return str.replace(/\s/g, '').length
}

const insertCalculation = async (calculation) => {
    const db = connectToFirestore()
    await db.collection('calculations').add(calculation)
        .then((doc) => {
            console.log('New calculation', doc.id)
            return db.collection('calculations').doc(doc.id).update({
                result: calcCharsNoSpaces(calculation.sentence)
            })
        })
        .catch(console.error)
}

app.post('/calculations', (request, response) => {
    const db = connectToFirestore()
    const { sentence } = request.body
    const calculation = { sentence }
    insertCalculation(calculation)
        .then(response.status(202).send(`Your string "${calculation.sentence}" has been calculated`))
        .catch(err => response.status(500).send(err))
})

app.get('/calculations/:calcId', (request, response) => {
    const db = connectToFirestore()
    const { calcId } = request.params
    db.collection('calculations').doc(calcId).get()
        .then(doc => {
            let calc = doc.data()
            response.status(200).send(`Your string is ${calc.result} characters long`)
        })
        .catch(err => response.status(500).send(err))
})
