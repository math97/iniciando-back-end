import { EntityRepository, getRepository, Repository } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';


class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
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
  public async findById(id: string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
  public async findByEmail(email: string):Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where:{email}
    });

    return user;

  }
  public async create(userData:ICreateUserDTO):Promise<User>{
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User):Promise<User>{
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
