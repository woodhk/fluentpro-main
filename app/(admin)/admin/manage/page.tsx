import { redirect } from 'next/navigation';

export default function ManagePage() {
  redirect('/admin/manage/company-list');
}
