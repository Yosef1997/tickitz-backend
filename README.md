tickitz-backend

This is non-optimized minimal backend app with mysql and node. Backend app theme is "tickitz"
Requirements

    NodeJS v12 LTS
    XAMPP

How To Run This App

    Make sure you had clone this repo
    Copy environment from .env.example to .env
    Configure your .env file according to your Mysql credentials
    Open your terminal in this project and run

    npm i

    npm i dotenv

    And then

    npx nodemon

    Open XAMPP

    Start Apache

    And then

    Start Mysql

API SPECS

    USER

    GET /movies Route for get list of movies
    GET /movies/:id Route for get detail of a movie
    GET /genre/:name Route for get list of movies filter by genre
    GET /cinemas Route for get list of cinemas
    GET /cinemas/:id Route for get detail of a cinema
    GET /showtime Route for get list of cinemas
    GET /location Route for get detail of a cinema

    ADMIN

    GET/POST /admin/movies Route for get list of movies or create new movie data
    GET/POST /admin/genre Route for get list of genres or create new genre data
    GET/POST /admin/cinemas Route for get list of cinemas or create new cinema data
    GET/POST /admin/showtime Route for get list of cinemas or create new showtime data
    GET/POST /admin/location Route for get list of cinemas or create new location data

    PATCH/DELETE /admin/movies/:id Route for modify or delete movie data
    PATCH/DELETE /admin/genre/:id Route for modify or delete genre data
    PATCH/DELETE /admin/cinemas/:id Route for modify or delete cinema data
    PATCH/DELETE /admin/showtime/:id Route for modify or delete showtime data
    PATCH/DELETE /admin/location/:id Route for modify or delete location data
