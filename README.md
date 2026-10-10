# deltools-v8

Simple tools for delevopers, system administrators and other.

## Self-hosting

Installing:

```
git clone https://github.com/alpha-delta-511/deltools-v8
cd deltools-v8
npm install
```

### Variant 1. Run in development mode (simpler):

You can run the app with vite's built-in server.

1. Start development server:

```
npm run dev
```

2. Open `http://localhost:5173` in your browser.

### Variant 2. Build for production (more recommended):

Or you can build the app for production and run it with other HTTP-server.

1. Build the app:

```
npm run build
```

2. Run with python server:

```
cd dist
python -m http.server 8080
```

3. Open `http://localhost:8080` in your browser.

(you can also use [simple-http-server](https://github.com/TheWaWaR/simple-http-server) for this method).
