import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import userRouter from './routes/UserRoutes.js';
import songRouter from './routes/SongRoutes.js';
import albumRouter from './routes/AlbumRoutes.js';
import reviewRouter from './routes/ReviewRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import favoriteSongRouter from './routes/FavoriteSongRoutes.js';
import favoriteAlbumRouter from './routes/FavoriteAlbumRoutes.js';
import favoriteArtistRouter from './routes/FavoriteArtistRoutes.js';

const PORT = 8081;
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
}));

app.use(express.json())
app.use(express.static('uploads'))
app.use(fileUpload())

app.use(session({
    secret: 'root',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));

app.use('/api', userRouter)
app.use('/api', songRouter)
app.use('/api', albumRouter)
app.use('/api', reviewRouter)
app.use('/api', authRouter)
app.use('/api', favoriteSongRouter)
app.use('/api', favoriteAlbumRouter)
app.use('/api', favoriteArtistRouter)

async function startApp () {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    }
    catch (error) {
        console.log(error);
    }
}

startApp()
