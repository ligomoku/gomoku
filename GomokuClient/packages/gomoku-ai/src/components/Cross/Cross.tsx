import React, { useState } from "react"
import { Position } from "../../type"

export type CrossProp = {
  position?: { x: number; y: number }
  value: 0 | 1 | 2
  onClick?: (position: Position) => () => void
  onKeyDown?: (
    position: Position,
  ) => (event: React.KeyboardEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
  textual?: boolean
  hover?: boolean
}

export function Cross(props: CrossProp): React.ReactElement {
  let { className, position, value, disabled, textual, onClick, onKeyDown } =
    props
  let button = (
    <button
      disabled={disabled}
      className={`cross cross--${value} ${className ?? ""}`}
      onClick={position && onClick?.(position)}
      onKeyDown={position && onKeyDown?.(position)}
    >
      {["+", "", ""][value]}
    </button>
  )
  if (textual) {
    return (
      <span style={{ position: "relative", bottom: "0.3em" }}>{button}</span>
    )
  }
  return button
}
