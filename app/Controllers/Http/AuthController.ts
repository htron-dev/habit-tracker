import { schema, rules } from '@ioc:Adonis/Core/Validator'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserStoreValidator from 'App/Validators/UserStoreValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request }: HttpContextContract) {
    const user = await request.validate(UserStoreValidator)

    const { id } = await User.create(user)

    return {
      id,
      message: 'Successfully created user',
    }
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      }),
    })

    return await auth.attempt(email, password)
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()

    return {
      message: 'Successfully logged out',
    }
  }

  public async whoIAm({ auth }: HttpContextContract) {
    return auth.user
  }
}
