import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StatCard = ({ title, value, icon: Icon, description }) => (
   <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
         <CardTitle className="text-sm font-medium">{title}</CardTitle>
         <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
         <div className="text-2xl font-bold">{value}</div>
         {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
         )}
      </CardContent>
   </Card>
);
