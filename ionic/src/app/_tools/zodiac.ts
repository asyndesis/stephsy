/**
 * Return zodiac sugn by month and day
 *
 * @param day
 * @param month
 * @return {object} name and symbol of zodiac sign
 */
let zodiac = {
  getSign: function(day, month) {

    var zodiacSigns = {
      capricorn: {symbol: '♑︎', name: 'capricorn'},
      aquarius:{symbol: '♒︎', name: 'aquarius'},
      pisces: {symbol: '♓︎', name: 'pisces'},
      aries: {symbol: '♈︎', name: 'aries'},
      taurus: {symbol: '♉︎', name: 'taurus'},
      gemini: {symbol: '♊︎', name: 'gemini'},
      cancer: {symbol: '♋︎', name: 'cancer'},
      leo: {symbol: '♌︎', name: 'leo'},
      virgo: {symbol: '♍︎', name: 'virgo'},
      libra: {symbol: '♎︎', name: 'libra'},
      scorpio: {symbol: '♏︎', name: 'scorpio'},
      sagittarius:  {symbol:'♐︎', name: 'sagittarius'}
    }
  
    if((month == 1 && day <= 22) || (month == 12 && day >= 19)) {
      return zodiacSigns.capricorn;
    } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return zodiacSigns.aquarius;
    } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return zodiacSigns.pisces;
    } else if((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return zodiacSigns.aries;
    } else if((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return zodiacSigns.taurus;
    } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
      return zodiacSigns.gemini;
    } else if((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
      return zodiacSigns.cancer;
    } else if((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return zodiacSigns.leo;
    } else if((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return zodiacSigns.virgo;
    } else if((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return zodiacSigns.libra;
    } else if((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return zodiacSigns.scorpio;
    } else if((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return zodiacSigns.sagittarius;
    }
  }
};

export default zodiac;