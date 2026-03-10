import { Link } from "react-router"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb"
import { Slash } from "lucide-react"

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadCrumbs?: Breadcrumb[];
}


export const CustomBreadCrumbs = ({ currentPage, breadCrumbs = [] }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>


                {
                    breadCrumbs.map(crumb => (
                        <div className="flex items-center">
                            <BreadcrumbItem>
                                <BreadcrumbSeparator>
                                    <Slash />
                                </BreadcrumbSeparator>
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.to}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    ))
                }

                <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                    <BreadcrumbPage className="text-indigo-500">{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
