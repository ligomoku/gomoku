import { default as React, ReactNode } from "react"

export interface ExportButtonProps {
  targetObject: Record<string, any>
  propertyNameArray: string[]
  text?: ReactNode
  transform?: Record<string, (value: any) => string>
}

export function UrlExportButton(props: ExportButtonProps) {
  return (
    <button
      onClick={() => {
        let url = new URL(location.href)
        for (let name of props.propertyNameArray) {
          let value = props.targetObject[name]
          value = props?.transform?.[name]?.(value) ?? value
          if (typeof value === "boolean") {
            value = +value
          }
          if (typeof value === "number") {
            value = String(value)
          }
          url.searchParams.set(name, value)
        }
        history.pushState(null, "", url.href)
      }}
    >
      {props.text ?? "Export to URL"}
    </button>
  )
}
