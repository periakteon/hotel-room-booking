import RoomModel, { Room } from "../models/room.model";

export function createRoom(input: Room) {
  return RoomModel.create(input);
}

export function findRoomById(id: string) {
  return RoomModel.findById(id);
}

export function findRoomByRoomNumber(roomNumber: number) {
  return RoomModel.findOne({
    roomNumber,
  });
}
