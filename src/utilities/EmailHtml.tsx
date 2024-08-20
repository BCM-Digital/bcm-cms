import { FormattedEmail } from '@payloadcms/plugin-form-builder/types'
import { render } from '@react-email/render'
import * as React from 'react'

import DefaultEmailTemplate from '../emails/templates/DefaultEmailTemplate'

function EmailHtml(email: FormattedEmail) {
	return render(<DefaultEmailTemplate email={email.html} />, {
		pretty: true,
	})
}
export default EmailHtml
