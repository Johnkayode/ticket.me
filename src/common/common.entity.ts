import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class BaseProps {
    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamptz',
    })
    createdAt: Date;

    @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamptz',
    })
    updatedAt: Date;
}