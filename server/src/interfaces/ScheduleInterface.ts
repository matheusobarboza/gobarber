export interface ICreate {
  name: string;
  phone: string;
  date: Date;
  user_id: string
}

export interface IUpdate {
  id: string
  date: Date
  user_id: string
}