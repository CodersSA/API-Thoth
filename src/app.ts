import express from "express";
import morgan from "morgan";
import cors from "cors";

import passport from "passport";
import passportMiddleware from "./config/passport"

import authRoutes from './jbg/routes/auth.routes';
import specialRoutes from './jbg/routes/special.routes';

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.get("/", (req, res) => res.send(`API is running at http://localhost:${app.get('port')}`));

// Apps

// JBG (JOB BANK GROUP)
app.use("/api/jbg/auth", authRoutes);
app.use("/api/jbg/protected", specialRoutes);

export default app;