export interface NavType {
    name: string
    meta: { title: string; icon?: string; actIcon?: string }
    path?: string
    target?: '_blank' | '_self'
    isRoute?: boolean
    children?: NavType[]
}

export const HomeNavs: NavType[] = [
    {
        name: 'NavA',
        meta: { title: 'Nav-A' },
        children: [
            {
                name: 'SubNavA1',
                meta: {
                    title: 'Nav-A-1',
                    icon: 'nav-home-a1'
                },
                isRoute: true,
                path: '/menua'
            },
            {
                name: 'SubNavA2',
                meta: {
                    title: 'Nav-A-2',
                    icon: 'nav-home-a1'
                },
                isRoute: true,
                path: '/menua'
            },
            {
                name: 'SubNavA3',
                meta: {
                    title: 'Nav-A-3',
                    icon: 'nav-home-a1'
                },
                isRoute: true,
                path: '/menua'
            },
            {
                name: 'SubNavA4',
                meta: {
                    title: 'Nav-A-4',
                    icon: 'nav-home-a1'
                },
                isRoute: true,
                path: '/menua'
            }
        ]
    },
    {
        name: 'NavB',
        meta: { title: 'Nav-B' },
        children: [
            {
                name: 'SubNavB1',
                meta: {
                    title: 'Nav-B-1',
                    icon: 'nav-home-a1'
                }
            },
            {
                name: 'SubNavB2',
                meta: {
                    title: 'Nav-B-2',
                    icon: 'nav-home-a1'
                }
            },
        ]
    }
]
