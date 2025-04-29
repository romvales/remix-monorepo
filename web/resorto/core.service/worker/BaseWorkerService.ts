
export class BaseWorkerService {

  constructor(private db: ResortoDrizzleDatabase) {

  }

  get $drizzle() {
    return this.db
  }

}