 
import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import { feedbacks, type Feedback } from './data/feedback.js';
 const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/healt', (_, res: Response) => {
   res.json({
    status: 'ok',
    message: 'API is running'
  });
});

//GET FEEDBACKS
app.get('/feedback' ,(_, res: Response)=>{
  res.status(200).json(feedbacks)
})

// ADD FEEDBACK
app.post('/feedback',(_, res)=>{

  const body: Feedback= {
     id: '0',
    title: 'new fedback',
    description: 'Lorem ipsum',
    votes: 0,
    createdAt: String( Date.now()),
  }

  //add feedback to the db
  feedbacks.push(body)
  res.status(201).json("feedback agregado: "+body)
})

//UPDATE FEEDBACK
app.put('/feedback/:id',(req, res)=>{
   const id = req.params.id
   
  const newTitle = "New Title"

    feedbacks.map((feedback)=>{
    if (feedback.id === id){
      [feedback.title = newTitle,
      ...feedbacks]
    }
  })

  res.json("feedback updated! "  )
})

//DELETE FEEDBACK
app.delete('/feedback/:id', (req,res)=>{

   const id = req.params.id
   
   const index = feedbacks.findIndex(user => user.id === id);

  if (index === -1) return null;

   feedbacks.splice(index, 1);
   

  res.status(204).end(); 
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
