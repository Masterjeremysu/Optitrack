import { Component } from 'react'
import type { ReactElement } from 'react'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactElement
}

type State = {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('💥 Composant planté :', error, errorInfo)
  }

  render() {
    const { fallback = <p>Une erreur est survenue.</p> } = this.props

    if (this.state.hasError) return fallback

    return this.props.children
  }
}
