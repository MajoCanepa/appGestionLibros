import { Router } from 'express'
import { ctrlAddAutor, ctrlGetAutores, ctrlGetAutor, ctrlUpdateAutor, ctrlDeleteAutor } from '../controllers/autor.controller.js'

const router = Router()

router.get('/autores', ctrlGetAutores)
router.get('/autor/:id', ctrlGetAutor)
router.post('/autor', ctrlAddAutor)
router.put('/autor/:id', ctrlUpdateAutor)
router.delete('/autor/:id/delete', ctrlDeleteAutor)

export default router;