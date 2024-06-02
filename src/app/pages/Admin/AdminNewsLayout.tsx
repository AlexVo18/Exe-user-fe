import CreateNews from "@/app/components/adminNewsPage/CreateNews";
import NewsList from "@/app/components/adminNewsPage/NewsList";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { ListFilter, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";

const AdminNewsLayout = () => {
  const [value, setValue] = useState("");

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
      <Tabs defaultValue="news">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="news">Tin Tức</TabsTrigger>
            <TabsTrigger value="create">Tạo Mới</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="news">
          <NewsList />
        </TabsContent>
        <TabsContent value="create">
          <CreateNews />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminNewsLayout;
