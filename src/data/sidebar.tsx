import { ArchiveIcon, DeleteIcon, NoteIcon, ProfileIcon } from '../assets/icons';

export const sidebar = [
  {
    id: 1,
    icon: <NoteIcon />,
    name: 'All Notes',
    link: '/'
  },
  {
    id: 2,
    icon: <ArchiveIcon />,
    name: 'Archived',
    link: '/archived'
  },
  {
    id: 3,
    icon: <DeleteIcon />,
    name: 'Deleted',
    link: '/deleted'
  },
  {
    id: 4,
    icon: <ProfileIcon />,
    name: 'Profile',
    link: '/profile'
  }
];
