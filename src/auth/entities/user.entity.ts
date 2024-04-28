import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    _id?:string;

    @Prop({unique:true, reuired:true})
    email: string;

    @Prop({reuired:true})
    name: string;

    @Prop({minlength:6, reuired:true})
    password?: string;

    @Prop({default:true})
    isActive: boolean;

    @Prop({type: [String], default:'user'})
    roles: string[];
}



export const UserSchema = SchemaFactory.createForClass(User);
