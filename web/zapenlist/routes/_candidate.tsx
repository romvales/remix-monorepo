import { Outlet } from '@remix-run/react';
import { CandidateFooter } from '@zapenlist/components/common/candidate';

export default function Layout() {
  
  return (
    <>
      <Outlet />
      <CandidateFooter />
    </>
  )
}