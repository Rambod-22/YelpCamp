# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start application**: `npm start` - Runs the Express server on port 3000 (or PORT env var)
- **Install dependencies**: `npm install`
- **Seed database**: `node seeds/restaurantSeed.js` - Populates MongoDB with sample restaurants

## Architecture Overview

FlavorQuest is a full-stack restaurant discovery and rating platform built with Node.js/Express and MongoDB following MVC architecture:

### Core Structure
- **app.js** - Main application entry point with middleware configuration
- **models/** - Mongoose schemas (User, Restaurant, Review)
- **controllers/** - Route logic separated from route definitions
- **routes/** - Express routes (restaurants, reviews, users)
- **views/** - EJS templates with layout system using ejs-mate
- **middleware.js** - Custom authentication and validation middleware

### Key Features & Integrations
- **Authentication**: Passport.js with local strategy and passport-local-mongoose
- **Authorization**: Custom middleware for login checks and ownership validation
- **Image Upload**: Multer + Cloudinary integration for restaurant photos
- **Maps**: Mapbox SDK for geocoding and map display
- **Security**: Helmet, express-mongo-sanitize, custom HTML sanitization via Joi
- **Session Management**: Express-session with MongoDB store (connect-mongo)

### Data Validation
- **schemas.js** - Joi validation schemas with custom HTML sanitization extension
- Server-side validation middleware in middleware.js
- Client-side Bootstrap validation classes

### Database
- MongoDB with Mongoose ODM
- Database seeding available via seeds/restaurantSeed.js
- Uses environment variable DB_URL or defaults to local MongoDB

### Environment Setup
- Requires .env file with: DB_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET, MAPBOX_TOKEN, SECRET
- Session secret and external API keys required for full functionality

### Error Handling
- Custom ExpressError class in helpers/ExpressError.js
- Async error wrapper utility in helpers/catchAsync.js
- Global error handler in app.js