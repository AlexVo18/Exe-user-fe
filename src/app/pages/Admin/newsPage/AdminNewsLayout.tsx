import CreateNews from "@/app/components/adminNewsPage/CreateNews";
import NewsList from "@/app/components/adminNewsPage/NewsList";
import AdminNavBar from "@/app/components/main/AdminNavBar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

const AdminNewsLayout = () => {
  // Apply overflow: hidden to body element to prevent scrolling of the entire page
  // document.body.style.overflow = "hidden";

  return (
    <>
      <div className="sticky top-0">
        <AdminNavBar />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-5">
        <Tabs defaultValue="news">
          <div className="flex items-center my-2">
            <TabsList>
              <TabsTrigger value="news">Tin Tức</TabsTrigger>
              <TabsTrigger value="create">Tạo Mới</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="news"
            // style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <NewsList />
          </TabsContent>
          <TabsContent
            value="create"
            // style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
          >
            <CreateNews />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminNewsLayout;
