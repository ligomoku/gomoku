/**
 * setLocationHash
 *
 * **it may not work properly with boolean values**
 *
 * @param location the location object of the page (window.location)
 * @param updateObject an object containing values to set in the url
 * @param deleteKeyArray an array containing keys to remove from the url
 * @param updateIfPresentObject an object containing values to update only if already present in the URL
 */
export function setLocationHash(
  location: Location,
  updateObject: Record<string, string | number | boolean>,
  deleteKeyArray: string[],
  updateIfPresentObject: Record<string, string | number | boolean>,
) {
  let hashArray = location.hash
    .slice(1)
    .split("#")
    .map((entry) => {
      let key = entry
      let value: string | undefined = undefined
      if (entry.includes("=")) {
        let valueList: string[]
        ;[key, ...valueList] = entry.split("=")
        value = valueList.join("=")
      }

      // core activity: filtering and setting difficulty value
      if (deleteKeyArray.includes(key)) {
        return
      } else if (updateObject[key] !== undefined) {
        value = `${updateObject[key]}`
        delete updateObject[key]
      } else if (updateIfPresentObject[key] !== undefined) {
        value = `${updateIfPresentObject[key]}`
      }
      // core activity end

      if (value !== undefined) {
        entry = `${key}=${value}`
      }
      return entry
    })
    .filter((x) => x !== undefined)

  Object.entries(updateObject).map(([key, value]) => {
    if (value === null || value === undefined) {
      return
    }
    if (typeof value !== "boolean") {
      hashArray.push(`${key}=${value}`)
    } else if (value === true) {
      hashArray.push(key)
    }
  })

  location.hash = hashArray.join("#")
}
