/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Enums = "enums",
	Events = "events",
	Programs = "programs",
	Prospects = "prospects",
	ShortcutLinks = "shortcutLinks",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	fullName?: string
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum EnumsCategoryOptions {
	"industry" = "industry",
	"document" = "document",
	"prospect" = "prospect",
	"user" = "user",
	"event" = "event",
	"program" = "program",
}
export type EnumsRecord<Traw = unknown, TupdateHistory = unknown> = {
	category?: EnumsCategoryOptions
	created?: IsoDateString
	creator?: RecordIdString
	id: string
	name?: string
	path: string
	raw?: null | Traw
	updateHistory?: null | TupdateHistory
	updated?: IsoDateString
	updator?: RecordIdString
}

export type EventsRecord<TupdateHistory = unknown> = {
	created?: IsoDateString
	creator?: RecordIdString
	desc?: HTMLString
	end?: IsoDateString
	id: string
	name?: string
	path: string
	start?: IsoDateString
	updateHistory?: null | TupdateHistory
	updated?: IsoDateString
	updator?: RecordIdString
}

export type ProgramsRecord<Tmetadata = unknown> = {
	created?: IsoDateString
	creator?: RecordIdString
	id: string
	industries?: RecordIdString[]
	metadata?: null | Tmetadata
	name: string
	optional?: RecordIdString[]
	path: string
	required?: RecordIdString[]
	tags?: string
	updated?: IsoDateString
	updator?: RecordIdString
}

export type ProspectsRecord<TupdateHistory = unknown> = {
	avatar?: string
	birthdate?: IsoDateString
	created?: IsoDateString
	creator?: RecordIdString
	documents?: string[]
	email: string
	emailVisibility?: boolean
	fullName: string
	id: string
	locationCity?: string
	locationCountry?: string
	locationStateProvince?: string
	locationStreetLine?: string
	mobileNumber: string
	nationality: string
	password: string
	path: string
	phoneNumber?: string
	points?: number
	tokenKey: string
	updateHistory?: null | TupdateHistory
	updated?: IsoDateString
	updator?: RecordIdString
	verified?: boolean
}

export type ShortcutLinksRecord<Tmetadata = unknown, TupdateHistory = unknown> = {
	active?: string
	created?: IsoDateString
	creator?: RecordIdString
	destinationUrl?: string
	id: string
	metadata?: null | Tmetadata
	name?: string
	path: string
	tags?: string
	updateHistory?: null | TupdateHistory
	updated?: IsoDateString
	updator?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	path: string
	tokenKey: string
	type: RecordIdString
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type EnumsResponse<Traw = unknown, TupdateHistory = unknown, Texpand = unknown> = Required<EnumsRecord<Traw, TupdateHistory>> & BaseSystemFields<Texpand>
export type EventsResponse<TupdateHistory = unknown, Texpand = unknown> = Required<EventsRecord<TupdateHistory>> & BaseSystemFields<Texpand>
export type ProgramsResponse<Tmetadata = unknown, Texpand = unknown> = Required<ProgramsRecord<Tmetadata>> & BaseSystemFields<Texpand>
export type ProspectsResponse<TupdateHistory = unknown, Texpand = unknown> = Required<ProspectsRecord<TupdateHistory>> & AuthSystemFields<Texpand>
export type ShortcutLinksResponse<Tmetadata = unknown, TupdateHistory = unknown, Texpand = unknown> = Required<ShortcutLinksRecord<Tmetadata, TupdateHistory>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	enums: EnumsRecord
	events: EventsRecord
	programs: ProgramsRecord
	prospects: ProspectsRecord
	shortcutLinks: ShortcutLinksRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	enums: EnumsResponse
	events: EventsResponse
	programs: ProgramsResponse
	prospects: ProspectsResponse
	shortcutLinks: ShortcutLinksResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'enums'): RecordService<EnumsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'programs'): RecordService<ProgramsResponse>
	collection(idOrName: 'prospects'): RecordService<ProspectsResponse>
	collection(idOrName: 'shortcutLinks'): RecordService<ShortcutLinksResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
