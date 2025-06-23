interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_APP_MODE: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_SHORT_TITLE: string
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PROXY_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
