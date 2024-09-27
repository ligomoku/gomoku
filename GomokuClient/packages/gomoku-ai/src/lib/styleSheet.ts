// Inpired from:
// https://stackoverflow.com/a/17423037/9878263

export let createStyleSheet = (d: Document): CSSStyleSheet => {
  // Create a style sheet
  let style = d.createElement("style")
  style.id = Math.random().toString(16).slice(2)
  d.head.append(style)

  // Find the style sheet's CSSStyleSheet entry in document.styleSheets
  for (let sheet of document.styleSheets) {
    if (sheet.ownerNode == style) {
      return sheet
    }
  }

  throw "createStyleSheet failed to retrieve created sheet"
}
