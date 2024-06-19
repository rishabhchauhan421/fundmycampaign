import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import campaign from '@/ethereum/campaign';
import React from 'react';
import Link from 'next/link';
import web3 from '@/ethereum/web3';
import RequestButtons from '@/components/RequestButtons';

interface PageProps {
  campaignAddress: string;
}

export default async function page({ params }: { params: PageProps }) {
  const data: any = await campaign(params.campaignAddress)
    .methods.getSummary()
    .call();
  const minimumContribution = data[0];
  const accountBalance = data[1];
  const numRequests = data[2];
  const approversCount = data[3];
  const managerAddress = data[4];

  const requests = await Promise.all(
    Array(parseInt(numRequests))
      .fill(0)
      .map((element, index) => {
        return campaign(params.campaignAddress).methods.requests(index).call();
      })
  );
  console.log({ requests });
  // console.log('complete: ' + requests[0].complete);
  return (
    <MaxWidthWrapper>
      <div className="md:flex md:items-center md:justify-between py-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Requests Details
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
            href={`/campaigns/${params.campaignAddress}/requests/new`}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create New Request
          </Link>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Amount(WEI)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Recipient
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Approval Count
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-bold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Approve</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Finalise</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {requests.map((request: any, index) => (
                    <tr
                      key={request[0]}
                      className={request.complete ? 'bg-gray-100' : ''}
                    >
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{index}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {request.campaignAddress}
                        </div>
                        <div className="mt-1 text-gray-500">
                          {request.description}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {web3.utils.fromWei(request[1], 'wei')} WEI
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{request[2]}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {parseInt(request[4])} / {parseInt(approversCount)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 `}
                        >
                          {/* <p>{!request.complete}</p> */}
                          {request.complete ? 'Completed' : 'Active'}
                        </span>
                      </td>

                      <RequestButtons
                        props={{
                          manager: managerAddress,
                          address: params.campaignAddress,
                          requestId: index,
                          complete: request.complete,
                        }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
