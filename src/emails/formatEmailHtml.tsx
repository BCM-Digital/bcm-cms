import { Link } from '@react-email/link'
import { Text } from '@react-email/text'
import parse, {
	Element,
	HTMLReactParserOptions,
	domToReact,
	DOMNode,
} from 'html-react-parser'
import * as React from 'react'

const text = {
	color: '#3D3E40',
	fontSize: '12px',
	lineHeight: '15px',
	fontFamily:
		"'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Droid Sans', 'Helvetica Neue', serif",
	marginBottom: '8px',
}

const textLink = {
	color: '#99C578',
	fontSize: '12px',
	lineHeight: '15px',
	textDecoration: 'underline',
}

const options: HTMLReactParserOptions = {
	replace: (domNode) => {
		if (domNode instanceof Element && domNode.attribs) {
			switch (domNode.name) {
				case 'ol':
					return (
						<ol>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</ol>
					)
				case 'ul':
					return (
						<ul>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</ul>
					)
				case 'li':
					return (
						<li>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</li>
					)
				case 'strong':
					return (
						<strong>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</strong>
					)
				case 'p':
					return (
						<Text style={text}>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</Text>
					)
				case 'a':
					return (
						<Link
							href={domNode.attribs.href}
							target="_blank"
							rel="noopener noreferrer"
							style={textLink}
						>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</Link>
					)
				default:
					return (
						<>
							{domToReact((domNode as Element).children as DOMNode[], options)}
						</>
					)
			}
		}
	},
}

const formatEmailHtml = (html: string) => {
	return parse(html, options)
}

export default formatEmailHtml
