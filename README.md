Flappy bird copy
================

## Project setup

### Install dependencies
```
yarn
```

### Start the project
```
yarn start
```
And then navigate to *http://localhost:8080*

## Build for production
```
./bin/build-image.sh
```

### Test the built app
```
docker run -p 8080:8080 divinare/flappy
```
And then navigate to *http://localhost:8080*