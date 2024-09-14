import {
  CircleUser,
  SquareUserRound,
  UsersRound,
  ChartColumnBig,
} from "lucide-react"

export const employeeRoutes = [
  {
    label: "Mensuales",
    href: "/dashboard/monthly-clients",
    Icon: SquareUserRound,
  },
  {
    label: "Por fracción",
    href: "/dashboard/clients-per-fraction",
    Icon: UsersRound,
  },
]

export const adminRoutes = [
  {
    label: "Empleados",
    href: "/dashboard/employees",
    Icon: CircleUser,
  },
  {
    label: "Analíticas",
    href: "/dashboard/analytics",
    Icon: ChartColumnBig,
  },
]
