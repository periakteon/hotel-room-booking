import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;

  @prop()
  refreshToken?: string;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: {
    timestamps: true,
  },
});

export default SessionModel;
