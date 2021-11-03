'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    const Tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()
    return Tasks
  }

  async store ({ request, params }) {
    const data = request.only(['title', 'description', 'user_id', 'due_date', 'file_id'])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params }) {
    const task = await Task.findOrFail(params.id)
    return task
  }

  async update ({ params, request }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['title', 'description', 'file_id', 'due_date'])
    task.merge(data)
    await task.save()
    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
