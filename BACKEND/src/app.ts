 
import express, { type Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbClient from './data/dbClient.js';
import route from './routes/feedback.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
 
const app = express();
const PORT = Number(process.env.PORT || 4321);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: false
};

app.use(cors(corsOptions));
 
app.use(express.json());
app.use("/feedback", route);


app.get('/health', (_, res: Response) => {
   res.json({
    status: 'ok',
    message: 'API is running'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  await dbClient.connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to connect to the database:', error);
  process.exitCode = 1;
});

process.on('SIGINT',async()=>{
  dbClient.closeConnection()
  process.exit(0)
})