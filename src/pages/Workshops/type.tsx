

interface MyWorkshop {
    title: string,
    poster: string,
    venue: string,
    club: string,
    hostel: [],
    description: string,
    contact_person: string,
    time: string
}

interface WorkshopData {
    [category: string]: MyWorkshop[];
}

export type { MyWorkshop, WorkshopData };