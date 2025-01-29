import type { tableAction } from '@/types/dashboard/index';
import { EditIcon, TrashIcon } from 'vue-tabler-icons';

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

export { tableActionData, };
