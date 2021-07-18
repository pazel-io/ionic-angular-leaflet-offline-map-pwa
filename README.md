# Ionic, Angular, Leaflet PWA with offline map

This is an Ionic app that demonstrate how to build an offline map with Angular and Leaflet and make it an installable PWA.

There is a blog describing how to build this app step by step.

https://pazel.dev/ionic-angular-leaflet-pwa-offline-maps-part-1


## Run Locally

You need to have a Node LTS and Ionic CLI installed.

https://ionicframework.com/docs/intro/cli

https://nodejs.org/en/

Clone the project

```bash
  git clone https://github.com/pazel-io/ionic-angular-leaflet-offline-map-pwa.git
```

Go to the project directory

```bash
  cd ionic-angular-leaflet-offline-map-pwa
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  ionic serve
```

To build

```bash
  ionic build
``` 

To test PWA you can use npm `serve` package after having a successfull build.
https://www.npmjs.com/package/serve
```
serve build -p 8100
```

  
