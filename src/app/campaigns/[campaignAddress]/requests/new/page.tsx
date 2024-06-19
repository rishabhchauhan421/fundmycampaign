'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import {
  CheckCircleIcon,
  XCircleIcon,
  UserCircleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import campaign from '@/ethereum/campaign';
import Web3 from '@/ethereum/web3';
import React from 'react';

interface Props {
  campaignAddress: string;
}

export default function Page({ params }: { params: Props }) {
  const [description, setDescription] = React.useState('');
  const [value, setValue] = React.useState(0);
  const [recipient, setRecipient] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [errorFlag, setErrorFlag] = React.useState(false);

  const onCreateNewRequest = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await Web3.eth.getAccounts();
    try {
      console.log({ description, value, recipient });
      await campaign(params.campaignAddress)
        .methods.createRequest(description, '' + value, recipient)
        .send({
          from: accounts[0],
        });
      setLoading(false);
      setMsg('Request created successfully');
      setErrorFlag(false);
    } catch (err) {
      setLoading(false);
      setErrorFlag(true);
      setMsg('An error occurred');
      console.log(err);
    }
    setDescription('');
    setValue(0);
    setRecipient('');
  };

  return (
    <MaxWidthWrapper>
      <div className="md:flex md:items-center md:justify-between py-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Campaign Details
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          {/*           
          <Link
            href={`/campaigns/${params.campaignAddress}/requests/new`}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create New Request
          </Link> */}
        </div>
      </div>
      <form onSubmit={onCreateNewRequest}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    minLength={3}
                    required
                    value={description}
                    autoComplete="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="value"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Value in Wei
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="value"
                    id="value"
                    value={value}
                    required
                    autoComplete="value"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setValue(parseInt(event.target.value))}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="recipient"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Recipient
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="recipient"
                    id="recipient"
                    value={recipient}
                    required
                    autoComplete="recipient"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setRecipient(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href={`/campaigns/${params.campaignAddress}/requests`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          {loading ? (
            <button
              disabled
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-center items-center"
            >
              <div className=" items items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    width={4}
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-center items-center"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      {msg.length <= 0 ? (
        <></>
      ) : errorFlag ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Something went wrong!
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Request Created Successfully
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                ></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
