/**
 * Created by luowen on 17/5/12.
 */
import _ from 'lodash'

export const LANG = {
  EN: {
    locale: 'en',
    name: 'English'
  },
  ZH: {
    locale: 'zh',
    name: '简体中文'
  },
}

export const getLatestLocale = () => {
  let locale = window.localStorage.getItem('i18nextLng')
  if (!locale || !getLngByLocale(locale)) locale = LANG.EN.locale
  return locale
}

export const getLngByLocale = (locale) => {
  return _.find(LANG, { locale }).name
}
