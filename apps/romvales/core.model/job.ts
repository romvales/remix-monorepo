import { getBookmarks, guestBookmarkJobPost, guestRemoveBookmark } from '@romvales/core.service/guest.client'

type RawJob = RomTypes.DirectusSchema['jobs'][number]
type RawCompany = RomTypes.DirectusSchema['companies'][number]

export class CompanyModel {

    constructor(
      private company: RawCompany
    ) {
      
    }

}

export class JobModel {

  constructor(
    private job: RawJob
  ) {

  }

  get raw() {
    return this.job
  }

  get id() {
    return this.job.id
  }

  get title() {
    return this.job.jobTitle
  }

  get currency() {
    return this.job.salaryCurrencySymbol
  }

  get workMode() {
    const workMode = this.job.workMode
    return workMode == 0 ? 'remote' : workMode == 1 ? 'hybrid' : 'onsite'
  }

  get jobType() {
    const jobType = this.job.jobType
    
    switch (jobType) {
    case 0: return 'full-time'
    case 1: return 'part-time'
    case 2: return 'contract'
    case 3: return 'internship'
    case 4: return 'temporary'
    case 5: return 'seasonal'
    case 6: return 'volunteer'
    }
  }

  get salaryUnit() {
    const unit = this.job.salaryUnit
    return unit == 0 ? 'month' : unit == 1 ? 'week' : 'hour'
  }

  get viewCount() {
    return this.job.viewCount
  }

  get locationSimple() {
    return `${this.job.locationState}, ${this.job.locationCountry}`
  }

  get salaryRange() {
    const cashFmt = Intl.NumberFormat('en-US')
    const min = this.job.salaryMinimum
    const max = this.job.salaryMaximum

    return `${cashFmt.format(Number(min))}-${cashFmt.format(Number(max))}/${this.salaryUnit}`
  }

  get industries() {
    const industries = this.job.industries?.map(
      (item) => {
        const { industries_id } = item as { industries_id: RomTypes.DirectusSchema['industries'][number] }
        return industries_id?.name
      }
    )

    return industries?.join(', ')
  }

  async bookmarkJob() {
    const bookmarks = new Set((await getBookmarks()).map(bookmark => bookmark.jobId))

    if (bookmarks.has(this.job.id)) {
      return guestRemoveBookmark(this.job.id)
    } else {
      return guestBookmarkJobPost(this.job.id)
    }
  }

  static from(job: RawJob) {
    return new JobModel(job)
  }

}