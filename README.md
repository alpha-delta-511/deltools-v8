# deltools-v8

Simple tools for delevopers, system administrators and other.

## Self-hosting

Installing:

```
git clone https://github.com/alpha-delta-511/deltools-v8
cd deltools-v8
npm install
```

### Running variants

##### 1. Run in development mode (simpler):

You can run the app with vite's built-in server:

```
npm run dev
```

##### 2. Build for production (recommended):

Or you can build the app for production and run it with other HTTP-server.

```
npm run build
```

Run with python server:

```
cd dist
python -m http.server 8080
```

Then, open `http://localhost:8080` in your browser.

(you can also use [simple-http-server](https://github.com/TheWaWaR/simple-http-server) for this method).
