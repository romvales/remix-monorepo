

declare namespace ResortoTypes {

  type User = import('./core.db/schema').User
  type Resort = import('@prisma/client').Resort
  type Room = import('@prisma/client').Room
  type Guest = import('@prisma/client').Guest
  type Worker = import('@prisma/client').Worker
  type Reservation = import('@prisma/client').Reservation
  type Task = import('@prisma/client').Task
  type Payment = import('@prisma/client').Payment
  type Device = import('@prisma/client').Device
  type Sync = import('@prisma/client').Sync

  type ResortClient = import('./core.db/schema').Resort
  type RoomClient = import('./core.db/schema').Room
  type GuestClient = import('./core.db/schema').Guest
  type WorkerClient = import('./core.db/schema').Worker
  type ReservationClient = import('./core.db/schema').Reservation
  type TaskClient = import('./core.db/schema').Task
  type PaymentClient = import('./core.db/schema').Payment
  type DeviceClient = import('./core.db/schema').Device
  type SyncClient = import('./core.db/schema').Sync

}
