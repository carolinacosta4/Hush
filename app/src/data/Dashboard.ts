import type { BlogCards, tableAction } from '@/types/dashboard/index';
import { fetchAllTips } from '@/api/queries';
import { EditIcon, TrashIcon } from 'vue-tabler-icons';

const BlogCardData: BlogCards[] = [
    {
        _id: '1',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        description: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        author: 'Georgeanna Ramero',
        publishDate: 'Mon, Dec 19'
    },
    {
        _id: '2',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        description: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        author: 'Georgeanna Ramero',
        publishDate: 'Mon, Dec 19'
    },
    {
        _id: '3',
        title: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        description: 'As yen tumbles, gadget-loving Japan goes for secondhand iPhones',
        author: 'Georgeanna Ramero',
        publishDate: 'Mon, Dec 19'
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

export { BlogCardData, tableActionData, };
