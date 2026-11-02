/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                display: ["'Cormorant Garamond'", "Georgia", "serif"],
                sans: ["Manrope", "system-ui", "sans-serif"],
            },
            colors: {
                gold: { DEFAULT: "#C9A462", light: "#E2C68C", deep: "#9A7533" },
                ivory: "#FDFBF7",
                paper: "#F5F1E8",
                beige: "#E8E0CF",
                forest: { DEFAULT: "#141811", 2: "#1C2117", deep: "#0E110B" },
                mist: { DEFAULT: "#ECE7D9", dim: "rgba(236,231,217,0.68)" },
                olive: "#283022",
                moss: "#4A5838",
                ember: "#F2711A",
                ink: "#141811",
                brown: "#3A2A1A",
                water: "#8FB6C4",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
            },
            keyframes: {
                "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
                "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
            },
            transitionTimingFunction: { cine: "cubic-bezier(0.2, 0.75, 0.15, 1)", "cine-io": "cubic-bezier(0.7, 0, 0.2, 1)" },
            animation: {
                "accordion-down": "accordion-down 0.3s ease-out",
                "accordion-up": "accordion-up 0.3s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
