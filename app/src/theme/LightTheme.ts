import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const BLUE_THEME: ThemeTypes = {
    name: 'BLUE_THEME',
    dark: false,
    variables: {
        'border-color': '#e0e6eb',
        'border-opacity': 1
    },
    colors: {
        primary: '#FFFFFF',
        secondary: '#8965E5',
        info: '#46caeb',
        success: '#00ceb6',
        warning: '#ffae1f',
        error: '#FCCC76',
        lightprimary: '#805BB5',
        lightsecondary: '#e7e2f3',
        lightsuccess: '#d2f9f4',
        lighterror: '#f5e1bc',
        lightinfo: '#e1f5fa',
        lightwarning: '#fff1cc',
        textPrimary: '#805BB5',
        textSecondary: '#FFFFFF',
        borderColor: '#e0e6eb',
        containerBg: '#F8FAFD',
        background: '#F8FAFD',
        hoverColor: '#805BB5',
        surface: '#FFFFFF',
        grey100: '#EAEFF4',
        grey200: '#29343d',
        light: '#FCCC76',
        muted:'#526b7a'
    }
};



export { BLUE_THEME};
