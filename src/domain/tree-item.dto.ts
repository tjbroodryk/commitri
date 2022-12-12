export class TreeItem { 
  public readonly mode = '100644' as const
  public readonly type = 'blob' as const

  private constructor(public readonly sha: string, public readonly path: string) {
    
  }
  
  static create(props: Pick<TreeItem, 'sha' | 'path'>): TreeItem {
    return new TreeItem(props.sha, props.path)
  }
}