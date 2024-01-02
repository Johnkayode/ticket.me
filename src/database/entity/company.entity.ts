// import { 
//     Entity, 
//     PrimaryGeneratedColumn, 
//     Column,
//     ManyToOne,
//     OneToMany,
//     OneToOne
// } from "typeorm"
// import { BaseProps } from "../../common/common.entity"
// import { User } from "./user.entity";


// @Entity()
// export class Company extends BaseProps {
//     @PrimaryGeneratedColumn('uuid')
//     id: number

//     @Column({ 
//         type: "varchar", 
//         nullable: false,
//         length: 255
//     })
//     name: string;

//     @Column({ unique: true, nullable: true })
//     email?: string;

//     @OneToOne()
//     createdBy: User;

//     @OneToMany(() => User, (user) => user.companies)
//     staff: User[];
// }
  