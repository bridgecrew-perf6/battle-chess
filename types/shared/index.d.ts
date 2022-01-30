export type Side = 'w' | 'b';

export type RoomDetails = {
  w?: string;
  b?: string;
  turn: Side;
  fen?: string;
};

export type Game = {
  id: string;
  w?: string;
  b?: string;
  turn: Side;
  fen?: string;
};

export type User = {
  id: string;
  name?: string;
};