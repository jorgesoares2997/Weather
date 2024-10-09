import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',  // Páginas do Next.js
    './src/components/**/*.{js,ts,jsx,tsx}',  // Componentes personalizados
    './src/app/**/*.{js,ts,jsx,tsx}',  // Diretório app (se estiver usando a nova estrutura do Next.js)
  ],
  theme: {
    extend: {
      // Você pode personalizar o tema aqui, por exemplo, adicionando novas cores, fontes etc.
      colors: {
        nearxPurple: '#6B21A8',
      },
    },
  },
  plugins: [],
}

export default config