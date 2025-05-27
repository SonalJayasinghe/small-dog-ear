import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Architecture } from "@/lib/schema";
import React from "react";

const ArchitectureCard = ({ data }: { data: Architecture }) => {
  return (
    <>
      <Card className="@container/card cursor-pointer">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.name}
          </CardTitle>
          <CardDescription>{data.description}</CardDescription>

          <CardAction>
            <Badge variant={"secondary"}>
              {data.type.toLocaleUpperCase()}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </>
  );
};

export default ArchitectureCard;
