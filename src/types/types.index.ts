export type emailPass = {
    email : string,
    password : string
}

export const UserRole ={
    contributor : "contributor",
    maintainer : "maintainer"
} as const

export type Role = keyof typeof UserRole

export type IssueType = {
    title: string,
    description: string,
    type:string
}