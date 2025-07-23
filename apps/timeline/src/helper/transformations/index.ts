import { transformDate } from './date'
import { expandMetaDict } from './expandMetaDict'


const transformerFns: Record<string, any> = {
  'transformDate': transformDate,
  'expandMetaDict': expandMetaDict
}


export function transformerFn(transformations: Record<string, any>) {
  return (sheet: Record<any, any>[], meta: any) => {
    let s = sheet
    Object.entries(transformations).forEach(transformation => {
      const [fnName, options] = transformation
      console.log("run transformation", {fnName, options})
      const fn = transformerFns[fnName]
      s = fn(s, options, meta)
    })
    return s
  }
}
