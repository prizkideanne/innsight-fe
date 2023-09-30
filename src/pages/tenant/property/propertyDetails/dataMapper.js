export const mapRoomData = (room) => ({
  id: room.id,
  name: room.name,
  roomImage: room.room_img,
  description: room.description,
  basePrice: room.base_price,
});

export const mapRoomAvailabilityData = (room) => ({
  id: room.id,
  name: room.name,
  roomStatuses: room.Room_statuses.map(mapRoomStatusData),
});

export const mapRoomSpecialPriceData = (room) => ({
  id: room.id,
  name: room.name,
  specialPrices: room.Special_prices.map(mapRoomSpecialPrice),
});

export const mapRoomStatusData = (roomStatus) => ({
  id: roomStatus.id,
  roomId: roomStatus.room_id,
  reason: roomStatus.custom_status,
  start_date: roomStatus.start_date,
  end_date: roomStatus.end_date,
  isActive: roomStatus.is_active,
});

export const mapRoomSpecialPrice = (specialPrice) => ({
  id: specialPrice.id,
  roomId: specialPrice.room_id,
  price: specialPrice.price,
  start_date: specialPrice.start_date,
  end_date: specialPrice.end_date,
  isActive: specialPrice.is_active,
});
