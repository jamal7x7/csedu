// AV 100

export enum TokenType {
	Number = "Number",
	Identifier = "Identifier",

	Err = "Err",
	WhiteSpace = "WhiteSpace",

	OpenBracket = "OpenBracket",
	CloseBracket = "CloseBracket",
	OpenParen = "OpenParen",
	CloseParen = "CloseParen",

	LParen = "LParen",
	RParen = "RParen",
	LBracket = "LBracket",
	RBracket = "RBracket",

	BinaryOperator = "BinaryOperator",
	EqualsOperator = "EqualsOperator",

	repete = "repeat",
	avance = "avance",
	recule = "recule",
	procedure = "procedure",
}

export type Token = {
	type: TokenType
	value: string
	raw?: string
}

function token(type: TokenType, value = ""): Token {
	return { type, value }
}

const str = " "
function isAlpha(src: string): boolean {
	return src.toLowerCase() !== src.toUpperCase()
}

console.log(`${str} : isAlpha ====>`, isAlpha(str))

function isNumber(src: string): boolean {
	// return /\d+\.?\d*/.test(src)/[^a-zA-Z]^[\-]{0,1}[0-9]*[\.][0-9]+|^[\-]{0,1}[0-9]+$/
	return /^[^a-zA-Z\s]\-?[0-9]*\.?[0-9]+$|^[^a-zA-Z\s]\-?[0-9]*$/.test(src)
}
function isDigit(src: string): boolean {
	return /^[0-9]$/.test(src)
}
function isWhiteSpace(src: string): boolean {
	return /^\s$/.test(src)
}

console.log(`${str} : isNumber ====>`, isNumber(str))

export function tokenize(sourceCode: string): Token[] {
	const tokens = new Array<Token>()
	const src = sourceCode.split("")
	console.log("🚀 ~ tokenize ~ src:", src)

	while (src.length > 0) {
		if (src[0] === "(") {
			tokens.push(token(TokenType.LParen, src.shift()))
		} else if (src[0] === ")") {
			tokens.push(token(TokenType.RParen, src.shift()))
		} else if (src[0] === "[") {
			tokens.push(token(TokenType.LBracket, src.shift()))
		} else if (src[0] === "]") {
			tokens.push(token(TokenType.RBracket, src.shift()))
		} else if (src[0] === "=") {
			tokens.push(token(TokenType.EqualsOperator, src.shift()))
		} else if (
			src[0] === "+" ||
			src[0] === "-" ||
			src[0] === "*" ||
			src[0] === "/"
		) {
			tokens.push(token(TokenType.BinaryOperator, src.shift()))
		} else if (isAlpha(src[0])) {
			tokens.push(token(TokenType.Identifier, src.shift()))
		} else if (isDigit(src[0])) {
			let num = ""
			while (src.length > 0 && isDigit(src[0])) {
				num += src.shift()
			}
			tokens.push(token(TokenType.Number, num))
		} else if (isWhiteSpace(src[0])) {
			tokens.push(token(TokenType.WhiteSpace, src.shift()))
		} else {
			tokens.push(token(TokenType.Err, src.shift()))
		}
	}
	return tokens
}

export function TokensGenerator(code: string) {
	const splittedCode = code.split(
		/(?=#.*)(?=[\(\)])|(?=[\[\]])|(?=[\(\)])|(?<=[\[\]])|(?<=[\(\)])|(?=[\*\/\+\-])|(?<=[\*\/\+\-])|(?=[>=\<=\>\<])|(?<=[\>=\<=\>\<])|(?=:[a-zA-Z][a-zA-Z0-9_]*)|[ \r\n]/g,
	)
	// console.log("🚀 ~ TokensGenerator ~ splittedCode:", splittedCode)

	const tokens: Token[] = []
	splittedCode.map((t) => {
		if (t.match(/pour/i)) {
			tokens.push({ type: TokenType.procedure, value: "to", raw: t })
		} else if (t.match(/#.*/g)) {
			tokens.push({ type: "comment", value: "#comment", raw: t })
		} else if (t.match(/fin/i)) {
			tokens.push({ type: "end", value: "end", raw: t })
		} else if (t.match(/repete/i)) {
			tokens.push({ type: "repeat", value: "repeat", raw: t })
		} else if (t.match(/si/i)) {
			tokens.push({ type: "if", value: "if", raw: t })
		} else if (t.match(/(av|avance)/i)) {
			tokens.push({ type: "forwardExpr", value: "fd", raw: t })
		} else if (t.match(/(re|recule)/i)) {
			tokens.push({ type: "backwardExpr", value: "bk", raw: t })
		} else if (t.match(/(td|tournedroite)/i)) {
			tokens.push({ type: "rightExpr", value: "td", raw: t })
		} else if (t.match(/(tg|tournegauche)/i)) {
			tokens.push({ type: "leftExpr", value: "tg", raw: t })
		} else if (t.match(/[^a-zA-Z][0-9]+(\.[0-9])*/g)) {
			tokens.push({ type: "Number", value: t, raw: t })
		} else if (t.match(/\[/)) {
			tokens.push({ type: "openBracket", value: "[", raw: t })
		} else if (t.match(/\]/)) {
			tokens.push({ type: "closeBracket", value: "]", raw: t })
		} else if (t.match(/\(/)) {
			tokens.push({ type: TokenType.OpenParen, value: "(", raw: t })
		} else if (t.match(/\)/)) {
			tokens.push({ type: "CloseParen", value: ")", raw: t })
		} else if (t.match(/(?=\+)/)) {
			tokens.push({ type: "sum", value: "+", raw: t })
		} else if (t.match(/(?=\-)/)) {
			tokens.push({ type: "difference", value: "-", raw: t })
		} else if (t.match(/(?=\*)/)) {
			tokens.push({ type: "product", value: "*", raw: t })
		} else if (t.match(/\//)) {
			tokens.push({ type: "quotient", value: "/", raw: t })
		} else if (t.match(/</)) {
			tokens.push({ type: "less", value: "<", raw: t })
		} else if (t.match(/<=/)) {
			tokens.push({ type: "lessequal", value: "<=", raw: t })
		} else if (t.match(/>/)) {
			tokens.push({ type: "greater", value: ">", raw: t })
		} else if (t.match(/>=/)) {
			tokens.push({ type: "greaterequal", value: ">=", raw: t })
		} else if (t.match(/:[a-z][a-zA-Z0-9_]*/)) {
			tokens.push({ type: "variable", value: t, raw: t })
		} else if (t.match(/\b[^:][a-z][a-zA-Z0-9_]*\b/)) {
			tokens.push({ type: "procName", value: t, raw: t })
		}
	})

	return tokens
}
