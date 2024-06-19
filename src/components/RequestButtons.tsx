'use client';
import campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { Button } from '@headlessui/react';
import React from 'react';
import Spinner from '@/components/Spinner';

interface RequestButtonsProps {
  manager: string;
  address: string;
  requestId: number;
  complete: boolean;
}

export default function RequestButtons({
  props,
}: {
  props: RequestButtonsProps;
}) {
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [finaliseLoading, setFinaliseLoading] = React.useState(false);

  return (
    <>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Button
          className="text-indigo-600 hover:text-indigo-900"
          {...(approveLoading ? { disabled: true } : {})}
          onClick={async () => {
            if (props.complete) return;
            setApproveLoading(true);
            const accounts = await web3.eth.getAccounts();
            try {
              await campaign(props.address)
                .methods.approveRequest(props.requestId)
                .send({
                  from: accounts[0],
                  gas: '1000000',
                });
            } catch (err) {
              console.log(err);
            }
            setApproveLoading(false);
          }}
        >
          {approveLoading ? <Spinner /> : 'Approve'}
        </Button>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Button
          onClick={async () => {
            if (props.complete) return;
            setFinaliseLoading(true);

            const accounts = await web3.eth.getAccounts();
            console.log('Finalising');
            try {
              await campaign(props.address)
                .methods.finaliseRequest(props.requestId)
                .send({
                  from: accounts[0],
                  gas: '10000000',
                });
            } catch (err) {
              console.error(err);
            }
            setFinaliseLoading(false);
          }}
          className="text-indigo-600 hover:text-indigo-900"
          {...(finaliseLoading ? { disabled: true } : {})}
        >
          {finaliseLoading ? <Spinner /> : 'Finalise'}
        </Button>
      </td>
    </>
  );
}
