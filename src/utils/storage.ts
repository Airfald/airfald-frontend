class Store {
  public disabled: boolean
  private storage: Storage

  constructor() {
    this.disabled = false
    this.storage = localStorage
  }

  // set storage with key and val
  public set(key: string, val: any): void {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
  }

  // get storage with key, return def if not found
  public get(key: string, def?: any): any {
    if (this.disabled) {
      return def
    }
    const val = deserialize(this.storage.getItem(key))
    return val === undefined ? def : val
  }

  // determine storage has the key
  public has(key: string): boolean {
    return this.get(key) !== undefined
  }

  // remove storage with key
  public remove(key: string): void {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  }

  // clear all storages
  public clear(): void {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  }

  // get all the storages
  public getAll(): { [key: string]: any } | null {
    if (this.disabled) {
      return null
    }
    const ret: { [key: string]: any } = {}
    this.forEach((key: string, val: any) => {
      ret[key] = val
    })
    return ret
  }

  // forEach the storages and call the callback function with each storage
  public forEach(cb: (key: string, val: any) => void): void {
    if (this.disabled) {
      return
    }
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
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

const store = new Store()

try {
  const testKey = 'idistribution_console_web:test_store'
  store.set(testKey, testKey)
  if (store.get(testKey) !== testKey) {
    store.disabled = true
  }
  store.remove(testKey)
} catch (e) {
  store.disabled = true
}

export default store
