import React from "react"
import "./Modal.css"

export function Modal(props: {
  className?: string
  children?: React.ReactNode
}) {
  let { className = "" } = props
  return <div className={`modal ${className}`}>{props.children}</div>
}
