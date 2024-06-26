"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DarkLightMode() {
	const { theme, setTheme } = useTheme()
	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark"
		setTheme(nextTheme)
	}

	return (
		<Toggle
			size="sm"
			className=""
			pressed={false}
			defaultPressed
			variant="outline"
			aria-label="Toggle italic"
			onClick={() => toggleTheme()}
		>
			{/* <Button variant="outline" size="icon" > */}
			<Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
			{/* </Button> */}
		</Toggle>
		// <DropdownMenu>
		//   <DropdownMenuTrigger asChild>
		//     <Button variant="outline" size="icon">
		//       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		//       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		//       <span className="sr-only">Toggle theme</span>
		//     </Button>
		//   </DropdownMenuTrigger>
		//   <DropdownMenuContent align="end">
		//     <DropdownMenuItem onClick={() => setTheme("light")}>
		//       Light
		//     </DropdownMenuItem>
		//     <DropdownMenuItem onClick={() => setTheme("dark")}>
		//       Dark
		//     </DropdownMenuItem>
		//     <DropdownMenuItem onClick={() => setTheme("system")}>
		//       System
		//     </DropdownMenuItem>
		//   </DropdownMenuContent>
		// </DropdownMenu>
	)
}
