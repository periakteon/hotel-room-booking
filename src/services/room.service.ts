import RoomModel, { Room } from "../models/room.model";

export function createRoom(input: Room) {
  return RoomModel.create(input);
}

export function findRoomById(id: string) {
  return RoomModel.findById(id);
}

export function findRoomsByGivenDate(date: string) {
  return RoomModel.find({
    availableDates: date,
  });
}

export function findRoomByRoomNumber(roomNumber: number) {
  return RoomModel.findOne({
    roomNumber,
  });
}

export function editRoomById(id: string, update: Partial<Room>) {
  return RoomModel.findByIdAndUpdate(id, update, { new: true });
}
