import { createElement } from "react"
import { createRoot } from "react-dom/client"

import * as packageInfo from "../package.json"
import { Game } from "./game"
import { githubCornerHTML } from "./lib/githubCorner"
import { createStyleSheet } from "./lib/styleSheet"
import { ensureSpacelessURL, resolveSearch } from "./lib/urlParameter"

import "./style.css"
import { GomokuConfig, Versus } from "./type"

function getConfig(location: Location) {
  let config = resolveSearch<GomokuConfig>(location, {
    engine: () => "basicOne",
    versus: () => "humanAi" as Versus,
    secondEngine: () => "same",
    timeout: () => 500,
    maximumThinkingTime: () => 2_000,
    dark: () => false,
    playerColors: () => "000:fff",
    highlightColors: () => "0f0:0f0",
    game: () => "",
  })
  return config
}

async function main() {
  ensureSpacelessURL(location)

  let cornerDiv = document.createElement("div")
  cornerDiv.innerHTML = githubCornerHTML(
    packageInfo.repository.url,
    packageInfo.version,
  )
  document.body.appendChild(cornerDiv)

  let config = getConfig(location)
  console.log(config)

  let styleSheet = createStyleSheet(document)
  styleSheet.insertRule(":root {}")
  let root = createRoot(document.getElementById("root")!)
  root.render(createElement(Game, { config, styleSheet }))
}

main()
