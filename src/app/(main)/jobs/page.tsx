import { searchJobs } from '@/app/actions/jobs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MapPin, DollarSign, Clock } from 'lucide-react';

export default async function JobsPage() {
  const { jobs } = await searchJobs({ limit: 20, offset: 0 });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Browse Jobs
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Find your next opportunity
          </p>
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-600 dark:text-zinc-400">No jobs available at the moment</p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">Check back later for new opportunities</p>
              </CardContent>
            </Card>
          ) : (
            jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        <Link href={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                          {job.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Posted by {(job as any).client?.user?.name || 'Anonymous'} • {formatDate(job.postedAt)}
                      </CardDescription>
                    </div>
                    <Badge variant={job.budgetType === 'fixed' ? 'default' : 'secondary'}>
                      {job.budgetType === 'fixed' ? 'Fixed Price' : 'Hourly'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-zinc-700 dark:text-zinc-300 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(job as any).skills?.slice(0, 5).map((js: any) => (
                      <Badge key={js.skillId} variant="outline">
                        {js.skill?.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                    {job.budget && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span>{formatCurrency(job.budget)}</span>
                      </div>
                    )}
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.remote ? 'Remote' : job.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.proposalCount || 0} proposals</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
