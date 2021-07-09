/* 强转 Number(num || null) */
/* 兼容不小心传入 undefined, null 的情况，将其赋值为 0 */
function compactNumber(num) {
  return Number(num || null) || 0
}

/**
 * @name lengthAfterDot 取小数点后的数位长度
 * @param  {Number|String} num 整数或小数 (的字符串)
 * @return {Number}     num 的小数位长度
 */
function lengthAfterDot(num) {
  let len

  try {
    len = compactNumber(num)
      .toString()
      .split('.')[1].length
  } catch (e) {
    len = 0
  }

  return len
}

/**
 * @name accMulBase 基本精确乘法运算 (仅支持两个数相乘)
 * @param  {Number} a
 * @param  {Number} b
 * @return {Number} a × b 的精确值
 */
function accMulBase(a, b) {
  const r1 = compactNumber(a)
    .toString()
    .replace('.', '')

  const r2 = compactNumber(b)
    .toString()
    .replace('.', '')

  const m = lengthAfterDot(a) + lengthAfterDot(b)

  return (r1 * r2) / 10 ** m
}

/**
 * @name accMul 精确乘法运算
 * @param  {Array} args 所有传入的值
 * @return {Number} a × b × c × ... × n 的精确值
 */
export function accMul(...args) {
  return args.reduce((acc, cur) => accMulBase(acc, cur), 1)
}

/**
 * @name accAddBase 基本精确加法运算
 * @param  {Number} a
 * @param  {Number} b
 * @return {Number} a + b 的精确值
 */
function accAddBase(a, b) {
  const c = lengthAfterDot(a)
  const d = lengthAfterDot(b)
  const e = 10 ** Math.max(c, d)

  return (accMul(a, e) + accMul(b, e)) / e
}

/**
 * @name accAdd 精确加法运算
 * @param  {Array} args
 * @return {Number} a + b 的精确值
 */
export function accAdd(...args) {
  return args.reduce((acc, cur) => accAddBase(acc, cur), 0)
}

/**
 * @name accSub 精确减法运算
 * @param  {Number} a
 * @param  {Number} b
 * @return {Number}   a - b 的精确值
 */
export function accSub(a, b) {
  const c = lengthAfterDot(a)
  const d = lengthAfterDot(b)
  const e = 10 ** Math.max(c, d)

  return (accMul(a, e) - accMul(b, e)) / e
}

/**
 * @name accDiv 精确除法运算
 * @param  {Number} a
 * @param  {Number} b
 * @return {Number} a ÷ b 的精确值
 */
export function accDiv(a, b) {
  const r1 = compactNumber(a)
    .toString()
    .replace('.', '')
  const r2 = compactNumber(b)
    .toString()
    .replace('.', '')
  const d = lengthAfterDot(b) - lengthAfterDot(a)

  return (r1 / r2) * 10 ** d
}
