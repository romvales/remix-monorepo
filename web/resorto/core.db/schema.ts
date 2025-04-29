import { createNanoid } from '@shared/utils/db'
import {
  decimal, integer,
  json,
  pgSchema,
  text, timestamp
} from 'drizzle-orm/pg-core'

import dayjs from '@components/lib/time'
import { boolean } from 'drizzle-orm/pg-core'

export type User = import('@prisma/client').User
export type Resort = typeof resorts.$inferSelect
export type Room = typeof rooms.$inferSelect
export type Guest = typeof guests.$inferSelect
export type Worker = typeof workers.$inferSelect
export type Reservation = typeof reservations.$inferSelect
export type Task = typeof tasks.$inferSelect
export type Payment = typeof payments.$inferSelect
export type Device = typeof devices.$inferSelect
export type Sync = typeof syncs.$inferSelect

export const schema = pgSchema('resorto')

export const users = schema.table('users', {
  id: integer('id'),
  uid: text('uid').primaryKey().unique(),
  created: timestamp('created', { withTimezone: true }),
  updated: timestamp('updated', { withTimezone: true }),
  deleted: timestamp('deleted', { withTimezone: true }),
  lastLogin: timestamp('lastLogin'),
  address: json('address'),

  country: text('country'),
  email: text('email').unique(),
  phone: text('phone').unique(),
  username: text('username').unique(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  birthday: timestamp('birthday', { withTimezone: false }),
  sex: text('sex', { enum: [ 'MALE', 'FEMALE' ] }),

  googleId: text('googleId'),
  googleRefreshToken: text('googleRefreshToken'),
})

export const resorts = schema.table('resorts', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  ownerId: integer('ownerId'),
  email: text('email').unique(),
  phone: text('phone').notNull(),
  address: json('address').notNull().$default(() => {}),
})

export const rooms = schema.table('rooms', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  resortId: integer('resortId').notNull(),
  roomNo: text('roomNo').notNull(),
  roomType: text('roomType').notNull(),
  roomStatus: text('roomStatus').notNull(),
  maxOccupancy: integer('maxOccupancy'),
})

export const guests = schema.table('guests', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').unique(),
  phone: text('phone').notNull(),
})

export const workers = schema.table('workers', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  ownerId: integer('ownerId').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  passcode: text('passcode'),
})

export const reservations = schema.table('reservations', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  roomId: integer('roomId'),
  guestId: integer('guestId'),
  paymentId: integer('paymentId'),
  checkIn: timestamp('checkIn'),
  checkOut: timestamp('checkOut'),
})

export const tasks = schema.table('tasks', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  done: timestamp('done'),
  roomId: integer('roomId'),
  status: text('status'),
})

export const payments = schema.table('payments', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  amount: decimal('amount'),
  status: text('status'),
  receipt: json('receipt'),
})

export const devices = schema.table('devices', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }).$default(() => dayjs().utc(true).toDate()),
  updated: timestamp('updated', { withTimezone: true }).$onUpdate(() => dayjs().utc(true).toDate()),
  deleted: timestamp('deleted', { withTimezone: true }),
  ownerId: integer('ownerId'),
  workerId: integer('workerId'),
  data: json('data').$default(() => ({})),
  trusted: boolean('trusted').$default(() => false),
  type: text('type', { enum: [ 'WEB', 'CLI' ] }),
})

export const syncs = schema.table('syncs', {
  id: integer('id'),
  uid: text('uid').primaryKey().$default(() => createNanoid()),
  created: timestamp('created', { withTimezone: true }),
  deviceId: integer('deviceId'),
  changes: json('changes').$default(() => ({})),
  hash: text('hash').unique().notNull(),
  sync: boolean('sync').$default(() => false),
  applied: boolean('applied').$default(() => false),
})
