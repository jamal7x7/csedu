export function stringify(obj: Object | null): string {
  let cache: any[] | null = []
  let str = JSON.stringify(
    obj,
    function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache?.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return
        }
        // Store value in our collection
        cache.push(value)
      }
      return value
    },
    2
  )
  cache = null // reset the cache
  return str
}
