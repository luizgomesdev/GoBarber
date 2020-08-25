import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class AppointmentModel {
    @PrimaryGeneratedColumn('uuid')
    uuid: String;

    @Column()
    provider: String;

    @Column('timestamp with time zone')
    date: Date;
}

export default AppointmentModel;
