import type { BlogCards, tableAction, MoodLog, SleepLog } from '@/types/dashboard/index';

import user1 from '@/assets/images/profile/user-1.jpg';
import user2 from '@/assets/images/profile/user-2.jpg';
import user3 from '@/assets/images/profile/user-3.jpg';
import img1 from '@/assets/images/blog/blog-img1.jpg';
import img2 from '@/assets/images/blog/blog-img2.jpg';
import img3 from '@/assets/images/blog/blog-img3.jpg';

import { EditIcon, TrashIcon } from 'vue-tabler-icons';

const BlogCardData: BlogCards[] = [
    {
        avatar: user1,
        coveravatar: img1,
        read: '2 min Read',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        link: '/',
        category: 'Social',
        name: 'Georgeanna Ramero',
        view: '9,125',
        comments: '3',
        time: 'Mon, Dec 19'
    },
    {
        avatar: user2,
        coveravatar: img2,
        read: '2 min Read',
        title: 'Intel loses bid to revive antitrust case against patent foe Fortress',
        link: '/',
        category: 'Gadget',
        name: 'Georgeanna Ramero',
        view: '4,150',
        comments: '38',
        time: 'Sun, Dec 18'
    },
    {
        avatar: user3,
        coveravatar: img3,
        read: '2 min Read',
        title: 'COVID outbreak deepens as more lockdowns loom in China',
        link: '/',
        category: 'Health',
        name: 'Georgeanna Ramero',
        view: '9,480',
        comments: '12',
        time: 'Sat, Dec 17'
    }
];

const tableActionData: tableAction[] = [
    {
        icon: EditIcon,
        listtitle: 'Edit'
    },
    {
        icon: TrashIcon,
        listtitle: 'Delete'
    }
];

const MoodLogData: MoodLog[] = [
    { date: '2025-01-20', mood: 'Alegre' },
    { date: '2025-01-21', mood: 'Cansado' },
    { date: '2025-01-22', mood: 'Alegre' },
    { date: '2025-01-23', mood: 'Neutro' },
    { date: '2025-01-24', mood: 'Irritado' },
    { date: '2025-01-25', mood: 'Alegre' },
    { date: '2025-01-26', mood: 'Neutro' }
];

const SleepLogData: SleepLog[] = [
    { date: '2025-01-20', sleepTime: '23:00', wakeTime: '07:00', sleepQuality: 8 },
    { date: '2025-01-21', sleepTime: '00:30', wakeTime: '06:45', sleepQuality: 6 },
    { date: '2025-01-22', sleepTime: '22:45', wakeTime: '06:30', sleepQuality: 9 },
    { date: '2025-01-23', sleepTime: '23:15', wakeTime: '07:15', sleepQuality: 7 },
    { date: '2025-01-24', sleepTime: '00:00', wakeTime: '06:00', sleepQuality: 5 },
    { date: '2025-01-25', sleepTime: '22:30', wakeTime: '06:45', sleepQuality: 8 },
    { date: '2025-01-26', sleepTime: '23:00', wakeTime: '07:00', sleepQuality: 7 },
    { date: '2025-02-01', sleepTime: '23:15', wakeTime: '07:15', sleepQuality: 8 },
    { date: '2025-02-02', sleepTime: '22:30', wakeTime: '06:45', sleepQuality: 7 },
    { date: '2025-02-03', sleepTime: '00:00', wakeTime: '06:30', sleepQuality: 6 },
    { date: '2025-02-04', sleepTime: '23:00', wakeTime: '07:00', sleepQuality: 9 },
    { date: '2025-02-05', sleepTime: '23:45', wakeTime: '07:15', sleepQuality: 8 },
    { date: '2025-02-06', sleepTime: '22:45', wakeTime: '06:30', sleepQuality: 7 },
    { date: '2025-02-07', sleepTime: '23:30', wakeTime: '07:00', sleepQuality: 6 }
];

const moodMapping: { [key: string]: number } = {
    Alegre: 10,
    Cansado: 3,
    Neutro: 5,
    Irritado: 0
};

const combinedData = MoodLogData.map((moodLog) => {
    const sleepLog = SleepLogData.find((sleepLog) => sleepLog.date === moodLog.date);
    return {
        date: moodLog.date,
        mood: moodMapping[moodLog.mood] ?? null,
        sleepQuality: sleepLog ? sleepLog.sleepQuality : null
    };
});

export { BlogCardData, tableActionData, SleepLogData, MoodLogData, combinedData };
