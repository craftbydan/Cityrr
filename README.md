# Cityrr

City runs from public transit to breakfast. Routes from 5K to 20K.

## Local setup

Requires **Node.js 20+** and **npm**.

### 1. Clone into `~/dann/cityrr`

```bash
mkdir -p ~/dann
cd ~/dann
git clone https://github.com/craftbydan/Cityrr.git cityrr
cd cityrr
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

### 4. Open in your browser

[http://localhost:3000](http://localhost:3000)

You should see the coral **Cityrr** intro for ~2 seconds, then the logo moves to the top-left and the route list appears.

## Troubleshooting

**Port 3000 already in use**

```bash
npm run dev -- --port 3001
```

Then open [http://localhost:3001](http://localhost:3001).

**`command not found: npm`**

Install Node.js from [https://nodejs.org](https://nodejs.org) (LTS), then try again.

**Blank page or install errors**

```bash
rm -rf node_modules .next
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```
