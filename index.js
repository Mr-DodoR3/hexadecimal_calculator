window.onload = function() {
  let button = document.getElementById('button')
  let table = document.getElementById('table')

  button.onclick = function() {
    let value = document.getElementById('value').value
    let originalHex = document.getElementById('originalHex').value
    let conversionHex = document.getElementById('conversionHex').value
    let textType = document.getElementById('select').value
    let text = document.getElementById('text')

    let str = ''

    value = value.toUpperCase()
    // if (value.charCodeAt(0) > 47 && value.charCodeAt(0) < 58) {
    //   str = value.charCodeAt(0) - 48
    // }
    // else if (value.charCodeAt(0) > 64 && value.charCodeAt(0) < 91) {
    //   str = value.charCodeAt(0) - 55
    // }
    
    checkValue = function(value, originalHex, conversionHex) {
      const isNumberString = n => typeof n === "string" && n !== "" &&  !isNaN( n );
      const hexRange = n => n > 1 && n < 37
  
      if (value == '') {
        return '値を入力してください。'
      }
  
      if (isNumberString(originalHex) && isNumberString(conversionHex) && hexRange(originalHex) && hexRange(conversionHex)) {
        const checkCalueRange = (n,originalHex_a) => {
          let o = originalHex_a
          o = o < 10 ? parseInt(originalHex_a) + 48 : parseInt(originalHex_a) + 55
          console.log(n.charCodeAt(0) + "," + o)
          for (let i = 0; i < n.length; i++) {
            char_n = n.charCodeAt(i)
            if (!(char_n > 47 && char_n < 58 || char_n > 64 && char_n < 91) || char_n >= o) {
              return false
            }
          }
          return true
        }

        if (checkCalueRange(value, originalHex)) {
          let dec = 0
          for (let i = 0; i < value.length; i++) {
            chr_value = value.charCodeAt(i)
            if (chr_value > 47 && chr_value < 58) {
              chr_value -= 48
            }
            else {
              chr_value -= 55
            }
            chr_value = chr_value * originalHex ** (value.length - 1 - i)
            dec += chr_value
          }

          ans = ''
          while (dec >= conversionHex) {
            remainder = dec % conversionHex
            dec = Math.floor(dec / conversionHex)
            if (remainder > 9) {
              ans = String.fromCharCode(remainder + 55) + ans
            }
            else {
              ans = remainder + ans
            }
          }
          if (dec > 9) {
            ans = String.fromCharCode(dec + 55) + ans
          }
          else {
            ans = dec + ans
          }

          return ans
        }
        else {
          return ('この値は' + originalHex + "進数ではありません。")
        }
      }
      else {
        return '進数は2～36の数値を入力してください。'
      }
    }

    let final_anser = checkValue(value, originalHex, conversionHex)
    const isHexNumberString = n => {
      for (let i = 0; i < n.length; i++) {
        char_n = n.charCodeAt(i)
        if (!(char_n > 47 && char_n < 58 || char_n > 64 && char_n < 91)) {
          return false
        }
      }
      return true
    }
    if (isHexNumberString(final_anser) == true) {
      if (textType == '小文字') {
        final_anser = final_anser.toLowerCase()
      }
      str = '値:' + final_anser
    }
    else {
      str = 'Error:' + final_anser
    }
    
    text.innerText = str
  }

  table.onclick = function() {
    const url = 'child.html'
    window.open(url, '', 'menubar=0,width=240,height=600,autoHideMenuBar=true')
  }
};
