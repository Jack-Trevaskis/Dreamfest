// @vitest-environment jsdom
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'

import { connection } from '../db/index.ts'
import server from '../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})  

describe('Deleting an Event', () => {
  it('can be deleted', async () => {
    // TODO: write server integration test for event delete

    const event = await request(server).get('/api/v1/events/1')
    expect(event.status).toBe(200)

    const deletedEvent = await request(server).delete('/api/v1/events/1')
    expect(deletedEvent.status).toBe(204)

    const deletedEvent1 = await request(server).delete('/api/v1/events/1')
    expect(deletedEvent1.status).toBe(404)

  })
})
