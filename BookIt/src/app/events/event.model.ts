export class Event {
  constructor(
    public name: string,
    public category:string,
    public description: string,
    public imagePath: string,
    public date: string,
    public location: string,
    public openBooking:boolean
  ) {}
}
