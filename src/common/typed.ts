export type LinkItem = {
    title: string
    url: string
    encrypt?: boolean
    description?: string
}

export type Cateogry = {
    name: string
    items: LinkItem[]
    icon?: string
}

export type GuideData = Cateogry[]

export type Context = {
    key: string | null
}