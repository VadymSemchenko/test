# Acreto Dashboard


## Terminal Commands

1. Required NodeJS version >10.11 (use n.js version manager)
2. Go to your file project
3. Run in terminal: ```npm install```
4. Then: ```npm start```
5. Navigate to `http://localhost:3000/`

## Jenkins
1. Instead of running ```npm install``` use ```npm set progress=false && npm ci```. 
It should decrease build time

## Production
1. Build code, styles and assets with ```npm run build:production```
2. Copy `build` directory to S3

## Staging
1. Build code, styles and assets with ```npm run build:staging```
2. Copy `build` directory to S3

## Development
1. Build code, styles and assets with ```npm run build:latest```
2. Copy `build` directory to S3

## Variables

Environmental variables can be defined in `.env` files. In root path there should be at least
four `.env` files:
* .env 
* .env.development -> local development environment
* .env.latest      -> development environment
* .env.staging     -> staging environment
* .env.production  -> production environment
Variables should be named with prefix `REACT_APP_`
