import cookies from "next-cookies";
import db from "../../utils/db";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  const { address } = cookies(context);
  if (address) {
    const collection = await db
      .collection(`orders`)
      .where("seller", "==", address)
      .get();
    const orders = collection.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return {
      props: {
        orders,
      },
    };
  }
  return {};
}

export default function Page({ orders }: any) {
  return (
    <div>
      <h2>Seller Dashboard</h2>
      {orders && orders.length > 0 ? (
        <>
          {orders.map((order: any) => (
            <div key={order._id}>
              <div>Order from: {order.buyer}</div>
              <div>Hours: {order.hours}</div>
              <div>Price: {order.price}</div>
              <div>Status: {order.status}</div>
              <Link href={`/sell/orders/${order._id}`}>View Order</Link>
            </div>
          ))}
        </>
      ) : (
        <p>No orders yet</p>
      )}
    </div>
  );
}
