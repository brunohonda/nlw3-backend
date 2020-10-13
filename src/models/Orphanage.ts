import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Images';

@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column({ name: 'opening_hours' })
    openingHours: string;

    @Column({ name: 'open_on_weekends' })
    isOpenOnWeekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: [ 'insert', 'update' ]
    })
    @JoinColumn({ name: 'orphanage_id'})
    images: Image[];
}