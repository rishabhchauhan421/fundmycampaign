'use client';
import MaxWidthWrapper from '@/app/components/MaxWidthWrapper';
import factory from '@/ethereum/factory';
import web3 from '@/ethereum/web3';
import {
  CheckCircleIcon,
  XMarkIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';
import React from 'react';

export default function Example() {
  const [contribution, setContribution] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [errorFlag, setErrorFlag] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const accounts = await web3.eth.getAccounts();
    try {
      const campaign = await factory.methods
        .createCampaign(`${contribution}`)
        .send({
          from: accounts[0],
          gas: '1000000',
        });
      setLoading(false);
      setMsg('Campaign created successfully');
    } catch (err) {
      setLoading(false);
      setErrorFlag(true);
      setMsg('An error occurred');
      console.log(err);
    }
  };
  return (
    <MaxWidthWrapper>
      <form className="px-6 py-12" onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-3">
            <div>
              <h1 className="text-3xl font-bold leading-7 text-gray-900">
                New Campaign
              </h1>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full">
                <label
                  htmlFor="contribution"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Minimum Contribution (wei)
                </label>
                <div className="mt-2">
                  <input
                    id="contribution"
                    name="contribution"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="1000 wei"
                    type="number"
                    onChange={(event) =>
                      setContribution(parseInt(event.target.value))
                    }
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Input the minimum contribution you want everyone else to make.
                </p>
              </div>
              <div className="col-span-full">
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
            </div>
          </div>
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
                    Campaign Created Successfully
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
        </div>
      </form>
    </MaxWidthWrapper>
  );
}
