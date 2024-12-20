import express from 'express'

import * as db from '../db/index.ts'
import { getAllLocations } from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    // TODO: Replace this with all of the locations in the database
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    // TODO: Get the location based on its id and replace this viewData
    const location = await db.getLocationById(+id)
      
    res.json(location)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {

    const id = Number(req.params.id)
   
    const { name, description } = req.body
    const updatedLocation =  await db.updateLocation(id, name, description)
    res.sendStatus(204)

    if (!updatedLocation) {
      res.status(404).json({message: 'location not found'})
    } else {
      res.status(204).json({message: 'location updated'})
    }
  } catch (e) {
    next(e)
  }
})

export default router
