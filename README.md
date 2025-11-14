# RecipEasy - Cloudflare AI Project

**RecipEasy** is a friendly AI-powered student chef assistant that turns budget pantry items into quick, low effort dishes.  
Built entirely on **Cloudflare Workers AI**, it helps students discover healthy, affordable recipes using ingredients they already have. This helps students think less about what to eat and use all their brain power in the academic hustle.

## Features
- AI-generated recipes using **Llama 3.1** on Workers AI  
- Memory powered by **Durable Objects** (remembers last 3 ingredient sets)  
- Runs fully serverless on Cloudflare’s global edge network  
- Simple, minimal HTML UI for instant results
<img width="650" height="632" alt="image" src="https://github.com/user-attachments/assets/010deb9c-9a85-4901-bd85-945303b6b58c" />

<img width="628" height="653" alt="image" src="https://github.com/user-attachments/assets/5377c5c8-aa2d-4c56-a36a-b4ccc198095c" />

## Tech Stack
- Cloudflare Workers AI  
- Durable Objects (SQLite namespace)  
- HTML + JavaScript frontend  
- Wrangler CLI v4  

## Run Locally
```bash
git clone https://github.com/sayonika02/cf_ai_RecipEasy.git
cd cf_ai_RecipEasy
npm install
wrangler dev
wrangler deploy
