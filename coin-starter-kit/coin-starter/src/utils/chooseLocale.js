export default chooseLocale = (type)=> {
  switch(type){
    case 'en':
      return 'en_US';
      break;
    case 'zh':
      return 'zh_CN';
      break;
    default:
      return 'en_US';
      break;
  }
}