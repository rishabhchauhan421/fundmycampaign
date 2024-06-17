import factory from '@/ethereum/factory';
import Link from 'next/link';
import MaxWidthWrapper from './components/MaxWidthWrapper';
import { classNames } from '@/lib/utils';

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

export default async function Home() {
  const deployedCampaigns = await factory.methods.getDeployedCampaign().call();

  return (
    <MaxWidthWrapper>
      <main className="bg-white">
        <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-12 lg:px-3">
          <div className="">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  Campaigns
                </h2>
              </div>
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View All
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {deployedCampaigns.map((campaign: any) => (
                <li
                  key={campaign.address}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {campaign}
                      </p>
                      <p
                        className={classNames(
                          statuses['In progress'],
                          'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                        )}
                      >
                        {'In Progress'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Link
                      href={'/'}
                      className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                    >
                      View project
                      <span className="sr-only">, {campaign}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </MaxWidthWrapper>
  );
}
