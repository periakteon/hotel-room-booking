import { getModelForClass, prop, index } from "@typegoose/typegoose";

export enum RoomType {
  BASIC = "basic",
  PREMIUM = "premium",
  SUITE = "suite",
}

@index({ roomNumber: 1 })
export class Room {
  @prop({ required: true })
  name: string;

  @prop({ enum: RoomType, required: true })
  type: RoomType;

  @prop({ required: true })
  price: number;

  @prop({ type: () => [String], default: [] })
  availableDates: string[];

  @prop({ required: true })
  roomNumber: number;

  @prop({
    get: function (this: Room) {
      return this.availableDates.length > 0;
    },
  })
  isAvailable: boolean;
}

const RoomModel = getModelForClass(Room, {
  schemaOptions: {
    timestamps: true,
  },
});

export default RoomModel;
