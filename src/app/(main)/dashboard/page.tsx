import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getMyJobs } from '@/app/actions/jobs';
import { getMyProposals } from '@/app/actions/proposals';
import { getMyContracts } from '@/app/actions/contracts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, FileText, CheckCircle } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const isFreelancer = session.user.role === 'freelancer';
  const isClient = session.user.role === 'client';

  const [myJobs, myProposals, myContracts] = await Promise.all([
    isClient ? getMyJobs() : Promise.resolve([]),
    isFreelancer ? getMyProposals() : Promise.resolve([]),
    getMyContracts(),
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome back, {session.user.name}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {isFreelancer ? 'Manage your proposals and contracts' : 'Manage your jobs and contracts'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {isFreelancer ? 'Active Proposals' : 'Active Jobs'}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-zinc-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isFreelancer ? myProposals.filter(p => p.status === 'pending').length : myJobs.filter(j => j.status === 'open').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-zinc-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myContracts.filter(c => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-zinc-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {myContracts.filter(c => c.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {isClient && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">My Jobs</h2>
              <Link href="/jobs/create">
                <Button>Post New Job</Button>
              </Link>
            </div>
            <div className="grid gap-4">
              {myJobs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400">You haven&apos;t posted any jobs yet</p>
                    <Link href="/jobs/create">
                      <Button className="mt-4">Post Your First Job</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                myJobs.slice(0, 5).map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>{job.proposalCount} proposals</CardDescription>
                        </div>
                        <Badge variant={job.status === 'open' ? 'success' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {isFreelancer && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">My Proposals</h2>
            <div className="grid gap-4">
              {myProposals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-zinc-600 dark:text-zinc-400">You haven&apos;t submitted any proposals yet</p>
                    <Link href="/jobs">
                      <Button className="mt-4">Browse Jobs</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                myProposals.slice(0, 5).map((proposal) => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{proposal.job?.title}</CardTitle>
                          <CardDescription>
                            Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            proposal.status === 'accepted'
                              ? 'success'
                              : proposal.status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Active Contracts</h2>
          <div className="grid gap-4">
            {myContracts.filter(c => c.status === 'active').length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-zinc-600 dark:text-zinc-400">No active contracts</p>
                </CardContent>
              </Card>
            ) : (
              myContracts
                .filter(c => c.status === 'active')
                .slice(0, 5)
                .map((contract) => (
                  <Card key={contract.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{contract.title}</CardTitle>
                          <CardDescription>
                            {isFreelancer
                              ? `Client: ${(contract as any).client?.user?.name || 'N/A'}`
                              : `Freelancer: ${(contract as any).freelancer?.user?.name || 'N/A'}`}
                          </CardDescription>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
