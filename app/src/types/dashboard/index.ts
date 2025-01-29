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
    _id: string;
    date: string;
    bedTime: string;
    wakeTime: string;
    sleepQuality: number;
};

type MoodLog = {
    _id: string;
    date: string;
    mood: string;
};

type Achievement = {
    _id: string;
    name: string;
    image: string;
};

export type { BlogCards, tableAction, SleepLog, MoodLog, Achievement };
