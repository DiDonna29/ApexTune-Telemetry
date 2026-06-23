export interface Setup {
  id: string;
  name: string;
  car: string;
  track: string;
  tires: {
    fl: number;
    fr: number;
    rl: number;
    rr: number;
  };
  aero: {
    frontWing: number;
    rearWing: number;
  };
  suspension: {
    stiffness: number;
    rideHeight: number;
    camber: number;
    toe: number;
  };
  updatedAt: number;
}