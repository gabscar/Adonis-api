'use strict'
const User = use('App/Models/User')
const crypto = require('crypto')
const Mail = use('Mail')
const moment = require('moment')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('gabriel@mail.com.br', 'Gabriel | Dev')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'email inexistente' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)

      const token_expired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (token_expired) {
        return response
          .status(401)
          .send({ error: { message: 'O token expirou' } })
      }
      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'algo deu errado na troca da senha' } })
    }
  }
}

module.exports = ForgotPasswordController
