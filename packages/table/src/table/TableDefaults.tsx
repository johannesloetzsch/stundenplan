import { TableOptions } from "../types/table"
import { MRT_DensityState } from "material-react-table"

export function useDensityCompact(options: TableOptions): TableOptions {
  return {
    ...options,
    enableDensityToggle: false,
    initialState: {
      ...options.initialState,
      density: 'compact' as MRT_DensityState,
    }
  }
}

export function useTableDefaults(options: TableOptions): TableOptions {
  return {
    ...useDensityCompact(options)
  }
}
