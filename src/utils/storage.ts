class Store {
  private storage: Storage

  constructor() {
    this.storage = localStorage
  }

  set(key: string, val: any): void {
    this.storage.setItem(key, serialize(val))
  }

  get(key: string): any {
    const val = deserialize(this.storage.getItem(key))

    return val
  }

  has(key: string): boolean {
    const val = this.get(key) !== undefined

    return val
  }

  remove(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }

  getAll(): { [key: string]: any } | null {
    const ret: { [key: string]: any } = {}
    this.forEach((key: string, val: any) => {
      ret[key] = val
    })

    return ret
  }

  forEach(cb: (key: string, val: any) => void): void {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i) as string
      const val = this.get(key)
      cb(key, val)
    }
  }
}

// 序列化
function serialize(val: any): string {
  return JSON.stringify(val)
}

// 反序列化
function deserialize(val: any): any {
  if (typeof val !== 'string') return undefined

  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

const store = new Store()

export default store
