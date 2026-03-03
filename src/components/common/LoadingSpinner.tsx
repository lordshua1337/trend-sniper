'use client'

interface LoadingSpinnerProps {
  readonly size?: 'sm' | 'md' | 'lg'
  readonly label?: string
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-2',
}

export function LoadingSpinner({ size = 'md', label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} rounded-full border-[var(--border)] border-t-[var(--accent)] animate-spin`}
        role="status"
        aria-label={label ?? 'Loading'}
      />
      {label && (
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
    </div>
  )
}
