"use client"

import { Badge } from "@/components/library/badge"
import { Button } from "@/components/library/button"
import { Checkbox } from "@/components/library/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/library/dialog"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/library/dropdown-menu"
import { Input } from "@/components/library/input"
import { Label } from "@/components/library/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/library/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/library/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/library/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/library/tabs"
import { Separator } from "@/components/library/separator"
import { toast } from "sonner"
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    type UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Row,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import {
    CheckCircle2Icon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ClockIcon,
    ColumnsIcon,
    CreditCardIcon,
    FilterIcon,
    GripVerticalIcon,
    HomeIcon,
    MailIcon,
    MapPinIcon,
    MoreVerticalIcon,
    PackageIcon,
    PhoneIcon,
    PlusIcon,
    SearchIcon,
    TruckIcon,
    UserIcon,
    XCircleIcon,
} from "lucide-react"
import * as React from "react"
import { z } from "zod"
import { formatPrice } from "../lib/utils"

export const orderItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    total: z.number(),
})

export const orderAddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
})

export const orderCustomerSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
})

export const orderSchema = z.object({
    id: z.number(),
    orderNumber: z.string(),
    customer: z.string(),
    customerDetails: orderCustomerSchema.optional(),
    date: z.string(),
    status: z.string(),
    total: z.number(),
    items: z.number(),
    orderItems: z.array(orderItemSchema).optional(),
    paymentMethod: z.string(),
    shippingAddress: orderAddressSchema.optional(),
    billingAddress: orderAddressSchema.optional(),
    notes: z.string().optional(),
})

function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id,
    })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:bg-transparent"
        >
            <GripVerticalIcon className="size-3 text-muted-foreground" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Completed":
            return <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        case "Processing":
            return <ClockIcon className="text-amber-500 dark:text-amber-400" />
        case "Shipped":
            return <TruckIcon className="text-blue-500 dark:text-blue-400" />
        case "Cancelled":
            return <XCircleIcon className="text-red-500 dark:text-red-400" />
        default:
            return <PackageIcon />
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Completed":
            return "text-green-500 dark:text-green-400"
        case "Processing":
            return "text-amber-500 dark:text-amber-400 "
        case "Shipped":
            return "text-blue-500 dark:text-blue-400"
        case "Cancelled":
            return "text-red-500 dark:text-red-400"
        default:
            return "text-muted-foreground"
    }
}

function OrderDetails({ order, onClose }: { order: z.infer<typeof orderSchema>; onClose: () => void }) {
    return (
        <SheetContent className="sm:max-w-xl">
            <SheetHeader>
                <SheetTitle>Order #{order.orderNumber}</SheetTitle>
                <SheetDescription>
                    Placed on {new Date(order.date).toLocaleDateString()} • {order.status}
                </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue="details" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Status</div>
                            <Badge variant="outline" className={`flex gap-1 px-1.5 ${getStatusColor(order.status)} [&_svg]:size-3`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Order Date</div>
                            <div>{new Date(order.date).toLocaleDateString()}</div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Payment Method</div>
                            <div className="flex items-center gap-2">
                                <CreditCardIcon className="h-4 w-4" />
                                {order.paymentMethod}
                            </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="font-medium">Total Amount</div>
                            <div className="font-semibold">{formatPrice(order.total)}</div>
                        </div>
                    </div>

                    {order.shippingAddress && (
                        <div className="mt-6 rounded-lg border p-4">
                            <h4 className="mb-2 flex items-center gap-2 font-medium">
                                <MapPinIcon className="h-4 w-4" /> Shipping Address
                            </h4>
                            <div className="text-sm text-muted-foreground">
                                <p>{order.shippingAddress.street}</p>
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    )}

                    {order.notes && (
                        <div className="mt-4 rounded-lg border p-4">
                            <h4 className="mb-2 font-medium">Order Notes</h4>
                            <p className="text-sm text-muted-foreground">{order.notes}</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="items" className="pt-4">
                    {order.orderItems && order.orderItems.length > 0 ? (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-right">Qty</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.orderItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                                            <TableCell className="text-right">{formatPrice(item.total)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                            <p className="text-sm text-muted-foreground">No items available</p>
                        </div>
                    )}

                    <div className="mt-4 space-y-2 text-right">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>{formatPrice(order.total * 0.9)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax:</span>
                            <span>{formatPrice(order.total * 0.1)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <span>Total:</span>
                            <span>{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4 pt-4">
                    {order.customerDetails ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                    <UserIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div>
                                    <h4 className="font-medium">{order.customerDetails.name}</h4>
                                    <p className="text-sm text-muted-foreground">Customer</p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <MailIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{order.customerDetails.email}</span>
                                </div>
                                {order.customerDetails.phone && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{order.customerDetails.phone}</span>
                                    </div>
                                )}
                            </div>

                            {order.billingAddress && (
                                <div className="mt-4 rounded-lg border p-4">
                                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                                        <HomeIcon className="h-4 w-4" /> Billing Address
                                    </h4>
                                    <div className="text-sm text-muted-foreground">
                                        <p>{order.billingAddress.street}</p>
                                        <p>
                                            {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                                        </p>
                                        <p>{order.billingAddress.country}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                            <p className="text-sm text-muted-foreground">No customer details available</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            <SheetFooter className="mt-6">
                <SheetClose asChild>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

function UpdateStatusDialog({
    order,
    isOpen,
    onClose,
    onUpdateStatus,
}: {
    order: z.infer<typeof orderSchema> | null
    isOpen: boolean
    onClose: () => void
    onUpdateStatus: (orderId: number, newStatus: string) => void
}) {
    const [status, setStatus] = React.useState<string>(order?.status || "")

    React.useEffect(() => {
        if (order) {
            setStatus(order.status)
        }
    }, [order])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (order) {
            onUpdateStatus(order.id, status)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                    <DialogDescription>
                        Change the status for order #{order?.orderNumber}. This will be reflected immediately.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Input id="notes" placeholder="Add notes about this status change" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Update Status</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function DraggableRow({ row }: { row: Row<z.infer<typeof orderSchema>> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.id,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
        </TableRow>
    )
}

export function OrdersTable({
    data: initialData,
}: {
    data: z.infer<typeof orderSchema>[]
}) {
    // Create a mutable copy of initialData to work with
    const [allOrders, setAllOrders] = React.useState(() => [...initialData])
    const [data, setData] = React.useState(() => [...initialData])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [searchQuery, setSearchQuery] = React.useState("")
    const [statusFilter, setStatusFilter] = React.useState("all")
    const [dateFilter, setDateFilter] = React.useState("all")
    const [selectedOrder, setSelectedOrder] = React.useState<z.infer<typeof orderSchema> | null>(null)
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = React.useState(false)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false)
    const sortableId = React.useId()
    const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

    const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])
    const columns = React.useMemo<ColumnDef<z.infer<typeof orderSchema>>[]>(
        () => [
            {
                id: "drag",
                header: () => null,
                cell: ({ row }) => <DragHandle id={row.original.id} />,
            },
            {
                id: "select",
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                            aria-label="Select all"
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) => row.toggleSelected(!!value)}
                            aria-label="Select row"
                        />
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "orderNumber",
                header: "Order #",
                cell: ({ row }) => {
                    return (
                        <Button
                            variant="link"
                            className="p-0 font-medium text-foreground"
                            onClick={() => handleViewOrderDetails(row.original)}
                        >
                            {row.original.orderNumber}
                        </Button>
                    )
                },
            },
            {
                accessorKey: "customer",
                header: "Customer",
                cell: ({ row }) => <div>{row.original.customer}</div>,
            },
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => {
                    const date = new Date(row.original.date)
                    return (
                        <div className="text-muted-foreground">
                            {date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    )
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                    <Badge
                        variant="outline"
                        className={`flex gap-1 px-1.5 ${getStatusColor(row.original.status)} [&_svg]:size-3`}
                    >
                        {getStatusIcon(row.original.status)}
                        {row.original.status}
                    </Badge>
                ),
            },
            {
                accessorKey: "total",
                header: () => <div className="text-right">Total</div>,
                cell: ({ row }) => <div className="text-right font-medium">{formatPrice(row.original.total)}</div>,
            },
            {
                accessorKey: "items",
                header: () => <div className="text-center">Items</div>,
                cell: ({ row }) => <div className="text-center">{row.original.items}</div>,
            },
            {
                accessorKey: "paymentMethod",
                header: "Payment",
                cell: ({ row }) => <div>{row.original.paymentMethod}</div>,
            },
            {
                id: "actions",
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                                size="icon"
                            >
                                <MoreVerticalIcon />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleViewOrderDetails(row.original)}>View details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(row.original)}>Update status</DropdownMenuItem>
                            <DropdownMenuItem>Contact customer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-500 dark:text-red-400"
                                onClick={() => handleQuickStatusUpdate(row.original.id, "Cancelled")}
                            >
                                Cancel order
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [],
    )

    // Apply filters when search query, status filter, or date filter changes
    React.useEffect(() => {
        const filteredData = allOrders.filter((order) => {
            const matchesSearch =
                searchQuery === "" ||
                order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

            let matchesDate = true
            const orderDate = new Date(order.date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (dateFilter === "today") {
                const todayString = today.toISOString().split("T")[0]
                matchesDate = order.date === todayString
            } else if (dateFilter === "yesterday") {
                const yesterday = new Date(today)
                yesterday.setDate(yesterday.getDate() - 1)
                const yesterdayString = yesterday.toISOString().split("T")[0]
                matchesDate = order.date === yesterdayString
            } else if (dateFilter === "week") {
                const weekAgo = new Date(today)
                weekAgo.setDate(weekAgo.getDate() - 7)
                matchesDate = orderDate >= weekAgo
            }

            return matchesSearch && matchesStatus && matchesDate
        })

        setData(filteredData)
    }, [searchQuery, statusFilter, dateFilter, allOrders])

    const handleViewOrderDetails = (order: z.infer<typeof orderSchema>) => {
        setSelectedOrder(order)
        setIsOrderDetailsOpen(true)
    }

    const handleUpdateStatus = (order: z.infer<typeof orderSchema>) => {
        setSelectedOrder(order)
        setIsUpdateStatusOpen(true)
    }

    const handleQuickStatusUpdate = (orderId: number, newStatus: string) => {
        updateOrderStatus(orderId, newStatus)
    }

    const updateOrderStatus = (orderId: number, newStatus: string) => {
        // Update both the filtered data and the full data set
        setData((prevData) =>
            prevData.map((order) => {
                if (order.id === orderId) {
                    return { ...order, status: newStatus }
                }
                return order
            }),
        )

        // Update the allOrders state instead of mutating initialData
        setAllOrders((prevOrders) =>
            prevOrders.map((order) => {
                if (order.id === orderId) {
                    return { ...order, status: newStatus }
                }
                return order
            }),
        )

        // Find the order to show in the toast notification
        const orderToUpdate = allOrders.find((order) => order.id === orderId)

        if (orderToUpdate) {
            toast.success("Order status updated", {
                description: `Order #${orderToUpdate.orderNumber} is now ${newStatus}`,
            })
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setData((data) => {
                const oldIndex = dataIds.indexOf(active.id)
                const newIndex = dataIds.indexOf(over.id)
                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            columnVisibility,
            columnFilters,
            sorting,
            rowSelection,
            pagination,
        },
    })

    return (
        <>
            <div className="flex w-full flex-col justify-start gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-sm">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by order ID, customer name..,."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <FilterIcon className="h-3.5 w-3.5" />
                                    <span>Filter</span>
                                    <ChevronDownIcon className="h-3.5 w-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="p-2">
                                    <p className="mb-2 text-sm font-medium">Status</p>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DropdownMenuSeparator />
                                <div className="p-2">
                                    <p className="mb-2 text-sm font-medium">Date</p>
                                    <Select value={dateFilter} onValueChange={setDateFilter}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter by date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Time</SelectItem>
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="yesterday">Yesterday</SelectItem>
                                            <SelectItem value="week">Last 7 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ColumnsIcon className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Columns</span>
                                    <ChevronDownIcon className="h-3.5 w-3.5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                {table
                                    .getAllColumns()
                                    .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <PlusIcon className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">New Order</span>
                            <span className="sm:hidden">New</span>
                        </Button>
                    </div>
                </div>
                <div className="relative flex flex-col gap-4 overflow-auto">
                    <div className="overflow-hidden rounded-lg border">
                        <DndContext
                            collisionDetection={closestCenter}
                            modifiers={[restrictToVerticalAxis]}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                            id={sortableId}
                        >
                            <div className="overflow-auto custom-scrollbar">
                                <div className="flex items-center">
                                    <Table>
                                        <TableHeader className="sticky top-0 z-10 bg-muted">
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => {
                                                        return (
                                                            <TableHead key={header.id} colSpan={header.colSpan}>
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                                            </TableHead>
                                                        )
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                            {table.getRowModel().rows?.length ? (
                                                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                                    {table.getRowModel().rows.map((row) => (
                                                        <DraggableRow key={row.id} row={row} />
                                                    ))}
                                                </SortableContext>
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                                        No orders found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </DndContext>
                    </div>
                    <div className="flex items-center justify-between px-4">
                        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} order(s)
                            selected.
                        </div>
                        <div className="flex w-full items-center gap-8 lg:w-fit">
                            <div className="hidden items-center gap-2 lg:flex">
                                <Select
                                    value={`${table.getState().pagination.pageSize}`}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value))
                                    }}
                                >
                                    <SelectTrigger className="w-20" id="rows-per-page">
                                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[10, 20, 30, 40, 50].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">per page</span>
                            </div>
                            <div className="flex w-fit items-center justify-center text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </div>
                            <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                <Button
                                    variant="outline"
                                    className="hidden h-8 w-8 p-0 lg:flex"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to first page</span>
                                    <ChevronsLeftIcon />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="size-8"
                                    size="icon"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeftIcon />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="size-8"
                                    size="icon"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRightIcon />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hidden size-8 lg:flex"
                                    size="icon"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">Go to last page</span>
                                    <ChevronsRightIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sheet open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
                {selectedOrder && <OrderDetails order={selectedOrder} onClose={() => setIsOrderDetailsOpen(false)} />}
            </Sheet>
            <UpdateStatusDialog
                order={selectedOrder}
                isOpen={isUpdateStatusOpen}
                onClose={() => setIsUpdateStatusOpen(false)}
                onUpdateStatus={updateOrderStatus}
            />
        </>
    )
}
