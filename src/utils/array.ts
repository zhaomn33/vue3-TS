// 数组去重
export const uniqueArray = (arr: Array<any>, key = 'path') => {
  const hash: any = {}
  return arr.reduce(function(item, next) {
    if (!hash[next[key]]) {
      hash[next[key]] = true && item.push(next)
    }
    return item
  }, [])
}
