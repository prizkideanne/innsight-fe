import {
  BuildingLibraryIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Property",
    href: "/",
    icon: BuildingLibraryIcon,
    current: true,
    children: [
      { name: "Property List", href: "/" },
      { name: "Category Area", href: "/category-area" },
    ],
  },
  {
    name: "Order",
    href: "/order",
    icon: DocumentDuplicateIcon,
    current: true,
    children: [{ name: "Order List", href: "/order-list" }],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: ChartPieIcon,
    current: true,
    children: [
      { name: "Report Tabel", href: "/report-tabel" },
      { name: "Report By Calendar", href: "/reportbycalendar" },
    ],
  },
];

export default navigation;
