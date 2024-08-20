import express from 'express'
import payload from 'payload'
import path from 'path'
import {Contact} from "payload/generated-types";
require('dotenv').config({
	path: path.resolve(__dirname, '../.env'),
})
const app = express()
const PORT = process.env.PORT || 8000

// Redirect root to Admin panel
app.get('/', (_, res) => {
	res.redirect('/admin')
})

const start = async () => {
	// Initialize Payload
	await payload.init({
		secret: process.env.PAYLOAD_SECRET || '',
		express: app,
		onInit: async () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		},
	})

	// Add your own express routes here
	app.listen(process.env.PORT, async () => {
		payload.logger.info(`Server listening on port ${PORT}`)
	})
}

void start()
