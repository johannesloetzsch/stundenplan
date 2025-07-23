export interface ExpandMetaDictOptions {
  keepRowNames: string[];
  expandOnMeta: string,
  columnNameExpandingColKey: string,
  columnNameExpandingColVal: string,
  columnNameContent: string,
}

export function expandMetaDict(sheet: Record<any, any>[], options: ExpandMetaDictOptions, meta: any) {
  const {keepRowNames, expandOnMeta, columnNameExpandingColKey, columnNameExpandingColVal, columnNameContent} = options
  const expandingCols = meta[expandOnMeta]

  return sheet.reduce( (acc: any, row: any) => {
    const keepRows = Object.fromEntries(
      Object.entries(row).filter(([colName]) => keepRowNames.includes(colName))
    )
    for(var col in row) {
      if(Array.from(Object.keys(expandingCols) || []).includes(col)) {
        acc.push({...keepRows, 
		 [columnNameContent]: row[col],
		 [columnNameExpandingColKey]: col,
		 [columnNameExpandingColVal]: expandingCols[col]
	});
      };
    };
    return acc;
  }, []);
};
