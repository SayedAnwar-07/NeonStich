import { useAdminOrders } from "../context/AdminOrderContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const AdminOrderCard = ({ order, index }) => {
  const { updateOrderStatus } = useAdminOrders();

  const statusStyle = {
    Processing: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Shipped: "bg-blue-50 text-blue-700 border-blue-200",
    Delivered: "bg-green-50 text-green-700 border-green-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const statusDot = {
    Processing: "bg-yellow-500",
    Shipped: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const isLocked =
    order.orderStatus === "Delivered" || order.orderStatus === "Cancelled";

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-5 text-sm font-medium text-gray-900">
        {index + 1}
      </td>

      <td className="px-4 py-5 text-sm text-gray-600">
        #{order._id.slice(-8)}
      </td>

      <td className="px-4 py-5 text-sm font-semibold text-gray-900">
        {order.userId?.name || "Unknown"}
      </td>

      <td className="px-4 py-5 text-sm text-gray-500">
        {order.userId?.email || "No email"}
      </td>

      <td className="px-4 py-5 text-sm text-gray-600">
        {order.items?.length} items
      </td>

      <td className="px-4 py-5 text-sm font-medium text-gray-900">
        ${order.total}
      </td>

      <td className="px-4 py-5 text-sm">
        <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
          {order.paymentMethod}
        </span>
      </td>

      <td className="px-4 py-5 text-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isLocked}>
            <Button
              variant="outline"
              className={`
          min-w-[150px] justify-between rounded-full border px-4 py-2
          text-sm font-medium shadow-sm transition-all
          ${statusStyle[order.orderStatus]}
          ${isLocked ? "cursor-not-allowed opacity-70" : "hover:shadow-md"}
        `}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${statusDot[order.orderStatus]}`}
                />
                {order.orderStatus}
              </span>
              <span className="text-xs">▼</span>
            </Button>
          </DropdownMenuTrigger>

          {!isLocked && (
            <DropdownMenuContent className="w-44 rounded-xl border bg-white p-2 shadow-lg">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 text-xs text-gray-400">
                  Change status
                </DropdownMenuLabel>

                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => updateOrderStatus(order._id, status)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${statusDot[status]}`}
                    />
                    <span>{status}</span>

                    {order.orderStatus === status && (
                      <span className="ml-auto text-xs text-gray-400">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default AdminOrderCard;
