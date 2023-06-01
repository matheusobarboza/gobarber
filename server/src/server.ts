import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import user from './routes/userRoutes'

const app:Application = express()

//Application config
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(user)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({
      err: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => console.log('Server is running'))