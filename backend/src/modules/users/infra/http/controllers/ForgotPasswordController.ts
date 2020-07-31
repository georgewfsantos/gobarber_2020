import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sendFortgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendFortgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
