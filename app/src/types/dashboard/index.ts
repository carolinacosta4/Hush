import type { TablerIconComponent } from 'vue-tabler-icons';

/*Card types*/
type BlogCards = {
    avatar: string;
    coveravatar: string;
    read: string;
    title: string;
    link: string;
    category: string;
    name: string;
    view: string;
    comments: string;
    time: string;
};

/*Table Action*/
type tableAction = {
    icon: TablerIconComponent;
    listtitle: string;
};

type SleepLog = {
    date: string;
    sleepTime: string;
    wakeTime: string;
    sleepQuality: number;
};

type MoodLog = {
    date: string;
    mood: string;
};

export type { BlogCards, tableAction, SleepLog, MoodLog };
