export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)') // className前后可以跟空白字符
  return reg.test(el.className)
}

/**
 * 获取或设置元素中'data-'属性的值
 * @param {Object} el 元素对象
 * @param {String} name 属性名
 * @param {String} val 属性值
 */
export function getData (el, name, val) {
  if (val) {
    el.dataset[name] = val
  } else {
    return el.dataset[name]
  }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    Okit: 'OkitTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      console.log(key)
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
