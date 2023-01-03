# arduino-dashboard

## Installation 

### Windows

Make sure you have Windows VS2017 pack installed. 
If have problems, try installing latest nodejs version, cocholatly tools and set VS2017 in environment

### Linux

Make sure you have `build-essential` tools installed

```sh
sudo apt install build-essential
```

Install `libudev`

```sh
sudo apt-get install libudev-dev
```

### Install dependencies and fresh rebuild



```sh
yarn
yarn electron-rebuild
```

## Start in dev mode

```sh
yarn dev
```

## Build 

- Make sure you have Windows VS2017 pack installed. 

If have problems, try installing latest nodejs version, cocholatly tools and set VS2017 in environment

```sh
yarn build
```