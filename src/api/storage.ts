export function getCached(key:string): any {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : null;
}

export function putCached(key:string, value:any) {
    localStorage.setItem(key, JSON.stringify(value))
}