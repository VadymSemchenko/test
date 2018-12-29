# Acreto Dashboard


## Terminal Commands

1. Required NodeJS version >10.11 (use n.js version manager)
2. Go to your file project
3. Run in terminal: ```npm install```
4. Then: ```npm start```
5. Navigate to `http://localhost:3000/`

## Production

1. Build code, styles and assets with ```npm run build```
2. Copy `build` directory into destination server
3. Point Nginx/Apache/web server on that directory to serve that files (or use S3)

## Variables

Environmental variables can be defined in `.env` files. In root path there should be at least
three `.env` files:
* .env 
* .env.development
* .env.production
Variables should be named with prefix `REACT_APP_`
