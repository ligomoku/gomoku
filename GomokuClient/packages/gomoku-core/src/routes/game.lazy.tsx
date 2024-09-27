import { createLazyFileRoute } from '@tanstack/react-router'
import Game from '@/pages/Game.tsx'

export const Route = createLazyFileRoute('/game')({
  component: GamePage,
})

function GamePage() {
  return <Game />
}
