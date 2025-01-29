import type { TablerIconComponent } from 'vue-tabler-icons';

/*Card types*/
type BlogCards = {
    _id: string,
    title: string;
    description: string;
    author: string;
    publishDate: string;
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
    notes: string;
};

type Achievement = {
    _id: string;
    name: string;
    image: string;
};

export type { BlogCards, tableAction, SleepLog, MoodLog, Achievement };
