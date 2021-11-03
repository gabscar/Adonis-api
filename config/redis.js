/**
 * Config source: https://git.io/JemcF
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */
'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('REDIS_CONNECTION', 'local'),
  local: {
    host: '127.0.0.1',
    port: 6379,
    password: null,
    db: 0,
    keyPrefix: ''
  },
  cluster: {
    clusters: [{
      host: '127.0.0.1',
      port: 6379,
      password: null,
      db: 0
    },
    {
      host: '127.0.0.1',
      port: 6379,
      password: null,
      db: 0
    }
    ]
  }

}


