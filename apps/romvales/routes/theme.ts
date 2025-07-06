import { themeResolver } from '@romvales/session'
import { createThemeAction } from 'remix-themes'

export const action = createThemeAction(themeResolver)