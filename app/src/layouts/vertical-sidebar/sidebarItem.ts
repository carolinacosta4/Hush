export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    {
        title: 'Dashboard',
        icon: 'widget-add-line-duotone',
        to: '/'
    },
    {
        title: 'Tips',
        icon: 'book-2-broken',
        to: '/tips'
    },
    {
        title: 'Account',
        icon: 'user-linear',
        to: '/account'
    },
    {
        title: 'Add Log',
        icon: 'add-circle-outline',
        to: '/createLog'
    },
];

export default sidebarItem;
