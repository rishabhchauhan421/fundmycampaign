import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import campaign from '@/ethereum/campaign';
import { classNames } from '@/lib/utils';
import {
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import Web3 from '@/ethereum/web3';
import ContributeInputField from '@/components/ContributeInputField';
import Link from 'next/link';

const actions = [
  {
    title: 'Address of the Manager',
    description:
      'The manager created this campaign and can create requests to withdraw money',
    href: '#',
    icon: ClockIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    type: 'managerAddress',
  },
  {
    title: 'Minimum Contribution (wei)',
    description:
      'You must contribute at least this much wei to become an approver',
    href: '#',
    icon: CheckBadgeIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    type: 'minimumContribution',
  },
  {
    title: 'Number of Requests',
    description:
      'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    href: '#',
    icon: UsersIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
    type: 'numRequests',
  },
  {
    title: 'Number of Approvers',
    description: 'Number of people who have already donated to this campaign',
    href: '#',
    icon: BanknotesIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    type: 'approversCount',
  },
  {
    title: 'Campaign Balance (ether)',
    description:
      'The balance is how much money this campaign has left to spend',
    href: '#',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
    type: 'accountBalance',
  },
];

interface PageProps {
  campaignAddress: string;
}

export default async function Page({ params }: { params: PageProps }) {
  const data: any = await campaign(params.campaignAddress)
    .methods.getSummary()
    .call();
  const minimumContribution = data[0];
  const accountBalance = data[1];
  const numRequests = data[2];
  const approversCount = data[3];
  const managerAddress = data[4];
  console.log({
    minimumContribution,
    accountBalance,
    numRequests,
    approversCount,
    managerAddress,
  });

  return (
    <MaxWidthWrapper>
      <div className="md:flex md:items-center md:justify-between py-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Campaign Details
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {/* <Link
            href="/campaigns/[campaignAddress]/requests"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            View All 
          </Link> */}
          <Link
            href={`/campaigns/${params.campaignAddress}/requests`}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View All Requests
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : '',
              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : '',
              'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
            )}
          >
            <div className="">
              <p
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  'inline-block rounded-lg p-3 ring-4 ring-white'
                )}
              >
                {action.type == 'managerAddress' && managerAddress}
                {action.type == 'minimumContribution' &&
                  Web3.utils.fromWei(minimumContribution, 'wei')}
                {action.type == 'numRequests' && Number(numRequests)}
                {action.type == 'approversCount' && Number(approversCount)}
                {action.type == 'accountBalance' &&
                  Web3.utils.fromWei(accountBalance, 'ether')}
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <div className="focus:outline-none">{action.title}</div>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ContributeInputField params={params} />
    </MaxWidthWrapper>
  );
}
