import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request:Request,response:Response):Promise<Response>{
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date)

  const createAppointment = container.resolve(CreateAppointmentService) 

  const appointment = await createAppointment.execute({ provider_id, date: parsedDate })

  return response.json(appointment)


  }
}