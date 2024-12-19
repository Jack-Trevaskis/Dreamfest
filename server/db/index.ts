import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type { Event, EventWithLocation, EventData } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  try {
    const locations = await connection('locations').select('*');
    return locations as Location[];
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; 
  }
}

export async function getLocationById(id: number) {

  const location: Location = await connection('locations')
      .where('locations.id', id)
      .select( 
        'locations.id',
        'locations.name',
        'locations.description')
      .first()

    return location
}

export async function getEventsByDay (day: string) {

  try {
    const event = await connection('events')
      .join('locations', 'events.location_id', 'locations.id' )
      .where('events.day', day)
      .select(    
        'events.id',
        'events.day',
        'events.name',
        'events.time',
        'events.name as eventName',
        'locations.name as locationName')

        return event as EventWithLocation[]

  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error; 
  }
}

export async function updateLocation(id:number, name:string, description:string) {

  const updatedLocation: Location[] = await connection('locations')
    .where({id})
    .update({name, description})
    .returning(['id', 'name', 'description'])

  console.log(updatedLocation[0])

  return updatedLocation[0]
  
} 

export async function addNewEvent(name:string, description:string, day:string, time:string, location_id:number) {

  const newEvent = await connection('events')
  .insert({name,description,day,time,location_id})
  .returning(['id', 'name', 'description', 'day', 'time', 'location_id'])

  return newEvent

}

export async function deleteEvent (id: number) {

  return await connection('events').where({id}).del()
}

