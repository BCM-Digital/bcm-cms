import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'
import formatEmailHtml from '../formatEmailHtml'


type DefaultEmailTemplateProps = {
	email: string
}


function DefaultEmailTemplate({ email }: DefaultEmailTemplateProps) {
	const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL
		? `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media`
		: 'https://cms.littledash.com.au/media'

	const res = {
		businessName: 'Demo Business name',
		primaryEmail: 'hello@demobusiness.com.au'
	}

	const businessName = res.businessName
		? res.businessName
		: 'Demo Business name'

	const emailAddress = res.primaryEmail
		? res.primaryEmail
		: 'hello@demobusiness.com.au'

	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Section style={main}>
				<Container style={container}>
					<Section style={header}>
						<Img
							src={`${baseUrl}/logo.png`}
							style={headerLogo}
							alt={`${businessName} logo`}
							width={160}
						/>
					</Section>
					<Section style={content}>{formatEmailHtml(email)}</Section>

					<Section style={footerLogoContainer}>
						<Img
							src={`${baseUrl}/logo.png`}
							style={footerLogo}
							alt={`${businessName} logo`}
							width={120}
						/>
					</Section>
					<Section style={address}>
						<Text style={footerText}>49 Tiger St, Ipswich, QLD 4305</Text>
					</Section>
					<Section style={{ margin: '0' }}>
						<Text style={socials}>
							<Link
								style={footerLink}
								href={`mailto:${emailAddress}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Email
							</Link>
						</Text>
					</Section>
				</Container>
			</Section>
		</Html>
	)
}

export default DefaultEmailTemplate

const main = {
	backgroundColor: '#ECEEE6',
	color: '#111827',
	margin: '0 auto',
	fontFamily:
		"'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Droid Sans', 'Helvetica Neue', serif",
}

const container = {
	maxWidth: '600px',
	margin: '24px auto',
	width: '100%',
}

const content = {
	backgroundColor: '#ffffff',
	border: '1px solid #EEEAD3',
	borderRadius: '4px',
	maxWidth: '600px',
	margin: '24px 0',
	padding: '24px 24px 32px 24px',
	width: '100%',
}

const header = {
	marginTop: '32px',
}
const headerLogo = {}

const heading = {
	fontFamily:
		"'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const footerLink = {
	color: '#99C578',
	textDecoration: 'underline',
}

const footerLogoContainer = {}

const footerLogo = {
	marginBottom: '12px',
}

const footerText = {
	color: '#111827',
	fontSize: '12px',
	lineHeight: '15px',
	marginBottom: '12px',
}

const socials = {
	fontSize: '12px',
	lineHeight: '15px',
	marginRight: 'auto',
	textAlign: 'left' as const,
}

const address = {
	fontSize: '12px',
	lineHeight: '15px',
	marginBottom: '12px',
	textAlign: 'left' as const,
}
