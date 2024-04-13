"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EnterIcon, ResetIcon } from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import {
	CornerDownLeft,
	GitPullRequestArrowIcon,
	Maximize,
	Maximize2Icon,
	ScanEye,
	TurtleIcon,
	ZoomIn,
	ZoomOut,
	ZoomOutIcon,
} from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useState } from "react"
import {
	KeepScale,
	TransformComponent,
	TransformWrapper,
} from "react-zoom-pan-pinch"
import { LogoExpressionAtom } from "./LogoStates"
import { keyWordsFr } from "./LogoUtils"
import { TokensGenerator, tokenize } from "./lexer"

const r = /gap/g

const page = () => {
	/**
	 * Returns a color value based on the input string.
	 * @param x - The input string for which the color value needs to be determined.
	 * @returns A color value based on the input string. Possible values are "purple-500" or "default".
	 */
	const coloriser = useCallback((x: string) => {
		if (keyWordsFr.flatMap((kw) => kw.split(" ")).includes(x.toLowerCase())) {
			return "text-[#c678dd]" //purple
		}
		if (x.toLowerCase().match(/lc|bc|cl|ep/g)) {
			return "text-teal-600"
		}
		if (!Number.isNaN(Number(x))) {
			return "text-[#d19a66]" //orange
		}
		if (x.toLowerCase().match(/\brepete\b/g)) {
			return "text-[#61afef]" //blue
		}
		// if (x.match(/\d+/g)) {
		// 	return "text-[#d19a66]" //orange
		// }

		return ""

		// switch (x.toLowerCase()) {
		// 	case "td":
		// 	case "tg":
		// 	case "av":
		// 	case "re":
		// 		return "blue"
		// 	case "lc":
		// 	case "bc":
		// 		return "teal"

		// 	default:
		// 		return "slate"
		// }
	}, [])
	const [content, setContent] = useState("")
	const [expression, setExpression] = useAtom(LogoExpressionAtom)
	// // // console.log("🚀 ~ page ~ expression:", expression)

	//regexp to split content when using space or new line
	const tokens = content
		.replace(/(?=[\[\]])|(?=[\(\)])|(?<=[\[\]])|(?<=[\(\)])/g, " ")
		.split(/[ \n\r]+/g)
		.map((t) => {
			// // // console.log("🚀 ~ tokens ~ coloriser(t) :", coloriser(t))
			return { node: t, color: coloriser(t) }
		})
	// // console.log("🚀 ~ page ~ tokens:", tokens)

	const handleContentChange = (e: React.FormEvent<HTMLPreElement>) => {
		const c = (e.target as HTMLPreElement).innerText || ""

		setContent(c)
		// setContent((e.target as Element).innerHTML)
		// console.log(content)
		// console.log(content.split(" "))
		// console.log(content.split("\n"))

		// e.target.innerText = ""
	}

	const handleEnterChange = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		const expr = "av 300"

		setExpression(tokens)
		// console.log(expression)
	}

	useEffect(() => {
		const s = "repete 4 [av 100 td 90]"
		const c2 = `
                pour koch_sub1 :ordre :lon
                ##########################
                # Dessin d'une ligne subdivisée en lignes.
                si (:ordre < 1.2) | (:lon < 1) [avance :lon stop]

                koch_sub1 :ordre-1 :lon/3
                tg 60
                koch_sub1 :ordre-1 :lon/3
                td 120
                koch_sub1 :ordre-1 :lon/3
                tg 60
                koch_sub1 :ordre-1 :lon/3
                fin
                `
		// console.log(TokensGenerator(c2))

		tokenize(s)
		console.log("🚀 ~ useEffect ~ tokenize(s):", tokenize(s))
	}, [])

	return (
		<div className="mx-4 mt-[70px]  flex   min-h-full items-center justify-center ">
			<div className="grid min-h-full min-w-full grid-cols-[400px_minmax(300px,_1fr)_1fr] grid-rows-5 gap-4 ">
				<pre
					onInput={(e) => handleContentChange(e)}
					contentEditable
					className=" bg-muted-foreground/5 border-muted-foreground/20 row-span-5 min-h-[calc(100vh-theme(spacing.20))]  text-wrap rounded-xl  border-[1px] p-4 outline-none"
				>
					{/* {content} */}
				</pre>
				<div className="bg-muted/50 col-span-2 row-span-4 flex items-center justify-center   overflow-clip rounded-xl ">
					<SvgStage />
				</div>

				<div className="bg-muted col-span-2 flex justify-between rounded-xl p-4 ">
					<div className="">
						{tokens.map((t, i) => (
							<span key={t.node} className={`mx-1 font-mono ${t.color}`}>
								{t.node}
							</span>
						))}
					</div>
					<div className="bg-primary/5 rounded-md p-4 ">
						<Button
							variant={"flat"}
							className="h-full rounded-md p-4"
							onClick={(e) => handleEnterChange(e)}
						>
							<CornerDownLeft strokeWidth={1} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page

export const SvgStage = () => {
	return (
		<TransformWrapper
			initialScale={1}
			initialPositionX={0}
			initialPositionY={0}
			doubleClick={{ disabled: true }}
		>
			{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
				<div className="relative bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col">
					<div className="absolute bottom-4 right-4 z-10 flex gap-2 ">
						<Button
							size={"icon"}
							className=" supports-[backdrop-filter]:bg-background/40 backdrop-blur"
							variant={"flat"}
							type={"button"}
							onClick={() => zoomIn()}
						>
							<ZoomIn className="size-4" />
						</Button>
						<Button
							size={"icon"}
							className=" supports-[backdrop-filter]:bg-background/40 backdrop-blur"
							variant={"flat"}
							type={"button"}
							onClick={() => zoomOut()}
						>
							<ZoomOut className="size-4" />
						</Button>
						<Button
							size={"icon"}
							className=" supports-[backdrop-filter]:bg-background/40 backdrop-blur"
							variant={"flat"}
							type={"button"}
							onClick={() => resetTransform()}
						>
							<ScanEye className="size-4" />
						</Button>
					</div>
					<TransformComponent>
						{/* <div className=" w-full h-full top-0 bottom-0 right-0 left-0 flex flex-col"> */}
						<MySVG />
						{/* </div> */}
					</TransformComponent>
				</div>
			)}
		</TransformWrapper>
	)
}

export const TurtleSVG = () => (
	<svg width="40" height="40" className="" viewBox="0 0 40 40" fill="red">
		<title>MySVG</title>

		<Turtle />
	</svg>
)

export const MySVG = () => {
	const [expression, setExpression] = useAtom(LogoExpressionAtom)
	const inst = expression
	// console.log("🚀 ~ MySVG ~ inst:", inst)
	const originPos = "M0,0 "
	const t = `${originPos}L0,-${expression[expression.length - 1]?.node} `
	// // console.log("🚀 ~ MySVG ~ t:", t)
	const theta = 30
	const tt = expression
		.map((e) => e.node)
		.reduce(
			(acc, next) =>
				`${acc} l${next * Math.cos(theta)},${next * Math.sin(theta)} `,
		)
	// console.log("🚀 ~ MySVG ~ tt:", t)
	return (
		<svg
			// width="1000"
			// height="600"
			viewBox="0 0 650 1000"
			fill="none"
			className="bottom-0 left-0 right-0 top-0 flex h-[650px] w-[1000px] flex-col"
		>
			<title>MySVG</title>
			<rect
				width="10000"
				height="5000"
				// fill="red"
				transform="translate(-1000, 00) "
				className="fill-muted/20"
			/>
			<Grid />
			<Axes />

			{/* <SeaTurtle x={Number(inst[1])} y={0} theta={0} /> */}

			<g className="" transform={`translate(${250} , ${500}  )  rotate(${0} )`}>
				<path
					id="seaTurtle1"
					fill="none"
					stroke="lightgrey"
					strokeWidth={2}
					strokeLinecap="round"
					d={`M0,0 ${t}`}
					className="bg-primary-foreground"
				/>
			</g>
			<SeaTurtle x={0} y={0} theta={0}>
				<animateMotion
					dur="5s"
					repeatCount="indefinite"
					// path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
					path={`M0,0 ${t}`}
				/>
			</SeaTurtle>
			<g
				className="hidden"
				transform={`translate(${250} , ${500}  )  rotate(${0} )`}
			>
				<path
					fill="none"
					stroke="lightgrey"
					d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
					// transform-origin="60 60"
				/>

				<circle cx="0" cy="0" r="4" fill="lightgrey">
					<animateMotion
						dur="10s"
						repeatCount="indefinite"
						path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
					/>
				</circle>
				<circle cx="0" cy="0" r="4" fill="blue" />
				<circle cx="400" cy="-250" r="4" fill="green" />
			</g>
		</svg>
	)
}

export const Grid = () => (
	<g transform="translate(-650, 0) translate(-0.5, -0.5)">
		<title>grid</title>

		<pattern id="p" width="100" height="100" patternUnits="userSpaceOnUse">
			<g
				fill="none"
				stroke="#808"
				stroke-width="1"
				className="stroke-blue-500/20"
			>
				{/* <path id="a" d="M90 0H30L0 52l30 52h60l30-52z" />
				<path d="M120 52h60" />
				<use href="#a" x="180" /> */}
				<rect width="1000" height="600" fill="none" stroke-width="1" />
			</g>
		</pattern>
		<rect fill="url(#p)" width="10000" height="6000" />
	</g>
)
export const Axes = () => (
	<g transform="translate(250, 0) translate(-0.5, -0.5)">
		<title>axe</title>

		{/* <line
			// stroke="inherit"
			strokeWidth={10}
			className="stroke-red-600/30"
			x1="-1000"
			y1="500"
			x2="1000"
			y2="500"
		/> */}

		<path
			d="M0.5 1000V0.5"
			stroke="black"
			className="stroke-muted-foreground/30"
		/>
		<path
			d="M-1000 500 H1000"
			stroke="black"
			className="stroke-muted-foreground/30"
		/>
	</g>
)

const variants = {
	hidden: { opacity: 0, x: 0, y: 16 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -100 },
}
export const SeaTurtle = ({ x = 0, y = 0, theta = 0, children = <></> }) => (
	<g
		// className={cn(`translate-x-[${230}px] translate-y-[${480}px] `)}
		transform={`translate(${250 + x} , ${
			500 - y
		}  ) translate(-20, -20) rotate(${0 + theta} )`}
		transform-origin="20 20"
	>
		<title>SeaTurtle</title>
		{children}

		{/* <rect className="fill-green-500/50" width="40" height="40" fill="none" /> */}
		<g>
			<rect className="" width="40" height="40" fill="none" />

			<path
				d="M17.7337 1.43332C18.0975 0.565052 18.947 0 19.8884 0V0C20.8298 0 21.6793 0.565053 22.0431 1.43332L24.0437 6.20752C24.4957 7.28601 23.7035 8.47682 22.5342 8.47682H17.2426C16.0733 8.47682 15.2811 7.28601 15.7331 6.20752L17.7337 1.43332Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<path
				d="M19.1347 35.7173C19.4536 36.5958 20.6959 36.5958 21.0147 35.7173L22.0527 32.8577H18.0968L19.1347 35.7173Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<motion.path
				// variants={variants}
				initial="hidden"
				animate={{ y: [-4, 0, -4] }}
				transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
				d="M24.8959 15.6861C24.8959 15.6861 30.4759 6.70092 33.3695 8.70702C36.2631 10.7131 37.4939 15.2637 36.438 19.7246C35.3821 24.1854 34.3907 14.9975 32.1636 14.2183C29.9364 13.439 24.8959 15.6861 24.8959 15.6861Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<motion.path
				initial="hidden"
				animate={{ y: [0, -4, 0] }}
				transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
				d="M15.3392 15.6861C15.3392 15.6861 9.75923 6.70092 6.86562 8.70702C3.97202 10.7131 2.7412 15.2637 3.79712 19.7246C4.85304 24.1854 5.84442 14.9975 8.07156 14.2183C10.2987 13.439 15.3392 15.6861 15.3392 15.6861Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<motion.path
				initial="hidden"
				animate={{ y: [-2, 0, -2] }}
				transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
				d="M21.5575 30.405C21.5575 30.405 13.1281 24.0163 11.1456 26.9261C9.16312 29.8359 9.64485 34.5254 12.2293 38.3115C14.8137 42.0976 12.4465 33.1648 14.2465 31.6391C16.0465 30.1135 21.5575 30.405 21.5575 30.405Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<motion.path
				initial="hidden"
				animate={{ y: [0, -2, 0] }}
				transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
				d="M18.9142 30.405C18.9142 30.405 27.3436 24.0163 29.3261 26.9261C31.3086 29.8359 30.8268 34.5254 28.2424 38.3115C25.658 42.0976 28.0251 33.1648 26.2252 31.6391C24.4252 30.1135 18.9142 30.405 18.9142 30.405Z"
				fill="#D8D8D8"
				className="fill-muted-foreground"
			/>
			<mask id="myMask">
				<ellipse
					cx="20.1353"
					cy="20.8526"
					rx="10.0309"
					ry="12.8601"
					strokeWidth={2}
					fill="none"
					stroke="black"
				/>
			</mask>
			<ellipse
				cx="20.1353"
				cy="20.8526"
				rx="10.0309"
				ry="12.8601"
				fill="#D8D8D8"
				stroke="#073175"
				className="stroke-muted/50 fill-muted-foreground stroke-2"
				// mask="url(#myMask)"
			/>
		</g>
	</g>
)
export const SeaTurtle2 = () => (
	<g transform="translate(250, 350) translate(-20, -20)">
		<title>SeaTurtle</title>

		<path
			d="M16.9344 1.61853C17.4086 0.629374 18.4082 0 19.5051 0V0C20.6021 0 21.6017 0.629371 22.0759 1.61853L24.2136 6.07817C24.7646 7.22776 23.9267 8.55859 22.6519 8.55859H16.3584C15.0835 8.55859 14.2456 7.22776 14.7967 6.07818L16.9344 1.61853Z"
			fill="#D8D8D8"
		/>
		<path
			d="M18.7967 36.4522C19.1381 37.2743 20.3025 37.2743 20.6439 36.4522L22.0047 33.1747H17.4359L18.7967 36.4522Z"
			fill="#D8D8D8"
		/>
		<path
			d="M25.2884 15.8374C25.2884 15.8374 31.733 6.76551 35.0749 8.79096C38.4169 10.8164 39.8384 15.4109 38.6189 19.9148C37.3993 24.4186 36.2544 15.1421 33.6821 14.3554C31.1099 13.5686 25.2884 15.8374 25.2884 15.8374Z"
			fill="#D8D8D8"
		/>
		<path
			d="M14.251 15.8374C14.251 15.8374 7.80645 6.76551 4.46451 8.79096C1.12257 10.8164 -0.298949 15.4109 0.920578 19.9148C2.14011 24.4186 3.28508 15.1421 5.85729 14.3554C8.4295 13.5686 14.251 15.8374 14.251 15.8374Z"
			fill="#D8D8D8"
		/>
		<path
			d="M21.4328 30.6983C21.4328 30.6983 11.6974 24.2479 9.40776 27.1858C7.1181 30.1237 7.67448 34.8584 10.6593 38.6811C13.6441 42.5037 10.9103 33.4847 12.9891 31.9443C15.0679 30.404 21.4328 30.6983 21.4328 30.6983Z"
			fill="#D8D8D8"
		/>
		<path
			d="M18.38 30.6983C18.38 30.6983 28.1154 24.2479 30.4051 27.1858C32.6948 30.1237 32.1384 34.8584 29.1536 38.6811C26.1687 42.5037 28.9026 33.4847 26.8238 31.9443C24.7449 30.404 18.38 30.6983 18.38 30.6983Z"
			fill="#D8D8D8"
		/>
		<ellipse
			cx="19.7902"
			cy="21.0537"
			rx="11.5851"
			ry="12.9842"
			fill="#D8D8D8"
			stroke="#073175"
			className="stroke-muted/50"
		/>
	</g>
)
export const Turtle = () => (
	<g transform="translate(-20, -20)">
		<title>SeaTurtle</title>
		<rect width="40" height="40" fill="none" />
		<g opacity="0.79615">
			<rect x="16" y="1" width="8" height="11" rx="4" fill="#D8D8D8" />
			<rect
				x="29.5155"
				y="6.37314"
				width="4.1791"
				height="7.16418"
				rx="2.08955"
				transform="rotate(40 29.5155 6.37314)"
				fill="#D8D8D8"
			/>
			<rect
				width="4.1791"
				height="7.16418"
				rx="2.08955"
				transform="matrix(0.766044 -0.642788 -0.642788 -0.766044 29.5155 38.52)"
				fill="#D8D8D8"
			/>
			<rect
				width="4.1791"
				height="7.16418"
				rx="2.08955"
				transform="matrix(-0.766044 0.642788 0.642788 0.766044 10.2014 6.37314)"
				fill="#D8D8D8"
			/>
			<path
				d="M19.2205 37.9439C19.5724 38.7357 20.6962 38.7357 21.0481 37.9439L22.5223 34.6269H17.7462L19.2205 37.9439Z"
				fill="#D8D8D8"
			/>
			<rect
				x="10.2014"
				y="38.52"
				width="4.1791"
				height="7.16418"
				rx="2.08955"
				transform="rotate(-140 10.2014 38.52)"
				fill="#D8D8D8"
			/>
			<ellipse
				cx="20"
				cy="22.5"
				rx="11"
				ry="13.5"
				fill="#D8D8D8"
				stroke="white"
				className="stroke-muted/50"
			/>
		</g>
	</g>
)
