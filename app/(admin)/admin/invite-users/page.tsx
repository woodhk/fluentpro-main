import { redirect } from 'next/navigation';

export default function InviteUsersPage() {
  redirect('/admin/invite-users/create-hr-admins');
}