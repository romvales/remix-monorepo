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
	Applications = "applications",
	Conversations = "conversations",
	Industries = "industries",
	JobReactions = "jobReactions",
	Jobs = "jobs",
	Payments = "payments",
	Profiles = "profiles",
	Subscriptions = "subscriptions",
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
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum ApplicationsStatusOptions {
	"inqueue" = "inqueue",
	"view" = "view",
	"reject" = "reject",
	"interview" = "interview",
	"hired" = "hired",
}
export type ApplicationsRecord = {
	candidate?: RecordIdString
	created?: IsoDateString
	employer?: RecordIdString
	hiredAt?: IsoDateString
	id: string
	interviewAt?: IsoDateString
	job?: RecordIdString
	rejectAt?: IsoDateString
	status?: ApplicationsStatusOptions
	updated?: IsoDateString
	viewAt?: IsoDateString
}

export type ConversationsRecord = {
	application?: RecordIdString
	created?: IsoDateString
	id: string
	message?: string
	updated?: IsoDateString
	user?: RecordIdString
}

export enum IndustriesEconomicImpactOptions {
	"significant" = "significant",
	"moderate" = "moderate",
	"critical" = "critical",
	"essential" = "essential",
}

export enum IndustriesGlobalImportranceOptions {
	"low" = "low",
	"medium" = "medium",
	"high" = "high",
}

export enum IndustriesSectorTypeOptions {
	"informal" = "informal",
	"public" = "public",
	"tertiary" = "tertiary",
	"secondary" = "secondary",
	"primary" = "primary",
}
export type IndustriesRecord = {
	code?: string
	created?: IsoDateString
	description?: string
	economicImpact?: IndustriesEconomicImpactOptions
	globalImportrance?: IndustriesGlobalImportranceOptions
	id: string
	isActive?: boolean
	keywords?: string
	name?: string
	related?: string
	sectorType?: IndustriesSectorTypeOptions
	subs?: string
	tags?: string
	updated?: IsoDateString
}

export type JobReactionsRecord = {
	comment?: string
	created?: IsoDateString
	id: string
	isDownvote?: boolean
	isUpvote?: boolean
	job?: RecordIdString
	profile?: RecordIdString
	updated?: IsoDateString
}

export enum JobsTypeOptions {
	"fullTime" = "fullTime",
	"partTime" = "partTime",
	"contract" = "contract",
	"intern" = "intern",
	"temporary" = "temporary",
	"seasonal" = "seasonal",
	"volunteer" = "volunteer",
}

export enum JobsCompFreqOptions {
	"hourly" = "hourly",
	"daily" = "daily",
	"weekly" = "weekly",
	"biWeekly" = "biWeekly",
	"monthly" = "monthly",
	"yearly" = "yearly",
}

export enum JobsPreferredExpLevelOptions {
	"noexp" = "noexp",
	"entry" = "entry",
	"mid" = "mid",
	"senior" = "senior",
}

export enum JobsEncouragedOptions {
	"highSchool" = "highSchool",
	"veteran" = "veteran",
	"fairChance" = "fairChance",
	"disability" = "disability",
}

export enum JobsWorkModelOptions {
	"hybrid" = "hybrid",
	"onsite" = "onsite",
	"remote" = "remote",
}

export enum JobsEnvironmentOptions {
	"office" = "office",
	"outdoor" = "outdoor",
	"vehicle" = "vehicle",
	"industrial" = "industrial",
	"customerFacing" = "customerFacing",
}
export type JobsRecord<Tmetadata = unknown> = {
	applications?: RecordIdString
	compAmount?: number
	compFreq?: JobsCompFreqOptions
	company?: RecordIdString
	created?: IsoDateString
	description?: HTMLString
	encouraged?: JobsEncouragedOptions
	environment?: JobsEnvironmentOptions
	hired?: RecordIdString
	id: string
	industry?: RecordIdString
	isAssociateRequire?: boolean
	isBachelorRequire?: boolean
	isDoctorateRequire?: boolean
	isMasterRequire?: boolean
	keywords?: string
	locationCity?: string
	locationCountry?: string
	locationStateProvince?: HTMLString
	locationStreetLine?: string
	metadata?: null | Tmetadata
	payment?: RecordIdString
	preferredExpLevel?: JobsPreferredExpLevelOptions
	preferredLocation?: string
	preferredMinimumExp?: number
	probationSalary?: number
	salary?: number
	salaryCurrency?: string
	title?: string
	type?: JobsTypeOptions
	updated?: IsoDateString
	user?: RecordIdString
	workModel?: JobsWorkModelOptions
}

export enum PaymentsStatusOptions {
	"pending" = "pending",
	"cancel" = "cancel",
	"refund" = "refund",
	"paid" = "paid",
}
export type PaymentsRecord<Tmetadata = unknown> = {
	amount?: number
	created?: IsoDateString
	id: string
	metadata?: null | Tmetadata
	status?: PaymentsStatusOptions
	updated?: IsoDateString
	user?: RecordIdString
}

export enum ProfilesTypeOptions {
	"candidate" = "candidate",
	"employer" = "employer",
}

export enum ProfilesCompanyTypeOptions {
	"startup" = "startup",
	"sme" = "sme",
	"mid" = "mid",
	"large" = "large",
	"multinational" = "multinational",
}
export type ProfilesRecord<Tmetadata = unknown> = {
	avatar?: string
	companyDescription?: HTMLString
	companyEmail?: string
	companyFoundedAt?: IsoDateString
	companyName?: string
	companyPhoneNumber?: string
	companyType?: ProfilesCompanyTypeOptions
	companyWebsite?: string
	created?: IsoDateString
	documents?: string[]
	id: string
	jobApplications?: RecordIdString[]
	jobPosts?: RecordIdString
	linkedinUrl?: string
	metadata?: null | Tmetadata
	preferredIndustries?: RecordIdString
	type?: ProfilesTypeOptions
	updated?: IsoDateString
	user?: RecordIdString
}

export type SubscriptionsRecord = {
	created?: IsoDateString
	id: string
	subscribee?: RecordIdString
	subscriber?: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	locationCity?: string
	locationCountry?: string
	locationStateProvince?: string
	locationStreetLine?: HTMLString
	name?: string
	password: string
	profiles?: RecordIdString[]
	tokenKey: string
	updated?: IsoDateString
	username?: string
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ApplicationsResponse<Texpand = unknown> = Required<ApplicationsRecord> & BaseSystemFields<Texpand>
export type ConversationsResponse<Texpand = unknown> = Required<ConversationsRecord> & BaseSystemFields<Texpand>
export type IndustriesResponse<Texpand = unknown> = Required<IndustriesRecord> & BaseSystemFields<Texpand>
export type JobReactionsResponse<Texpand = unknown> = Required<JobReactionsRecord> & BaseSystemFields<Texpand>
export type JobsResponse<Tmetadata = unknown, Texpand = unknown> = Required<JobsRecord<Tmetadata>> & BaseSystemFields<Texpand>
export type PaymentsResponse<Tmetadata = unknown, Texpand = unknown> = Required<PaymentsRecord<Tmetadata>> & BaseSystemFields<Texpand>
export type ProfilesResponse<Tmetadata = unknown, Texpand = unknown> = Required<ProfilesRecord<Tmetadata>> & BaseSystemFields<Texpand>
export type SubscriptionsResponse<Texpand = unknown> = Required<SubscriptionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	applications: ApplicationsRecord
	conversations: ConversationsRecord
	industries: IndustriesRecord
	jobReactions: JobReactionsRecord
	jobs: JobsRecord
	payments: PaymentsRecord
	profiles: ProfilesRecord
	subscriptions: SubscriptionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	applications: ApplicationsResponse
	conversations: ConversationsResponse
	industries: IndustriesResponse
	jobReactions: JobReactionsResponse
	jobs: JobsResponse
	payments: PaymentsResponse
	profiles: ProfilesResponse
	subscriptions: SubscriptionsResponse
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
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'conversations'): RecordService<ConversationsResponse>
	collection(idOrName: 'industries'): RecordService<IndustriesResponse>
	collection(idOrName: 'jobReactions'): RecordService<JobReactionsResponse>
	collection(idOrName: 'jobs'): RecordService<JobsResponse>
	collection(idOrName: 'payments'): RecordService<PaymentsResponse>
	collection(idOrName: 'profiles'): RecordService<ProfilesResponse>
	collection(idOrName: 'subscriptions'): RecordService<SubscriptionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
