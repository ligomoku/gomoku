import { ReporterOptions } from "knip"
import { ISSUE_TYPE_TITLE } from "knip/dist/constants"
import { Issue, IssueRecords } from "knip/dist/types/issues"

/** This file is used to customize the shape of the output of knip. */

export default function (options: ReporterOptions) {
  Object.entries(ISSUE_TYPE_TITLE).forEach(([issueType, title]) => {
    const key = issueType as keyof typeof ISSUE_TYPE_TITLE
    if (!options.report[key]) {
      return
    }
    console.log(title)
    const record: IssueRecords = options.issues[key]
    if (key === "unlisted") {
      manageUnlistedDependencies(record)
      return
    }
    Object.entries(record).forEach(([filename, issueObject]) => {
      console.log(`  ${filename}`)
      Object.entries(issueObject).forEach(([symbol, issue]) => {
        let suffix = ""
        if (issue.line !== undefined && issue.col !== undefined) {
          suffix = ` (${issue.filePath}:${issue.line}:${issue.col})`
        }
        console.log(`    ${symbol}${suffix}`)
      })
    })
  })
}

function manageUnlistedDependencies(record: IssueRecords) {
  const issueBySymbol = {} as Record<string, (Issue & { filename: string })[]>
  Object.entries(record).forEach(([filename, issueObject]) => {
    Object.entries(issueObject).forEach(([symbol, issue]) => {
      ;(issueBySymbol[symbol] ??= []).push({ ...issue, filename })
    })
  })

  Object.entries(issueBySymbol).forEach(([symbol, issues]) => {
    const count = issues.length
    if (count === 1) {
      console.log(`  ${symbol} (found in ${issues[0].filename})`)
      return
    }
    console.log(`  ${symbol} (found in ${count} files)`)
  })
}
