import { EntityRepository, getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository{
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }
  /*   private appointments: Appointment[];
  
    constructor() {
      this.appointments = []
    }
  
    public all(): Appointment[] {
      return this.appointments;
    }
    


  public create({ date, provider }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
  ------    typeorm tira a necessidade do constructor nesse caso e do metodo all pois 
    o typeorm ja tem o metodo pronto.Para criacao tbm
  */

  public async findByDate(date: Date): Promise<Appointment | undefined> {

    /*    const findAppointment = this.appointments.find(appointment =>
         isEqual(date, appointment.date)); */
    const findAppointment = await this.ormRepository.findOne({ where: { date } })

    return findAppointment;
  }

  public async create({provider_id,date}:ICreateAppointmentDTO):Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id,date});

    await this.ormRepository.save(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;
