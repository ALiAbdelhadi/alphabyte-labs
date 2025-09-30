import kleur from "kleur"

export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(kleur.blue("ℹ"), message, ...args)
  },
  
  success: (message: string, ...args: any[]) => {
    console.log(kleur.green("✓"), message, ...args)
  },
  
  warn: (message: string, ...args: any[]) => {
    console.log(kleur.yellow("⚠"), message, ...args)
  },
  
  error: (message: string, ...args: any[]) => {
    console.log(kleur.red("✗"), message, ...args)
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.DEBUG) {
      console.log(kleur.gray("🐛"), message, ...args)
    }
  },
}
