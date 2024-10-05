import { getModelForClass, prop, index } from "@typegoose/typegoose";

@index({ userId: 1, roomId: 1 })
export class Booking {
  @prop({ required: true })
  userId: string;

  @prop({ required: true })
  roomId: string;

  @prop({ required: true })
  date: string;

  @prop({ required: true })
  totalPrice: number;
}

const BookingModel = getModelForClass(Booking, {
  schemaOptions: {
    timestamps: true,
  },
});

export default BookingModel;
