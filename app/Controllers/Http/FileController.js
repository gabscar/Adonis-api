'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)
    const path = `/uploads/${file.file}`
    return response.download(Helpers.tmpPath(path))
  }

  async store ({ request, response }) {
    try {
      if (!request.file('file')) {
        return
      }
      const upload = request.file('file', { size: '2mb' })
      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })
      if (!upload.moved()) {
        throw upload.error()
      }
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Falha ao realizar upload do arquivo' } })
    }
  }
}

module.exports = FileController
