import {Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';


export class CommonProperty extends BaseEntity{
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updatedAt: Date;

    @Column({ nullable: false })
    public createdBy: string;

    @Column({ nullable: false })
    public updatedBy: string;
}
