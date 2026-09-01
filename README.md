# Beamify - perfect day generator 

A kawaii retro-styled web app that generates personalized 24-hour day plans using AI.
productivity app and integrated AI(not ur usual GPT wrapper)


## Tech Stack 
Frontend : Reactjs , tailwindCSS
Backend: Nodejs, expressjs , Openrouter API

## Project Structure

```
perfect-day-generator/
├── client/               
│   ├── src/
│   │   ├── components/ 
│   │   ├── hooks/        
│   │   ├── types.ts  
│   │   ├── index.css   
│   │   └── main.tsx  
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── server/                 
    ├── src/
    │   ├── index.ts      
    │   ├── types.ts       
    │   ├── routes/       
    │   ├── services/      
    │   └── prompts/       # LLM system prompts
    ├── package.json
    ├── tsconfig.json
    └── .env.example
```

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenRouter API key (get one at https://openrouter.ai)



1. In a new terminal, navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


## Features

- Kawai style
- AI integration (Openrouter api)
- responsive for both phones and desktop
- deployed on vercel
- A music player with royalty free music
- has cool music player from the internet
- moveable windows



# AI usage
used in debugging 
