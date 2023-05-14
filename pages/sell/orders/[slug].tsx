import React from "react";
import { useRouter } from "next/router";
import { useTimer } from "react-timer-hook";

import cookies from "next-cookies";
import db from "../../../utils/db";
import {
  aboutTimerAddress,
  erc20Address,
  useAboutTimerEndTimer,
  useAboutTimerStartTimer,
  useErc20Read,
} from "../../../generated";
import { useAccount, useSignMessage } from "wagmi";

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const { address } = cookies(context);
  if (address) {
    const order = (await db.doc(`orders/${slug}`).get()).data();

    return {
      props: {
        order,
      },
    };
  }
}

export default function Page({ order }: { order: any }) {
  console.log({ order });
  const [expiryTimestamp, setExpiryTimestamp] = React.useState<null | Date>(
    null
  );
  const router = useRouter();
  const { slug } = router.query;
  const { address } = useAccount();
  const { writeAsync } = useAboutTimerStartTimer();
  const { write: end, data, error } = useAboutTimerEndTimer();
  console.log({ data, error });

  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: expiryTimestamp as Date,
    autoStart: true,
  });

  const onClick = async () => {
    await writeAsync({
      args: [
        order.buyer,
        order.signedMessage,
        BigInt(order.hours),
        BigInt(order.rate),
        order.zkAddress,
      ],
    });
    setExpiryTimestamp(new Date(Date.now() + order.hours * 60 * 60 * 1000));
  };
  return (
    <div>
      <h2>Order {slug}</h2>
      <p>Hours: {order.hours}</p>
      <div>Task Prize: {order.rate * order.hours} BOB</div>
      <p>Status: {order.status}</p>
      <p>Seller: {order.seller}</p>
      {true ? (
        <div>
          <p>Started!</p>
          <p>
            Missing: {hours} hours, {minutes} minutes and {seconds} seconds
          </p>
          <button
            onClick={() => {
              end();
            }}
          >
            Mark as done
          </button>
        </div>
      ) : (
        <button onClick={onClick}>Start Timer</button>
      )}
    </div>
  );
}
