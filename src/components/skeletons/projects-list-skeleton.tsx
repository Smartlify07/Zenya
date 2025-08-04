import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectsTableSkeleton = () => {
  // Render 3 rows for the skeleton to simulate multiple entries
  const skeletonRows = Array(3).fill(null);

  return (
    <div className="px-10 max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="font-inter">
            <TableHead>
              <Skeleton className="h-6 w-24" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-6 w-32" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow className="font-inter" key={index}>
              <TableCell>
                <Skeleton className="h-6 w-40" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-6 w-48" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTableSkeleton;
