interface ErrorDialogProps {
  message: string
  onClose: () => void
}

export default function ErrorDialog({ message, onClose }: ErrorDialogProps) {
  return (
    <div className="retro-window max-w-sm mx-auto">
      <div className="window-titlebar bg-red-500">
        <div className="flex items-center gap-2 flex-1">
          <span>System Error</span>
        </div>
        <div className="window-controls">
          <div className="control-dot" />
          <div className="control-dot" />
          <div className="control-dot" />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="font-body text-sm text-gray-800">
          {message}
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="retro-button-primary"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
